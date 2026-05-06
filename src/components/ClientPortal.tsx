"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchHeader } from "./SearchHeader";
import { ResultsPanel } from "./ResultsPanel";
import { MapPanel } from "./MapPanel";
import { SaveSearchDialog } from "./SaveSearchDialog";

export type BoardMode = "search" | "myMatches" | "savedSearch" | "board";
import { AdvancedFiltersSheet } from "./AdvancedFiltersSheet";
import { PropertyDetailDialog } from "./PropertyDetailDialog";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { MessagesPanel } from "./client-portal/MessagesPanel";
import type { Property, RouteKey, SavedSearch } from "./mockData";
import { moreFilterDefaults } from "./mockData";
import { usePropertyContext } from "./PropertyContext";

const routeTitles: Record<RouteKey, string> = {
  search: "Search",
  matches: "My Matches",
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
  const [moreFilters, setMoreFilters] = useState({
    ...moreFilterDefaults,
    matchScore: "Any"
  });
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
    updateSavedSearch
  } = usePropertyContext();

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
    return allProperties.filter((p) => p.status === "search");
  }, [activeRoute, allProperties, visitedIds, selectedSavedSearch]);

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

      const matchesYear =
        moreFilters.yearBuilt === "Any" ||
        (moreFilters.yearBuilt === "2015+" && property.yearBuilt >= 2015) ||
        (moreFilters.yearBuilt === "2020+" && property.yearBuilt >= 2020) ||
        (moreFilters.yearBuilt === "New build" && property.yearBuilt >= 2022);

      const matchesLot =
        moreFilters.lot === "Any" ||
        (moreFilters.lot === "Small lot" && property.lot !== "N/A" && parseFloat(property.lot) <= 0.12) ||
        (moreFilters.lot === "Medium lot" && property.lot !== "N/A" && parseFloat(property.lot) > 0.12 && parseFloat(property.lot) <= 0.2) ||
        (moreFilters.lot === "Large lot" && property.lot !== "N/A" && parseFloat(property.lot) > 0.2);

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
      ) : activeRoute === "messages" ? (
        <MessagesPanel />
      ) : (
        <div className="flex flex-col h-screen overflow-hidden">
          <SearchHeader
            mode={
              activeRoute === "my-searches" && selectedSavedSearchId
                ? "savedSearch"
                : ["matches", "interested", "not-interested", "recently-viewed"].includes(activeRoute)
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

          <div className="flex-1 flex overflow-hidden">
            <div className="w-[45%] flex flex-col h-full overflow-hidden border-r border-slate-200">
              <ResultsPanel
                route={activeRoute}
                properties={routeProperties}
                totalCount={totalCount}
                sortValue={sortValue}
                onSortChange={setSortValue}
                savedSearches={savedSearches}
                selectedSavedSearch={selectedSavedSearch}
                onOpenProperty={(property) => {
                  setActivePropertyModal(property);
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
                  activeRoute === "matches"
                    ? "board"
                    : activeRoute === "my-searches"
                      ? "savedSearch"
                      : ["interested", "not-interested", "recently-viewed"].includes(activeRoute)
                        ? "board"
                        : "search"
                }
                title={
                  activeRoute === "matches"
                    ? "My Matches"
                    : activeRoute === "my-searches"
                      ? selectedSavedSearch?.name
                      : routeTitles[activeRoute]
                }
              />

            </div>
            <div className="w-[55%] h-full">
              <MapPanel
                mode={
                  activeRoute === "matches"
                    ? "myMatches"
                    : (activeRoute === "my-searches" && selectedSavedSearch)
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
                  setActivePropertyModal(property);
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
          </div>
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
    </>
  );
}
