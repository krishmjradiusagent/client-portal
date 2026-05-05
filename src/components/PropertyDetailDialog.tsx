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
          <div className="relative min-h-[420px] bg-slate-100 flex items-center justify-center">
            {property.image ? (
              <img 
                src={property.image} 
                alt={property.address} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = "absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-300";
                  fallback.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image mb-3 opacity-20"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <span class="text-xs font-bold uppercase tracking-[0.2em] opacity-30">Photo Not Available</span>
                  `;
                  (e.target as HTMLImageElement).parentElement?.appendChild(fallback);
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-slate-50 to-slate-100/50 h-full w-full">
                <div className="relative mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-image opacity-20"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                  <div className="absolute -inset-1 bg-white/20 blur-xl rounded-full" />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Photo Pending</span>
              </div>
            )}
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">Match {property.matchScore}/100</Badge>
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
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
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
