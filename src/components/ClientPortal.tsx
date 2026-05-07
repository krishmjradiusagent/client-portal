"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SearchHeader } from "./SearchHeader";
import { ResultsPanel } from "./ResultsPanel";
import { MapPanel } from "./MapPanel";
import { SaveSearchDialog } from "./SaveSearchDialog";

export type BoardMode = "search" | "savedSearch" | "board";
import { AdvancedFiltersSheet } from "./AdvancedFiltersSheet";
import { PropertyDetailDialog } from "./PropertyDetailDialog";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { HomeValuePage } from "./HomeValuePage";
import { PropertyDetailPage } from "./PropertyDetailPage";
import { MessagesPanel } from "./client-portal/MessagesPanel";
import { WillowFloatingAssistant, type WillowContext } from "./WillowFloatingAssistant";
import type { Property, RouteKey, SavedSearch } from "./mockData";
import { usePropertyContext, type MoreFiltersState, defaultMoreFilters } from "./PropertyContext";
import { useAuth } from "@/lib/auth";

const routeTitles: Record<RouteKey, string> = {
  search: "Search",
  "my-searches": "My Searches",
  interested: "Interested",
  messages: "Messages",
  "not-interested": "Not Interested",
  profile: "My Profile",
  settings: "Settings",
  logout: "Logout",
  "recently-viewed": "Recently Viewed",
  "home-value": "Home Value"
};

