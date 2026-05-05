"use client";

import { useState, useEffect } from "react";
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
import {
  bathOptions,
  bedOptions,
  hoaOptions,
  lotOptions,
  moreFilterDefaults,
  propertyTypeOptions,
  yearOptions,
  type SavedSearch
} from "./mockData";

type Props = {
  open: boolean;
  onClose: () => void;
  search: SavedSearch | null;
  onSave: (updated: SavedSearch) => void;
};

export function EditSearchSheet({ open, onClose, search, onSave }: Props) {
  const [draft, setDraft] = useState<SavedSearch | null>(null);
  const [filters, setFilters] = useState(moreFilterDefaults);

  useEffect(() => {
    if (open && search) {
      setDraft(search);
      try {
        const parsed = JSON.parse(search.criteria);
        setFilters(parsed);
      } catch (e) {
        setFilters(moreFilterDefaults);
      }
    }
  }, [open, search]);

  if (!draft) return null;

  const handleSave = () => {
    if (draft) {
      onSave({
        ...draft,
        criteria: JSON.stringify(filters),
        updatedAt: "Just now"
      });
      onClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={(val) => !val && onClose()}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Search Criteria</SheetTitle>
          <SheetDescription>
            Modify the filters for "{draft.name}"
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-6">
          <div className="space-y-2">
            <Label>Property type</Label>
            <Select
              value={filters.propertyType}
              onValueChange={(val) => setFilters(p => ({ ...p, propertyType: val }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {propertyTypeOptions.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Beds</Label>
              <Select
                value={filters.beds}
                onValueChange={(val) => setFilters(p => ({ ...p, beds: val }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bedOptions.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Baths</Label>
              <Select
                value={filters.baths}
                onValueChange={(val) => setFilters(p => ({ ...p, baths: val }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bathOptions.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Year built</Label>
              <Select
                value={filters.yearBuilt}
                onValueChange={(val) => setFilters(p => ({ ...p, yearBuilt: val }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>HOA</Label>
              <Select
                value={filters.hoa}
                onValueChange={(val) => setFilters(p => ({ ...p, hoa: val }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hoaOptions.map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Lot Size</Label>
            <Select
              value={filters.lot}
              onValueChange={(val) => setFilters(p => ({ ...p, lot: val }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lotOptions.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
