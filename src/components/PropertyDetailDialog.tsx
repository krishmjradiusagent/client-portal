"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import type { Property } from "./mockData";

type Props = {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onLike: (property: Property) => void;
  onDislike: (property: Property) => void;
};

export function PropertyDetailDialog({ property, open, onClose, onLike, onDislike }: Props) {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="mx-auto max-w-5xl overflow-hidden">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <DialogTitle>{property.address}</DialogTitle>
              <DialogDescription>
                {property.area} · {property.city}, {property.state}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              ×
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[420px] bg-slate-100">
            <img src={property.image} alt={property.address} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <Badge variant="success">Match {property.matchScore}/100</Badge>
              <Badge variant="secondary">{property.type}</Badge>
            </div>
            <div>
              <div className="text-3xl font-semibold text-slate-900">${property.price.toLocaleString()}</div>
              <div className="mt-1 text-sm text-slate-500">
                {property.beds} beds · {property.baths} baths · {property.sqft.toLocaleString()} sf
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">{property.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Year built</div>
                <div className="mt-1 font-semibold text-slate-900">{property.yearBuilt}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Lot</div>
                <div className="mt-1 font-semibold text-slate-900">{property.lot}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 pt-3">
              <Button
                variant="success"
                className="flex-1"
                onClick={() => {
                  onLike(property);
                  onClose();
                }}
              >
                Interested
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  onDislike(property);
                  onClose();
                }}
              >
                Not interested
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
