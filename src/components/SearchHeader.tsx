"use client";

import { Filter, Save, LocateFixed, Search, Map, Check, X, ChevronDown, Bed, Bath, Home, Sparkles, DollarSign, Pencil, Coffee, Baby, TrendingUp, Zap, Car, Train, Bike, Footprints, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SaveSearchDialog } from "./SaveSearchDialog";
import { EditSearchSheet } from "./EditSearchSheet";
import { ControlPill } from "@/components/ui/control-pill";
import { useState, useMemo } from "react";
import { MoreFiltersState, defaultMoreFilters } from "./PropertyContext";
import { MoreFiltersContent } from "./MoreFiltersContent";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/use-media-query";
import { sortOptions } from "./mockData";

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
  moreFilters: MoreFiltersState;
  setMoreFilters: (val: MoreFiltersState) => void;
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
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [localMoreFilters, setLocalMoreFilters] = useState<MoreFiltersState>(moreFilters);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const activeCount = useMemo(() => {
    let count = 0;
    if (moreFilters.maxHoa !== defaultMoreFilters.maxHoa) count++;
    
    // Listing Type (Only count if not default)
    const lt = moreFilters.listingType;
    const dlt = defaultMoreFilters.listingType;
    if (lt.ownerPosted !== dlt.ownerPosted || 
        lt.agentListed !== dlt.agentListed || 
        lt.newConstruction !== dlt.newConstruction || 
        lt.foreclosures !== dlt.foreclosures || 
        lt.auctions !== dlt.auctions) count++;

    // Listing Status (Only count if not default)
    const ls = moreFilters.listingStatus;
    const dls = defaultMoreFilters.listingStatus;
    if (ls.comingSoon !== dls.comingSoon || 
        ls.acceptingBackupOffers !== dls.acceptingBackupOffers || 
        ls.pendingUnderContract !== dls.pendingUnderContract) count++;

    // Tours
    if (moreFilters.tours.openHouse || moreFilters.tours.threeDTour || moreFilters.tours.showcase) count++;
    
    if (moreFilters.parkingSpots !== defaultMoreFilters.parkingSpots) count++;
    if (moreFilters.garage) count++;
    if (moreFilters.squareFeetMin !== defaultMoreFilters.squareFeetMin) count++;
    if (moreFilters.squareFeetMax !== defaultMoreFilters.squareFeetMax) count++;
    if (moreFilters.lotSizeMin !== defaultMoreFilters.lotSizeMin) count++;
    if (moreFilters.lotSizeMax !== defaultMoreFilters.lotSizeMax) count++;
    if (moreFilters.yearBuiltMin !== "") count++;
    if (moreFilters.yearBuiltMax !== "") count++;
    if (moreFilters.basement) count++;
    if (moreFilters.singleStoryOnly) count++;
    if (moreFilters.communities55 !== defaultMoreFilters.communities55) count++;
    
    // Amenities
    if (moreFilters.amenities.ac || moreFilters.amenities.pool || moreFilters.amenities.waterfront) count++;
    
    // View
    if (moreFilters.view.city || moreFilters.view.mountain || moreFilters.view.park || moreFilters.view.water) count++;
    
    if (moreFilters.commuteAddress !== "") count++;
    if (moreFilters.commuteTime !== defaultMoreFilters.commuteTime && moreFilters.commuteAddress !== "") count++;
    if (moreFilters.daysOnMarket !== defaultMoreFilters.daysOnMarket) count++;
    if (moreFilters.keywords !== "") count++;

    return count;
  }, [moreFilters]);

  const handleApply = () => {
    setMoreFilters(localMoreFilters);
    setIsMoreFiltersOpen(false);
  };

  const handleReset = () => {
    setLocalMoreFilters(defaultMoreFilters);
  };

  const isMoreFiltersActive = activeCount > 0;

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
              {/* For sale */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    label="For sale"
                    active
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>For sale</DropdownMenuItem>
                  <DropdownMenuItem>For rent</DropdownMenuItem>
                  <DropdownMenuItem>Sold</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Price Chip */}
              <Popover>
                <PopoverTrigger asChild>
                  <ControlPill 
                    icon={<DollarSign className="h-4 w-4" />}
                    label={minPrice !== "0" || maxPrice !== "2000000" 
                      ? `${minPrice === "0" ? "" : `$${Number(minPrice)/1000}K`}${minPrice !== "0" && maxPrice !== "2000000" ? "-" : ""}${maxPrice === "2000000" ? (minPrice === "0" ? "Price" : "+") : `$${Number(maxPrice)/1000}K`}` 
                      : "Price"}
                    active={!!(minPrice !== "0" || maxPrice !== "2000000")}
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

              {/* Beds & Baths Chip */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    icon={<Bed className="h-4 w-4" />}
                    label={(moreFilters.beds && moreFilters.beds !== "Any") || (moreFilters.baths && moreFilters.baths !== "Any") 
                      ? `${moreFilters.beds !== "Any" ? moreFilters.beds : "0"} bd, ${moreFilters.baths !== "Any" ? moreFilters.baths : "0"} ba` 
                      : "Beds & baths"}
                    active={!!((moreFilters.beds && moreFilters.beds !== "Any") || (moreFilters.baths && moreFilters.baths !== "Any"))}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-3">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Beds</Label>
                      <ToggleGroup 
                        type="single" 
                        value={moreFilters.beds} 
                        onValueChange={(val) => val && setMoreFilters({ ...moreFilters, beds: val })}
                        className="justify-start"
                      >
                        {["Any", "1+", "2+", "3+", "4+"].map(v => (
                          <ToggleGroupItem key={v} value={v} className="h-8 px-2.5 text-xs rounded-md">{v}</ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Baths</Label>
                      <ToggleGroup 
                        type="single" 
                        value={moreFilters.baths} 
                        onValueChange={(val) => val && setMoreFilters({ ...moreFilters, baths: val })}
                        className="justify-start"
                      >
                        {["Any", "1+", "1.5+", "2+", "3+"].map(v => (
                          <ToggleGroupItem key={v} value={v} className="h-8 px-2.5 text-xs rounded-md">{v}</ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Property Type Chip */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ControlPill 
                    icon={<Home className="h-4 w-4" />}
                    label={moreFilters.propertyType !== "Any" ? moreFilters.propertyType : "Property type"}
                    active={!!(moreFilters.propertyType && moreFilters.propertyType !== "Any")}
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

              {/* More Filters */}
              {isDesktop ? (
                <Popover open={isMoreFiltersOpen} onOpenChange={setIsMoreFiltersOpen}>
                  <PopoverTrigger asChild>
                    <ControlPill 
                      label={isMoreFiltersActive ? `More filters · ${activeCount}` : "More filters"}
                      active={!!isMoreFiltersActive}
                      icon={<ChevronDown className={cn("h-4 w-4 transition-transform", isMoreFiltersOpen && "rotate-180")} />}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[740px] p-0" align="end">
                    <MoreFiltersContent 
                      filters={localMoreFilters} 
                      onChange={setLocalMoreFilters} 
                      onApply={handleApply}
                      onReset={handleReset}
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <Sheet open={isMoreFiltersOpen} onOpenChange={setIsMoreFiltersOpen}>
                  <SheetTrigger asChild>
                    <ControlPill 
                      label={isMoreFiltersActive ? `More filters · ${activeCount}` : "More filters"}
                      active={!!isMoreFiltersActive}
                    />
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-[20px]">
                    <SheetHeader className="px-6 py-4 border-b">
                      <SheetTitle>More filters</SheetTitle>
                    </SheetHeader>
                    <MoreFiltersContent 
                      filters={localMoreFilters} 
                      onChange={setLocalMoreFilters} 
                      onApply={handleApply}
                      onReset={handleReset}
                    />
                  </SheetContent>
                </Sheet>
              )}

              {/* Save Search */}
              <SaveSearchDialog 
                onSave={onSaveSearch}
                selectedLocation={selectedLocation}
                minPrice={minPrice}
                maxPrice={maxPrice}
                activeFilters={{
                  beds: moreFilters.beds,
                  baths: moreFilters.baths,
                  propertyType: moreFilters.propertyType,
                  matchScore: "Any"
                }}
              >
                <Button variant="ghost" size="sm" className="h-9 rounded-full px-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold gap-2">
                  <Save className="h-4 w-4" />
                  Save search
                </Button>
              </SaveSearchDialog>
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



