"use client";

import { ChevronRight } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { Card, CardContent } from "./ui/card";
import type { Property, RouteKey, SavedSearch } from "./mockData";
import { PropertyResultsToolbar } from "./PropertyResultsToolbar";

type Props = {
  route: RouteKey;
  properties: Property[];
  totalCount: number;
  sortValue: string;
  onSortChange: (val: string) => void;
  savedSearches: SavedSearch[];
  selectedSavedSearch?: SavedSearch;
  onOpenProperty: (p: Property) => void;
  onLike: (p: Property) => void;
  onDislike: (p: Property) => void;
  onEditSearch: () => void;
  onRunSavedSearch: (location: string) => void;
  onDeleteSavedSearch: (id: string) => void;
  selectedLocation: string;
  onSaveSearch: (name: string, frequency: string, emailAlerts: boolean) => void;
  mode?: string;
  title?: string;
};

function sectionCopy(route: RouteKey, count: number, selectedSavedSearch?: SavedSearch) {
  switch (route) {
    case "interested":
      return { title: "Interested", description: "Homes you've liked for easy follow-up." };
    case "not-interested":
      return { title: "Not Interested", description: "Hidden from match recommendations." };
    case "recently-viewed":
      return { title: "Recently Viewed", description: "List of properties you've looked at lately." };
    case "my-searches":
      return { 
        title: selectedSavedSearch?.name || "My Searches", 
        description: "Recommendations and map results based on this search." 
      };
    default:
      return { title: "Search", description: "Browse live inventory and match scores." };
  }
}

export function ResultsPanel({
  route,
  properties,
  totalCount,
  sortValue,
  onSortChange,
  savedSearches,
  selectedSavedSearch,
  onOpenProperty,
  onLike,
  onDislike,
  onEditSearch,
  onRunSavedSearch,
  onDeleteSavedSearch,
  selectedLocation,
  onSaveSearch,
  mode,
  title
}: Props) {
  const visibleCount = properties.length;

  return (
    <div className="flex-1 bg-slate-50 flex flex-col min-h-full">
      <div className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">

          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpen={() => onOpenProperty(property)}
              onLike={() => onLike(property)}
              onDislike={() => onDislike(property)}
              route={route}
              isHomeValue={route === "home-value"}
            />
          ))}
        </div>
        {properties.length === 0 ? (
          <Card className="border-dashed border-slate-300 bg-white">
            <CardContent className="py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <ChevronRight className="h-5 w-5 rotate-90" />
              </div>
              <div className="mt-3 text-sm font-medium text-slate-900">No homes here</div>
              <div className="mt-1 text-sm text-slate-500">Adjust filters or save a new search.</div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  </div>
);
}
