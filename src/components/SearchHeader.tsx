"use client";

import { Filter, Save, LocateFixed, Search, Map, Check, X, ChevronDown, Bed, Bath, Home, Sparkles, DollarSign, Pencil, Coffee, Baby, TrendingUp, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { SaveSearchDialog } from "./SaveSearchDialog";
import { EditSearchSheet } from "./EditSearchSheet";
import { ControlPill } from "./ui/control-pill";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { sortOptions } from "./mockData";
import { Slider } from "./ui/slider";

export type BoardMode = "search" | "myMatches" | "savedSearch" | "board";

type Props = {
  mode?: BoardMode;
  title?: string;
  totalCount?: number;
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  onOpenFilters: () => void;
  onSaveSearch: (name: string, frequency: string, emailAlerts: boolean) => void;
  onUpdateSearch?: (search: any) => void;
  currentSearch?: any;
  resultsCount: number;
  moreFilters: any;
  setMoreFilters: (val: any) => void;
  drawingMode: boolean;
  onToggleDrawingMode: () => void;
  customBoundaryActive: boolean;
  sortValue: string;
  onSortChange: (val: string) => void;
  isEditMode?: boolean;
  suggestions?: Array<{ label: string; icon: string }>;
};

export function SearchHeader({
  mode = "search",
  title,
  totalCount,
  selectedLocation,
  setSelectedLocation,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onOpenFilters,
  onSaveSearch,
  onUpdateSearch,
  currentSearch,
  resultsCount,
  moreFilters,
  setMoreFilters,
  drawingMode,
  onToggleDrawingMode,
  customBoundaryActive,
  sortValue,
  onSortChange,
  isEditMode,
  suggestions = []
}: Props) {
  const isSearchMode = mode === "search";
  const isSavedSearchBoard = mode === "savedSearch";
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200">
      {/* Row 1: Search Input Only */}
      <div className="border-b bg-background px-4 py-3">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search className="h-4.5 w-4.5" />
          </div>
          <Input
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            placeholder="Search neighborhoods, schools, address"
            className="pl-11 pr-4 h-11 w-full rounded-xl border-slate-200 bg-slate-50/50 focus-visible:ring-slate-400 text-sm shadow-sm transition-all duration-200"
          />
        </div>
      </div>

      {/* Row 2: Title, Context, Filters & Sort */}
      <div className="flex h-14 items-center gap-3 border-b px-4 bg-white">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="text-base font-semibold tracking-tight text-foreground whitespace-nowrap">
            {isSearchMode ? "Search" : title}
          </h1>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Showing {resultsCount} of {totalCount} listings
          </span>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-2 overflow-x-auto no-scrollbar">
          {isSearchMode && (
            <div className="flex items-center gap-2 shrink-0">

              {/* Price Chip */}
              <Popover>
                <PopoverTrigger asChild>
                  <ControlPill 
                    icon={<DollarSign className="h-4 w-4" />}
                    label={minPrice !== "0" || maxPrice !== "2000000" 
                      ? `${minPrice === "0" ? "" : `$${Number(minPrice)/1000}K`}${minPrice !== "0" && maxPrice !== "2000000" ? "-" : ""}${maxPrice === "2000000" ? (minPrice === "0" ? "Price" : "+") : `$${Number(maxPrice)/1000}K`}` 
                      : "Price"}
                    active={minPrice !== "0" || maxPrice !== "2000000"}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-foreground">Price Range</h4>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground" onClick={() => { setMinPrice("0"); setMaxPrice("2000000"); }}>Reset</Button>
                    </div>
                    
                    <div className="px-2">
                      <Slider
                        value={[Number(minPrice), Number(maxPrice)]}
                        min={0}
                        max={2000000}
                        step={50000}
                        onValueChange={([min, max]) => {
                          setMinPrice(min.toString());
                          setMaxPrice(max.toString());
                        }}
                        className="my-6"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Min Price</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                          <Input 
                            value={minPrice === "0" ? "" : minPrice} 
                            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, "") || "0")}
                            className="h-10 pl-6 text-sm border-border bg-slate-50/50 focus-visible:ring-primary/20 rounded-lg"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Max Price</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                          <Input 
                            value={maxPrice === "2000000" ? "" : maxPrice} 
                            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, "") || "2000000")}
                            className="h-10 pl-6 text-sm border-border bg-slate-50/50 focus-visible:ring-primary/20 rounded-lg"
                            placeholder="Any"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider mb-2 block">Quick Presets</Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "Under $750K", min: "0", max: "750000" },
                          { label: "Under $1M", min: "0", max: "1000000" },
                          { label: "$1M–$2M", min: "1000000", max: "2000000" },
                          { label: "$2M+", min: "2000000", max: "5000000" },
                        ].map((preset) => (
                          <Button
                            key={preset.label}
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-full text-xs font-normal border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
                            onClick={() => { setMinPrice(preset.min); setMaxPrice(preset.max); }}
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Beds Chip */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    icon={<Bed className="h-4 w-4" />}
                    label={moreFilters.beds && moreFilters.beds !== "Any" ? `${moreFilters.beds} beds` : "Beds"}
                    active={moreFilters.beds && moreFilters.beds !== "Any"}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Beds</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup 
                    value={moreFilters.beds} 
                    onValueChange={(val) => setMoreFilters({ ...moreFilters, beds: val })}
                  >
                    <DropdownMenuRadioItem value="Any">Any beds</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="1+">1+ beds</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2+">2+ beds</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3+">3+ beds</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="4+">4+ beds</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="5+">5+ beds</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Baths Chip */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    icon={<Bath className="h-4 w-4" />}
                    label={moreFilters.baths && moreFilters.baths !== "Any" ? `${moreFilters.baths} baths` : "Baths"}
                    active={moreFilters.baths && moreFilters.baths !== "Any"}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Baths</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup 
                    value={moreFilters.baths} 
                    onValueChange={(val) => setMoreFilters({ ...moreFilters, baths: val })}
                  >
                    <DropdownMenuRadioItem value="Any">Any baths</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="1+">1+ baths</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="2+">2+ baths</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="3+">3+ baths</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="4+">4+ baths</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Home Type Chip */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    icon={<Home className="h-4 w-4" />}
                    label={moreFilters.propertyType !== "Any" ? moreFilters.propertyType : "Home type"}
                    active={moreFilters.propertyType !== "Any"}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Property Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup 
                    value={moreFilters.propertyType} 
                    onValueChange={(val) => setMoreFilters({ ...moreFilters, propertyType: val })}
                  >
                    <DropdownMenuRadioItem value="Any">All property types</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Houses">Houses</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Townhomes">Townhomes</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Condos">Condos</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Land">Land</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Match Chip */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    icon={<Sparkles className="h-4 w-4" />}
                    label={moreFilters.matchScore && moreFilters.matchScore !== "Any" ? `${moreFilters.matchScore} match` : "Match"}
                    active={moreFilters.matchScore && moreFilters.matchScore !== "Any"}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Match Score</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup 
                    value={moreFilters.matchScore} 
                    onValueChange={(val) => setMoreFilters({ ...moreFilters, matchScore: val })}
                  >
                    <DropdownMenuRadioItem value="Any">Any match score</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="80+">80+ match score</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="90+">90+ match score</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="95+">95+ match score</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <div className="flex items-center gap-3 shrink-0 ml-4">
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ControlPill 
                  label={sortOptions.find(opt => opt.value === sortValue)?.label || "Sort by"} 
                  active 
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortValue} onValueChange={onSortChange}>
                  {sortOptions.map((opt) => (
                    <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {isSavedSearchBoard && (
              <>
                <Button 
                  variant="outline" 
                  className="h-9 rounded-full px-4 text-sm border-slate-200 shadow-sm hover:bg-slate-50 transition-all"
                  onClick={() => setIsEditSheetOpen(true)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Search
                </Button>
                <EditSearchSheet 
                  open={isEditSheetOpen}
                  onClose={() => setIsEditSheetOpen(false)}
                  search={currentSearch}
                  onSave={(updated) => onUpdateSearch?.(updated)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
