"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "./Sidebar";
import { SearchHeader } from "./SearchHeader";
import { ResultsPanel } from "./ResultsPanel";
import { MapPanel } from "./MapPanel";
import { SaveSearchDialog } from "./SaveSearchDialog";
import { FiltersDialog } from "./FiltersDialog";
import { PropertyDetailDialog } from "./PropertyDetailDialog";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Property, RouteKey, SavedSearch } from "./mockData";
import { initialSavedSearches, moreFilterDefaults, properties } from "./mockData";

type MoreFilters = typeof moreFilterDefaults;

const routeTitles: Record<RouteKey, string> = {
  search: "Search",
  matches: "My Matches",
  "my-searches": "My Home Search",
  interested: "Interested",
  "not-interested": "Not Interested",
  profile: "My Profile",
  settings: "Settings"
};

export function AppShell() {
  const [activeRoute, setActiveRoute] = useState<RouteKey>("search");
  const [expandedSidebarGroups, setExpandedSidebarGroups] = useState<Record<string, boolean>>({
    searches: true,
    leads: true,
    account: true
  });
  const [selectedLocation, setSelectedLocation] = useState("All areas");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("2000000");
  const [moreFilters, setMoreFilters] = useState<MoreFilters>(moreFilterDefaults);
  const [sortValue, setSortValue] = useState("match-desc");
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(initialSavedSearches);
  const [likedPropertyIds, setLikedPropertyIds] = useState<string[]>([]);
  const [dislikedPropertyIds, setDislikedPropertyIds] = useState<string[]>([]);
  const [activePropertyModal, setActivePropertyModal] = useState<Property | null>(null);
  const [saveSearchModalOpen, setSaveSearchModalOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [customBoundaryActive, setCustomBoundaryActive] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [mapLayer, setMapLayer] = useState("standard");

  const filteredProperties = useMemo(() => {
    const min = Number(minPrice || "0");
    const max = Number(maxPrice || "99999999");
    const location = selectedLocation.toLowerCase();

    const results = properties.filter((property) => {
      const matchesPrice = property.price >= min && property.price <= max;
      const matchesLocation =
        selectedLocation === "All areas" ||
        property.area.toLowerCase().includes(location) ||
        property.address.toLowerCase().includes(location);
      const matchesType = moreFilters.propertyType === "Any" || property.type === moreFilters.propertyType;
      const matchesBeds = moreFilters.beds === "Any" || property.beds >= Number(moreFilters.beds.replace("+", ""));
      const matchesBaths = moreFilters.baths === "Any" || property.baths >= Number(moreFilters.baths.replace("+", ""));
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

      return matchesPrice && matchesLocation && matchesType && matchesBeds && matchesBaths && matchesYear && matchesLot;
    });

    const byMatchScore = [...results].sort((a, b) => b.matchScore - a.matchScore);
    const byPriceAsc = [...results].sort((a, b) => a.price - b.price);
    const byPriceDesc = [...results].sort((a, b) => b.price - a.price);
    const byBeds = [...results].sort((a, b) => b.beds - a.beds);
    const bySqft = [...results].sort((a, b) => b.sqft - a.sqft);
    const newest = [...results].sort((a, b) => b.yearBuilt - a.yearBuilt);

    switch (sortValue) {
      case "price-asc":
        return byPriceAsc;
      case "price-desc":
        return byPriceDesc;
      case "beds-desc":
        return byBeds;
      case "sqft-desc":
        return bySqft;
      case "newest":
        return newest;
      default:
        return byMatchScore;
    }
  }, [maxPrice, minPrice, moreFilters, selectedLocation, sortValue]);

  const routeProperties = useMemo(() => {
    if (activeRoute === "matches") return filteredProperties;
    if (activeRoute === "interested") return filteredProperties.filter((item) => likedPropertyIds.includes(item.id));
    if (activeRoute === "not-interested") return filteredProperties.filter((item) => dislikedPropertyIds.includes(item.id));
    return filteredProperties;
  }, [activeRoute, dislikedPropertyIds, filteredProperties, likedPropertyIds]);

  const handleLike = (property: Property) => {
    setLikedPropertyIds((current) => (current.includes(property.id) ? current : [...current, property.id]));
    setDislikedPropertyIds((current) => current.filter((id) => id !== property.id));
  };

  const handleDislike = (property: Property) => {
    setDislikedPropertyIds((current) => (current.includes(property.id) ? current : [...current, property.id]));
    setLikedPropertyIds((current) => current.filter((id) => id !== property.id));
  };

  const handleSaveSearch = (name: string, frequency: string) => {
    setSavedSearches((current) => [
      {
        id: `search-${current.length + 1}`,
        name,
        location: selectedLocation,
        criteria: `${moreFilters.propertyType} · ${minPrice || "No min"} to ${maxPrice} · ${routeProperties.length} homes`,
        frequency:
          frequency === "instant"
            ? "Instant"
            : frequency === "weekly"
            ? "Weekly"
            : frequency === "biweekly"
            ? "Every 2 weeks"
            : "Daily",
        updatedAt: "Just now"
      },
      ...current
    ]);
  };

  const routeHeader = (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
      <div>
        <div className="text-2xl font-semibold text-slate-900">{routeTitles[activeRoute]}</div>
        <div className="mt-1 text-sm text-slate-500">MEL scores, shared CRM state, and quiet premium search flows.</div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{savedSearches.length} saved searches</Badge>
        <Badge variant="success">{likedPropertyIds.length} interested</Badge>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Sidebar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        expandedSidebarGroups={expandedSidebarGroups}
        setExpandedSidebarGroups={setExpandedSidebarGroups}
        savedSearches={savedSearches}
        likedCount={likedPropertyIds.length}
        dislikedCount={dislikedPropertyIds.length}
      />

      <main className="min-h-screen pl-[220px]">
        {activeRoute === "profile" ? (
          <ProfilePage />
        ) : activeRoute === "settings" ? (
          <SettingsPage />
        ) : (
          <div className="flex min-h-screen flex-col">
            {routeHeader}
            <SearchHeader
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              sortValue={sortValue}
              setSortValue={setSortValue}
              drawingMode={drawingMode}
              setDrawingMode={(value) => {
                setDrawingMode(value);
                if (!value && !customBoundaryActive) return;
              }}
              customBoundaryActive={customBoundaryActive}
              setCustomBoundaryActive={setCustomBoundaryActive}
              mapLayer={mapLayer}
              setMapLayer={setMapLayer}
              onOpenFilters={() => setFiltersModalOpen(true)}
              onOpenSaveSearch={() => setSaveSearchModalOpen(true)}
              resultsCount={routeProperties.length}
            />

            <div className="flex flex-1">
              <ResultsPanel
                route={activeRoute}
                properties={routeProperties}
                likedIds={likedPropertyIds}
                dislikedIds={dislikedPropertyIds}
                savedSearches={savedSearches}
                onOpenProperty={(property) => setActivePropertyModal(property)}
                onLike={handleLike}
                onDislike={handleDislike}
                onEditSearch={() => setFiltersModalOpen(true)}
                onRunSavedSearch={(location) => {
                  setActiveRoute("search");
                  setSelectedLocation(location);
                }}
                onDeleteSavedSearch={(id) => setSavedSearches((current) => current.filter((item) => item.id !== id))}
              />
              <MapPanel
                properties={routeProperties}
                drawingMode={drawingMode}
                customBoundaryActive={customBoundaryActive}
                selectedLocation={selectedLocation}
                mapLayer={mapLayer}
                onMarkerClick={(property) => setActivePropertyModal(property)}
                onMapClick={() => {
                  if (drawingMode) {
                    setCustomBoundaryActive(true);
                    setDrawingMode(false);
                  }
                }}
              />
            </div>
          </div>
        )}
      </main>

      <SaveSearchDialog
        open={saveSearchModalOpen}
        onClose={() => setSaveSearchModalOpen(false)}
        onSave={handleSaveSearch}
        selectedLocation={selectedLocation}
        visibleCount={routeProperties.length}
      />
      <FiltersDialog
        open={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        value={moreFilters}
        onSave={setMoreFilters}
      />
      <PropertyDetailDialog
        property={activePropertyModal}
        open={Boolean(activePropertyModal)}
        onClose={() => setActivePropertyModal(null)}
        onLike={handleLike}
        onDislike={handleDislike}
      />

      {cookieAccepted ? null : (
        <div className="fixed bottom-4 left-[236px] right-4 z-40">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
            <div>
              <div className="text-sm font-medium text-slate-900">We use cookies for this client portal.</div>
              <div className="text-sm text-slate-500">Continue to keep the demo state live.</div>
            </div>
            <Button onClick={() => setCookieAccepted(true)}>Continue</Button>
          </div>
        </div>
      )}
    </div>
  );
}
