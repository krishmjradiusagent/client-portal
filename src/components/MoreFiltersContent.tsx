"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  ChevronDown, 
  LocateFixed, 
  Car, 
  Train, 
  Bike, 
  Footprints, 
  Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoreFiltersState } from "./PropertyContext";

export function parseLotSize(val: string) {
  if (!val || val === "Any" || val === "No Min" || val === "No Max") return 0;
  if (val.includes("acres")) return Number(val.split(" ")[0]) * 43560;
  return Number(val.split(" ")[0].replace(/,/g, ""));
}

interface MoreFiltersContentProps {
  filters: MoreFiltersState;
  onChange: (f: MoreFiltersState) => void;
  onApply: () => void;
  onReset: () => void;
}

export function MoreFiltersContent({ 
  filters, 
  onChange, 
  onApply, 
  onReset 
}: MoreFiltersContentProps) {
  const [commuteOpen, setCommuteOpen] = useState(filters.commuteFiltersOpen);

  useEffect(() => {
    setCommuteOpen(filters.commuteFiltersOpen);
  }, [filters.commuteFiltersOpen]);

  const updateFilter = (key: keyof MoreFiltersState, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const updateNested = (parent: keyof MoreFiltersState, key: string, value: any) => {
    onChange({
      ...filters,
      [parent]: {
        ...(filters[parent] as any),
        [key]: value
      }
    });
  };

  const isValid = useMemo(() => {
    const sqftMin = filters.squareFeetMin === "No Min" ? 0 : Number(filters.squareFeetMin.replace(/,/g, ""));
    const sqftMax = filters.squareFeetMax === "No Max" ? Infinity : Number(filters.squareFeetMax.replace(/,/g, ""));
    if (sqftMin > sqftMax) return false;

    const lotMin = filters.lotSizeMin === "No Min" ? 0 : parseLotSize(filters.lotSizeMin);
    const lotMax = filters.lotSizeMax === "No Max" ? Infinity : parseLotSize(filters.lotSizeMax);
    if (lotMin > lotMax) return false;

    const yearMin = filters.yearBuiltMin === "" ? 0 : Number(filters.yearBuiltMin);
    const yearMax = filters.yearBuiltMax === "" ? Infinity : Number(filters.yearBuiltMax);
    if (yearMin > yearMax) return false;

    return true;
  }, [filters]);

  const sqftError = useMemo(() => {
    const min = filters.squareFeetMin === "No Min" ? 0 : Number(filters.squareFeetMin.replace(/,/g, ""));
    const max = filters.squareFeetMax === "No Max" ? Infinity : Number(filters.squareFeetMax.replace(/,/g, ""));
    return min > max ? "Min can't be greater than max." : null;
  }, [filters.squareFeetMin, filters.squareFeetMax]);

  const lotError = useMemo(() => {
    const min = filters.lotSizeMin === "No Min" ? 0 : parseLotSize(filters.lotSizeMin);
    const max = filters.lotSizeMax === "No Max" ? Infinity : parseLotSize(filters.lotSizeMax);
    return min > max ? "Min can't be greater than max." : null;
  }, [filters.lotSizeMin, filters.lotSizeMax]);

  const yearError = useMemo(() => {
    const min = filters.yearBuiltMin === "" ? 0 : Number(filters.yearBuiltMin);
    const max = filters.yearBuiltMax === "" ? Infinity : Number(filters.yearBuiltMax);
    return min > max ? "Min can't be greater than max." : null;
  }, [filters.yearBuiltMin, filters.yearBuiltMax]);

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-160px)]">
      <div className="flex-1 overflow-y-auto p-6 space-y-10 no-scrollbar">
        {/* Listing Status */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Listing Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="comingSoon" 
                checked={filters.listingStatus.comingSoon}
                onCheckedChange={(checked) => updateNested("listingStatus", "comingSoon", !!checked)}
              />
              <Label htmlFor="comingSoon" className="text-sm font-medium cursor-pointer">Coming Soon</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="acceptingBackupOffers" 
                checked={filters.listingStatus.acceptingBackupOffers}
                onCheckedChange={(checked) => updateNested("listingStatus", "acceptingBackupOffers", !!checked)}
              />
              <Label htmlFor="acceptingBackupOffers" className="text-sm font-medium cursor-pointer">Accepting Backup Offers</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="pendingUnderContract" 
                checked={filters.listingStatus.pendingUnderContract}
                onCheckedChange={(checked) => updateNested("listingStatus", "pendingUnderContract", !!checked)}
              />
              <Label htmlFor="pendingUnderContract" className="text-sm font-medium cursor-pointer">Pending & Under Contract</Label>
            </div>
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* Listing Type */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Listing Type</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "agentListed", label: "By Agent", key: "agentListed" },
              { id: "ownerPosted", label: "By Owner", key: "ownerPosted" },
              { id: "newConstruction", label: "New Construction", key: "newConstruction" },
              { id: "foreclosures", label: "Foreclosures", key: "foreclosures" },
              { id: "auctions", label: "Auctions", key: "auctions" },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <Checkbox 
                  id={item.id} 
                  checked={filters.listingType[item.key as keyof typeof filters.listingType]}
                  onCheckedChange={(checked) => updateNested("listingType", item.key, !!checked)}
                />
                <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* Tours */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Tours</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="openHouse" 
                checked={filters.tours.openHouse}
                onCheckedChange={(checked) => updateNested("tours", "openHouse", !!checked)}
              />
              <Label htmlFor="openHouse" className="text-sm font-medium cursor-pointer">Must have open house</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="threeDTour" 
                checked={filters.tours.threeDTour}
                onCheckedChange={(checked) => updateNested("tours", "threeDTour", !!checked)}
              />
              <Label htmlFor="threeDTour" className="text-sm font-medium cursor-pointer">Must have 3D Tour</Label>
            </div>
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* Square Feet & Lot Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Square Feet</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Min</Label>
                <Select value={filters.squareFeetMin} onValueChange={(val) => updateFilter("squareFeetMin", val)}>
                  <SelectTrigger className="h-10 text-sm border-slate-200 bg-slate-50/50">
                    <SelectValue placeholder="No Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {["No Min", "500", "750", "1,000", "1,250", "1,500", "1,750", "2,000", "2,250", "2,500", "3,000", "3,500", "4,000", "5,000", "7,500"].map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Max</Label>
                <Select value={filters.squareFeetMax} onValueChange={(val) => updateFilter("squareFeetMax", val)}>
                  <SelectTrigger className="h-10 text-sm border-slate-200 bg-slate-50/50">
                    <SelectValue placeholder="No Max" />
                  </SelectTrigger>
                  <SelectContent>
                    {["500", "750", "1,000", "1,250", "1,500", "1,750", "2,000", "2,250", "2,500", "3,000", "3,500", "4,000", "5,000", "7,500", "No Max"].map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {sqftError && <p className="text-[11px] text-red-500 font-medium">{sqftError}</p>}
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Lot Size</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Min</Label>
                <Select value={filters.lotSizeMin} onValueChange={(val) => updateFilter("lotSizeMin", val)}>
                  <SelectTrigger className="h-10 text-sm border-slate-200 bg-slate-50/50">
                    <SelectValue placeholder="No Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {["No Min", "1,000 sqft", "2,000 sqft", "3,000 sqft", "4,000 sqft", "5,000 sqft", "7,500 sqft", "0.25 acres", "0.5 acres", "1 acre", "2 acres", "5 acres", "10 acres"].map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Max</Label>
                <Select value={filters.lotSizeMax} onValueChange={(val) => updateFilter("lotSizeMax", val)}>
                  <SelectTrigger className="h-10 text-sm border-slate-200 bg-slate-50/50">
                    <SelectValue placeholder="No Max" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1,000 sqft", "2,000 sqft", "3,000 sqft", "4,000 sqft", "5,000 sqft", "7,500 sqft", "0.25 acres", "0.5 acres", "1 acre", "2 acres", "5 acres", "10 acres", "No Max"].map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {lotError && <p className="text-[11px] text-red-500 font-medium">{lotError}</p>}
          </section>
        </div>

        <Separator className="bg-slate-100" />

        {/* Year Built */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Year Built</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm">
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Min Year</Label>
              <Input 
                placeholder="No Min"
                value={filters.yearBuiltMin}
                onChange={(e) => updateFilter("yearBuiltMin", e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="h-10 text-sm border-slate-200 bg-slate-50/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Max Year</Label>
              <Input 
                placeholder="No Max"
                value={filters.yearBuiltMax}
                onChange={(e) => updateFilter("yearBuiltMax", e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="h-10 text-sm border-slate-200 bg-slate-50/50"
              />
            </div>
          </div>
          {yearError && <p className="text-[11px] text-red-500 font-medium">{yearError}</p>}
        </section>

        <Separator className="bg-slate-100" />

        {/* Basement & Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Basement</h4>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="basement" 
                checked={filters.basement}
                onCheckedChange={(checked) => updateFilter("basement", !!checked)}
              />
              <Label htmlFor="basement" className="text-sm font-medium cursor-pointer">Must have basement</Label>
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Number of Stories</h4>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="singleStory" 
                checked={filters.singleStoryOnly}
                onCheckedChange={(checked) => updateFilter("singleStoryOnly", !!checked)}
              />
              <Label htmlFor="singleStory" className="text-sm font-medium cursor-pointer">Single-story only</Label>
            </div>
          </section>
        </div>

        <Separator className="bg-slate-100" />

        {/* Amenities */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Amenities</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="ac" 
                checked={filters.amenities.ac}
                onCheckedChange={(checked) => updateNested("amenities", "ac", !!checked)}
              />
              <Label htmlFor="ac" className="text-sm font-medium cursor-pointer">Air Conditioning</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="pool" 
                checked={filters.amenities.pool}
                onCheckedChange={(checked) => updateNested("amenities", "pool", !!checked)}
              />
              <Label htmlFor="pool" className="text-sm font-medium cursor-pointer">Pool</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox 
                id="waterfront" 
                checked={filters.amenities.waterfront}
                onCheckedChange={(checked) => updateNested("amenities", "waterfront", !!checked)}
              />
              <Label htmlFor="waterfront" className="text-sm font-medium cursor-pointer">Waterfront</Label>
            </div>
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* View */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">View</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "cityView", label: "City", key: "city" },
              { id: "mountainView", label: "Mountain", key: "mountain" },
              { id: "parkView", label: "Park", key: "park" },
              { id: "waterView", label: "Water", key: "water" },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <Checkbox 
                  id={item.id} 
                  checked={filters.view[item.key as keyof typeof filters.view]}
                  onCheckedChange={(checked) => updateNested("view", item.key, !!checked)}
                />
                <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer">{item.label}</Label>
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-slate-100" />

        {/* Commute */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground">Commute</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                const next = !commuteOpen;
                setCommuteOpen(next);
                updateFilter("commuteFiltersOpen", next);
              }}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2"
            >
              {commuteOpen ? "Remove commute filter" : "Add commute filter"}
            </Button>
          </div>

          {commuteOpen && (
            <div className="space-y-6 p-5 bg-slate-50/50 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Commute to Address</Label>
                <div className="relative">
                  <LocateFixed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Enter an address, neighborhood, or city" 
                    value={filters.commuteAddress}
                    onChange={(e) => updateFilter("commuteAddress", e.target.value)}
                    className="h-11 pl-10 text-sm border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Travel Mode</Label>
                  <ToggleGroup 
                    type="single" 
                    value={filters.commuteMode} 
                    onValueChange={(val) => val && updateFilter("commuteMode", val)}
                    className="justify-start gap-2"
                  >
                    <ToggleGroupItem value="drive" className="h-11 px-4 gap-2 rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white">
                      <Car className="h-4 w-4" />
                      <span className="text-xs font-medium">Drive</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="transit" className="h-11 px-4 gap-2 rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white">
                      <Train className="h-4 w-4" />
                      <span className="text-xs font-medium">Transit</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="walk" className="h-11 px-4 gap-2 rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white">
                      <Footprints className="h-4 w-4" />
                      <span className="text-xs font-medium">Walk</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="bike" className="h-11 px-4 gap-2 rounded-lg data-[state=on]:bg-blue-600 data-[state=on]:text-white">
                      <Bike className="h-4 w-4" />
                      <span className="text-xs font-medium">Bike</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Max Commute Time</Label>
                  <Select value={filters.commuteTime} onValueChange={(val) => updateFilter("commuteTime", val)}>
                    <SelectTrigger className="h-11 text-sm border-slate-200 bg-white w-full">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <SelectValue placeholder="Any" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {["Any", "15", "30", "45", "60"].map(v => (
                        <SelectItem key={v} value={v}>{v === "Any" ? "Any" : `${v} minutes`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </section>

        <Separator className="bg-slate-100" />

        {/* Days on Market & Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Days on Market</h4>
            <Select value={filters.daysOnMarket} onValueChange={(val) => updateFilter("daysOnMarket", val)}>
              <SelectTrigger className="h-11 text-sm border-slate-200 bg-slate-50/50 w-full sm:w-64">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                {["Any", "1", "7", "14", "30", "90"].map(v => (
                  <SelectItem key={v} value={v}>{v === "Any" ? "Any" : `Less than ${v} days`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Keywords</h4>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="e.g. ocean, fireplace" 
                value={filters.keywords}
                onChange={(e) => updateFilter("keywords", e.target.value)}
                className="h-11 pl-10 text-sm border-slate-200 bg-slate-50/50"
              />
            </div>
          </section>
        </div>

        <Separator className="bg-slate-100" />

        {/* 55+ Communities */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">55+ Communities</h4>
          <RadioGroup 
            value={filters.communities55} 
            onValueChange={(val) => updateFilter("communities55", val)}
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="include" id="c-include" />
              <Label htmlFor="c-include" className="text-sm font-medium cursor-pointer">Include</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dont_show" id="c-exclude" />
              <Label htmlFor="c-exclude" className="text-sm font-medium cursor-pointer">Hide</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="only_show" id="c-only" />
              <Label htmlFor="c-only" className="text-sm font-medium cursor-pointer">Show only</Label>
            </div>
          </RadioGroup>
        </section>

        <Separator className="bg-slate-100" />
        
        {/* Match Score */}
        <section className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Smart Match Score</h4>
          <p className="text-[11px] text-muted-foreground -mt-2">Filter properties by how well they match your preferences.</p>
          <div className="flex flex-wrap gap-2">
            {["Any", "60", "70", "80", "90"].map((score) => (
              <Button
                key={score}
                variant={filters.matchScore === score ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("matchScore", score)}
                className={cn(
                  "h-9 px-4 rounded-full text-xs font-medium transition-all duration-200",
                  filters.matchScore === score 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100" 
                    : "border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 text-slate-600"
                )}
              >
                {score === "Any" ? "Any" : `${score}+ Match`}
              </Button>
            ))}
          </div>
        </section>
      </div>
      <div className="p-4 border-t bg-white flex items-center justify-between sticky bottom-0">
        <Button variant="ghost" onClick={onReset} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold">
          Reset all filters
        </Button>
        <Button 
          disabled={!isValid} 
          onClick={onApply}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-8 h-11"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
