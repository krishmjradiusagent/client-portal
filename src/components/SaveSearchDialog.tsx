"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { alertFrequencies } from "./mockData";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, frequency: string) => void;
  selectedLocation: string;
  visibleCount: number;
};

export function SaveSearchDialog({ open, onClose, onSave, selectedLocation, visibleCount }: Props) {
  const [name, setName] = useState("My Home Search");
  const [frequency, setFrequency] = useState("daily");

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="mx-auto max-w-xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle>Save Search</DialogTitle>
              <DialogDescription>Store this search under My Searches. Unlimited saves.</DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Search name</div>
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Alert frequency</div>
            <Select value={frequency} onValueChange={setFrequency} options={alertFrequencies} ariaLabel="Alert frequency" />
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <div className="font-medium text-slate-900">{selectedLocation}</div>
            <div className="mt-1">{visibleCount} visible homes will be included.</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(name, frequency);
              onClose();
            }}
          >
            Save search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
