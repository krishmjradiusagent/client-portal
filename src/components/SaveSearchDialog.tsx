"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { alertFrequencies } from "./mockData";

import { Switch } from "./ui/switch";
import { type SavedSearch } from "./mockData";

type Props = {
  children: React.ReactNode;
  onSave: (name: string, frequency: string, emailAlerts: boolean) => void;
  selectedLocation: string;
  minPrice: string;
  maxPrice: string;
  activeFilters: {
    beds: string;
    baths: string;
    propertyType: string;
    matchScore: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SaveSearchDialog({ children, onSave, selectedLocation, minPrice, maxPrice, activeFilters, open, onOpenChange }: Props) {
  const [name, setName] = useState(`Search in ${selectedLocation || "current area"}`);
  const [frequency, setFrequency] = useState("daily");
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">Save search</DialogTitle>
          <DialogDescription className="text-slate-500">
            Get notified as soon as new properties match your criteria.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">Search name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Westlake Family Homes"
              className="border-slate-200 focus-visible:ring-slate-400 h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Min Price</Label>
              <Input 
                value={minPrice} 
                onChange={() => {}} 
                className="h-10 border-slate-200 bg-slate-50/50" 
                readOnly 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Max Price</Label>
              <Input 
                value={maxPrice === "2000000" ? "No max" : maxPrice} 
                onChange={() => {}} 
                className="h-10 border-slate-200 bg-slate-50/50" 
                readOnly 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Applied criteria</Label>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-medium border border-slate-200">
                {activeFilters.beds !== "Any" ? `${activeFilters.beds} Beds` : "Any Beds"}
              </span>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-medium border border-slate-200">
                {activeFilters.baths !== "Any" ? `${activeFilters.baths} Baths` : "Any Baths"}
              </span>
              {activeFilters.propertyType !== "Any" && (
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-medium border border-slate-200">
                  {activeFilters.propertyType}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-slate-900">Email alerts</Label>
              <div className="text-[11px] text-slate-500">Receive updates for new listings</div>
            </div>
            <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} className="data-[state=checked]:bg-slate-900" />
          </div>

          {emailAlerts && (
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <Label className="text-sm font-medium text-slate-700">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="border-slate-200 h-10">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {alertFrequencies.map((f) => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1 border-slate-200 h-11">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="flex-1 h-11 bg-slate-900 text-white hover:bg-slate-800"
            onClick={() => {
              onSave(name, frequency, emailAlerts);
            }}
          >
            Save search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
