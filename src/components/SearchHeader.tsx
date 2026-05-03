"use client";

import { Filter, Save, LocateFixed, Layers3, SquarePen, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Badge } from "./ui/badge";
import { locationSuggestions, maxPriceOptions, priceOptions, sortOptions, mapLayers } from "./mockData";

type Props = {
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  sortValue: string;
  setSortValue: (value: string) => void;
  drawingMode: boolean;
  setDrawingMode: (value: boolean) => void;
  customBoundaryActive: boolean;
  setCustomBoundaryActive: (value: boolean) => void;
  mapLayer: string;
  setMapLayer: (value: string) => void;
  onOpenFilters: () => void;
  onOpenSaveSearch: () => void;
  resultsCount: number;
};

export function SearchHeader({
  selectedLocation,
  setSelectedLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortValue,
  setSortValue,
  drawingMode,
  setDrawingMode,
  customBoundaryActive,
  setCustomBoundaryActive,
  mapLayer,
  setMapLayer,
  onOpenFilters,
  onOpenSaveSearch,
  resultsCount
}: Props) {
  return (
    <div className="border-b border-slate-200 bg-white px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            placeholder="Search neighborhoods, schools, address"
            className="pl-4 pr-16"
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            <LocateFixed className="h-4 w-4" />
          </div>
        </div>
        <Button variant="outline" onClick={onOpenFilters}>
          <Filter className="h-4 w-4" />
          More filters
        </Button>
        <Button variant="outline" onClick={onOpenSaveSearch}>
          <Save className="h-4 w-4" />
          Save search
        </Button>
        <Button variant={drawingMode ? "success" : "outline"} onClick={() => setDrawingMode(!drawingMode)}>
          <SquarePen className="h-4 w-4" />
          Draw
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-3">
        <Select value={minPrice} onValueChange={setMinPrice} options={priceOptions} ariaLabel="Minimum price" />
        <Select value={maxPrice} onValueChange={setMaxPrice} options={maxPriceOptions} ariaLabel="Maximum price" />
        <Select value={sortValue} onValueChange={setSortValue} options={sortOptions} ariaLabel="Sort results" />
        <Select value={mapLayer} onValueChange={setMapLayer} options={mapLayers} ariaLabel="Map layers" />
        <div className="flex items-center gap-2">
          {customBoundaryActive ? (
            <button
              className="flex h-10 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 text-sm font-medium text-blue-700"
              onClick={() => setCustomBoundaryActive(false)}
            >
              Searching in Custom
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Badge variant="muted" className="h-10 px-3">
              {resultsCount} results
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">Suggestions</div>
        {locationSuggestions.slice(1).map((item) => (
          <button
            key={item}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 hover:bg-slate-100"
            onClick={() => setSelectedLocation(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
