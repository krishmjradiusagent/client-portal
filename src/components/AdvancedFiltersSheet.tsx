"use client";

import { useEffect, useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle 
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import {
  hoaOptions,
  lotOptions,
  moreFilterDefaults,
  yearOptions
} from "./mockData";

type Filters = typeof moreFilterDefaults;

type Props = {
  open: boolean;
  onClose: () => void;
  value: Filters;
  onSave: (next: Filters) => void;
  isEditMode?: boolean;
};

export function AdvancedFiltersSheet({ open, onClose, value, onSave, isEditMode }: Props) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const handleApply = () => {
    onSave(draft);
    onClose();
  };

  const handlePreferenceChange = (pref: string, checked: boolean) => {
    // Note: our mock schema currently doesn't have an array for these, 
    // so we'll just simulate by toggling a generic 'additionalFeatures' or similar if it existed.
    // For now, we'll just keep it visual or add it to a dynamic key.
    setDraft(prev => ({ ...prev, [pref.toLowerCase().replace(/\s+/g, '')]: checked }));
  };

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent className="sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your search with specific property details.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="grid gap-8 py-6">
            {/* Status & Availability */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Listing Status</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Open Houses Only</Label>
                  <p className="text-[11px] text-slate-500">Only show homes with open houses</p>
                </div>
                <Switch 
                  checked={draft.openHouse !== "Any"} 
                  onCheckedChange={(checked) => setDraft(prev => ({ ...prev, openHouse: checked ? "This weekend" : "Any" }))} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Construction</Label>
                  <p className="text-[11px] text-slate-500">Only show homes with new construction</p>
                </div>
                <Switch 
                  checked={draft.yearBuilt === "New construction"} 
                  onCheckedChange={(checked) => setDraft(prev => ({ ...prev, yearBuilt: checked ? "New construction" : "Any" }))} 
                />
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* Property Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Property Details</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Year Built</Label>
                  <Select
                    value={draft.yearBuilt}
                    onValueChange={(val) => setDraft(prev => ({ ...prev, yearBuilt: val }))}
                  >
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="Any Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>HOA Fees</Label>
                  <Select
                    value={draft.hoa}
                    onValueChange={(val) => setDraft(prev => ({ ...prev, hoa: val }))}
                  >
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="Any HOA" />
                    </SelectTrigger>
                    <SelectContent>
                      {hoaOptions.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Lot Size</Label>
                  <Select
                    value={draft.lot}
                    onValueChange={(val) => setDraft(prev => ({ ...prev, lot: val }))}
                  >
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="Any Lot Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {lotOptions.map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* Additional Preferences */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Additional Preferences</h3>
              <div className="space-y-3">
                {["Parking included", "Garage", "Basement", "55+ Community", "Pool"].map((pref) => {
                  const key = pref.toLowerCase().replace(/\s+/g, '');
                  return (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox 
                        id={pref} 
                        checked={!!(draft as any)[key]} 
                        onCheckedChange={(checked) => handlePreferenceChange(pref, !!checked)}
                      />
                      <Label htmlFor={pref} className="text-sm font-normal">{pref}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50 gap-3">
          <Button variant="outline" onClick={() => setDraft(moreFilterDefaults)} className="flex-1 border-slate-200">
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1">
            {isEditMode ? "Save changes" : "Show results"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
