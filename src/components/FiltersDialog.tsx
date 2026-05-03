"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import {
  bathOptions,
  bedOptions,
  hoaOptions,
  lotOptions,
  moreFilterDefaults,
  openHouseOptions,
  propertyTypeOptions,
  yearOptions
} from "./mockData";

type Filters = typeof moreFilterDefaults;

type Props = {
  open: boolean;
  onClose: () => void;
  value: Filters;
  onSave: (next: Filters) => void;
};

export function FiltersDialog({ open, onClose, value, onSave }: Props) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="mx-auto max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle>More Filters</DialogTitle>
              <DialogDescription>Every control updates the visible result set.</DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Property type</div>
            <Select
              value={draft.propertyType}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, propertyType: value }))}
              options={propertyTypeOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="Property type"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Beds</div>
            <Select
              value={draft.beds}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, beds: value }))}
              options={bedOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="Beds"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Baths</div>
            <Select
              value={draft.baths}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, baths: value }))}
              options={bathOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="Baths"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Year built</div>
            <Select
              value={draft.yearBuilt}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, yearBuilt: value }))}
              options={yearOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="Year built"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">HOA</div>
            <Select
              value={draft.hoa}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, hoa: value }))}
              options={hoaOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="HOA"
            />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Open house</div>
            <Select
              value={draft.openHouse}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, openHouse: value }))}
              options={openHouseOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="Open house"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="text-sm font-medium text-slate-700">Lot</div>
            <Select
              value={draft.lot}
              onValueChange={(value) => setDraft((prev) => ({ ...prev, lot: value }))}
              options={lotOptions.map((item) => ({ value: item, label: item }))}
              ariaLabel="Lot"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDraft(moreFilterDefaults)}>
            Reset
          </Button>
          <Button
            onClick={() => {
              onSave(draft);
              onClose();
            }}
          >
            Apply filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