export function ClientPortal() {
  const pathname = usePathname();

  const activeRoute = useMemo<RouteKey>(() => {
    const route = pathname.replace(/^\//, "") as RouteKey;
    return routeTitles[route] ? route : "search";
  }, [pathname]);

  const [selectedLocation, setSelectedLocation] = useState("All areas");
  const smartSuggestions = [
    { label: "Nearby walk-to-coffee spots", icon: "Coffee" },
    { label: "Family friendly neighborhoods", icon: "Baby" },
    { label: "Investment potential near tech hubs", icon: "TrendingUp" },
    { label: "Modern architecture in Austin", icon: "Sparkles" }
  ];
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("2000000");
  const [moreFilters, setMoreFilters] = useState<MoreFiltersState>(defaultMoreFilters);
  const [sortValue, setSortValue] = useState("default");

  const {
    properties: allProperties,
    visitedIds,
    toggleInterested,
    toggleNotInterested,
    markVisited,
    recentlyViewedIds,
    savedSearches,
    selectedSavedSearchId,
    addSavedSearch,
    deleteSavedSearch,
    updateSavedSearch,
    homeValueListings,
    selectedPropertyId,
    setSelectedPropertyId
  } = usePropertyContext();

  const { authUser, setAuthMode } = useAuth();
  const isAuthenticated = Boolean(authUser);

  // If unauthenticated user lands on /messages route, open signup modal
  useEffect(() => {
    if (activeRoute === "messages" && !isAuthenticated) {
      setAuthMode("signup");
    }
  }, [activeRoute, isAuthenticated, setAuthMode]);

  const [activePropertyModal, setActivePropertyModal] = useState<Property | null>(null);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [customBoundaryActive, setCustomBoundaryActive] = useState(false);

  const selectedSavedSearch = useMemo(() =>
    savedSearches.find(s => s.id === selectedSavedSearchId),
    [savedSearches, selectedSavedSearchId]
  );

  // 1. Base properties by route
  const baseRouteProperties = useMemo(() => {
    if (activeRoute === "interested") return allProperties.filter((p) => p.status === "interested");
    if (activeRoute === "not-interested") return allProperties.filter((p) => p.status === "notInterested");
    if (activeRoute === "recently-viewed") {
      return recentlyViewedIds
        .map(id => allProperties.find(p => p.id === id))
        .filter((p): p is Property => !!p);
    }
    if (activeRoute === "my-searches" && selectedSavedSearch) {
      return allProperties.filter(p => selectedSavedSearch.propertyIds.includes(p.id));
    }
    if (activeRoute === "home-value") {
      return [];
    }
    return allProperties.filter((p) => p.status === "search");
  }, [activeRoute, allProperties, visitedIds, selectedSavedSearch, homeValueListings]);

  const totalCount = baseRouteProperties.length;

  // 2. Filtered and Sorted properties
  const routeProperties = useMemo(() => {
    const min = Number(minPrice || "0");
    const max = Number(maxPrice || "99999999");
    const location = selectedLocation.toLowerCase();

    const results = baseRouteProperties.filter((property) => {
      const matchesPrice = property.price >= min && property.price <= max;
      const matchesLocation =
        selectedLocation === "All areas" ||
        property.area.toLowerCase().includes(location) ||
        property.address.toLowerCase().includes(location);
      const matchesType = moreFilters.propertyType === "Any" || property.type === moreFilters.propertyType;
      const matchesBeds = moreFilters.beds === "Any" || property.beds >= Number(moreFilters.beds.replace("+", ""));
      const matchesBaths = moreFilters.baths === "Any" || property.baths >= Number(moreFilters.baths.replace("+", ""));
      const matchesMatch = moreFilters.matchScore === "Any" || property.matchScore >= Number(moreFilters.matchScore.replace("+", ""));

      const yearMin = moreFilters.yearBuiltMin === "" ? 0 : Number(moreFilters.yearBuiltMin);
      const yearMax = moreFilters.yearBuiltMax === "" ? 9999 : Number(moreFilters.yearBuiltMax);
      const matchesYear = property.yearBuilt >= yearMin && property.yearBuilt <= yearMax;

      const lotSize = property.lot === "N/A" ? 0 : parseFloat(property.lot);
      const isAcres = property.lot.includes("ac");
      const lotSizeSqft = isAcres ? lotSize * 43560 : lotSize;

      const parseLotSizeStr = (val: string) => {
        if (val === "No Min") return 0;
        if (val === "No Max") return Infinity;
        if (val.includes("acres")) return Number(val.split(" ")[0]) * 43560;
        return Number(val.split(" ")[0].replace(/,/g, ""));
      };

      const lotMin = parseLotSizeStr(moreFilters.lotSizeMin);
      const lotMax = parseLotSizeStr(moreFilters.lotSizeMax);
      const matchesLot = lotSizeSqft >= lotMin && lotSizeSqft <= lotMax;

      return matchesPrice && matchesLocation && matchesType && matchesBeds && matchesBaths && matchesMatch && matchesYear && matchesLot;
    });

    switch (sortValue) {
      case "price-asc":
        return [...results].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...results].sort((a, b) => b.price - a.price);
      case "newest":
        return [...results].sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
      default:
        return results;
    }
  }, [baseRouteProperties, maxPrice, minPrice, moreFilters, selectedLocation, sortValue]);

  const handleLike = (property: Property) => {
    toggleInterested(property.id);
  };

  const handleDislike = (property: Property) => {
    toggleNotInterested(property.id);
  };

  const handleSaveSearch = (name: string, frequency: string, emailAlerts: boolean) => {
    const newSearch: SavedSearch = {
      id: `search-${Date.now()}`,
      name,
      location: selectedLocation,
      criteria: JSON.stringify(moreFilters),
      frequency,
      updatedAt: "Just now",
      propertyIds: routeProperties.map((p) => p.id),
      priceMin: minPrice,
      priceMax: maxPrice,
      emailAlerts
    };
    addSavedSearch(newSearch);
  };

  const handleUpdateSearch = (updated: SavedSearch) => {
    updateSavedSearch(updated);
  };

  return (
    <>
      {activeRoute === "profile" ? (
        <ProfilePage />
      ) : activeRoute === "settings" ? (
        <SettingsPage />
      ) : activeRoute === "home-value" ? (
        <HomeValuePage />
      ) : activeRoute === "messages" ? (
        !isAuthenticated ? null : (
          <div className="flex flex-col flex-1 h-[calc(100vh-18px)] overflow-hidden mb-[18px]">
            <MessagesPanel />
          </div>
        )
      ) : selectedPropertyId ? (
        <PropertyDetailPage />
      ) : (
        <div className="h-[100dvh] overflow-hidden flex flex-col">
          <div className="shrink-0">
            <SearchHeader
            mode={
              activeRoute === "my-searches" && selectedSavedSearchId
                ? "savedSearch"
                : ["interested", "not-interested", "recently-viewed"].includes(activeRoute)
                  ? "board"
                  : "search"
            }
            title={activeRoute === "my-searches" ? (selectedSavedSearch?.name || "My Searches") : routeTitles[activeRoute]}
            totalCount={totalCount}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onOpenFilters={() => setFiltersModalOpen(true)}
            onSaveSearch={handleSaveSearch}
            onUpdateSearch={handleUpdateSearch}
            currentSearch={selectedSavedSearch}
            resultsCount={routeProperties.length}
            moreFilters={moreFilters}
            setMoreFilters={setMoreFilters}
            isEditMode={activeRoute === "my-searches" && !!selectedSavedSearchId}
            suggestions={smartSuggestions}
            drawingMode={drawingMode}
            onToggleDrawingMode={() => setDrawingMode(!drawingMode)}
            customBoundaryActive={customBoundaryActive}
            sortValue={sortValue}
            onSortChange={setSortValue}
          />
          </div>

          <section className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[720px_minmax(0,1fr)]">
            <aside className="h-full min-h-0 w-[720px] overflow-y-auto overscroll-contain bg-background">
              <ResultsPanel
                route={activeRoute}
                properties={routeProperties}
                totalCount={totalCount}
                sortValue={sortValue}
                onSortChange={setSortValue}
                savedSearches={savedSearches}
                selectedSavedSearch={selectedSavedSearch}
                onOpenProperty={(property) => {
                  setSelectedPropertyId(property.id);
                  markVisited(property.id);
                }}
                onLike={handleLike}
                onDislike={handleDislike}
                onEditSearch={() => setFiltersModalOpen(true)}
                onRunSavedSearch={(location) => {
                  setSelectedLocation(location);
                }}
                onDeleteSavedSearch={deleteSavedSearch}
                selectedLocation={selectedLocation}
                onSaveSearch={handleSaveSearch}
                mode={
                  activeRoute === "my-searches"
                    ? "savedSearch"
                    : ["interested", "not-interested", "recently-viewed"].includes(activeRoute)
                      ? "board"
                      : "search"
                }
                title={
                  activeRoute === "my-searches"
                    ? selectedSavedSearch?.name
                    : routeTitles[activeRoute]
                }
              />
            </aside>
            <div className="relative h-full min-h-0 overflow-hidden border-l border-border">
              <MapPanel
                mode={
                  (activeRoute === "my-searches" && selectedSavedSearch)
                    ? "savedSearch"
                    : ["interested", "not-interested", "recently-viewed"].includes(activeRoute)
                      ? "board"
                      : "search"
                }
                properties={routeProperties}
                drawingMode={drawingMode}
                onToggleDrawingMode={() => setDrawingMode(!drawingMode)}
                customBoundaryActive={customBoundaryActive}
                selectedLocation={selectedLocation}
                mapLayer="Street"
                onMarkerClick={(property) => {
                  setSelectedPropertyId(property.id);
                  markVisited(property.id);
                }}
                onMapClick={() => {
                  if (drawingMode) {
                    setCustomBoundaryActive(true);
                    setDrawingMode(false);
                  }
                }}
                onSaveSearch={handleSaveSearch}
                minPrice={minPrice}
                maxPrice={maxPrice}
                moreFilters={moreFilters}
              />
            </div>
          </section>
        </div>
      )}
      <AdvancedFiltersSheet
        open={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        value={moreFilters as any}
        onSave={(next) => {
          setMoreFilters((prev) => ({
            ...prev,
            ...next,
          }));
        }}
        isEditMode={activeRoute === "my-searches" && !!selectedSavedSearchId}
      />
      <PropertyDetailDialog
        property={activePropertyModal}
        open={Boolean(activePropertyModal)}
        onClose={() => setActivePropertyModal(null)}
        onLike={handleLike}
        onDislike={handleDislike}
      />
      <WillowFloatingAssistant 
        context={activeRoute as WillowContext} 
      />
    </>
  );
}
