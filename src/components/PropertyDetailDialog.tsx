"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import type { Property } from "./mockData";
import { cn } from "@/lib/utils";

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
              {(() => {
                const isNew = property.isNew;
                const isPriceCut = property.hasPriceCut;
                const signalLabel = isPriceCut ? "PRICE CUT" : isNew ? "NEW" : null;
                
                const mlsStatusMap: Record<string, string> = {
                  "ACT": "ACTIVE", "ACTIVE": "ACTIVE",
                  "CS": "COMING SOON", "COMING SOON": "COMING SOON",
                  "AUC": "UNDER CONTRACT", "AC": "UNDER CONTRACT", "ACTIVE UNDER CONTRACT": "UNDER CONTRACT",
                  "PND": "PENDING", "PENDING": "PENDING",
                  "CLOSED": "SOLD"
                };
                const mlsDisplayLabel = mlsStatusMap[property.mlsStatus] || "ACTIVE";

                const getSignalStyles = () => {
                  if (signalLabel === "NEW") return "bg-[#FFF7E0] text-[#6F4E00] border-[#F2D68A]";
                  if (signalLabel === "PRICE CUT") return "bg-[#EAFBF2] text-[#067647] border-[#A7E8C4]";
                  return "";
                };

                const getMlsStyles = (status: string) => {
                  const s = mlsStatusMap[status] || "ACTIVE";
                  if (s === "ACTIVE") return "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]";
                  if (s === "COMING SOON") return "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]";
                  if (s === "UNDER CONTRACT") return "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]";
                  if (s === "PENDING") return "bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]";
                  return "bg-slate-100 text-slate-700 border-slate-200";
                };

                return (
                  <>
                    {signalLabel && (
                      <Badge className={cn(
                        "relative overflow-hidden px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                        getSignalStyles()
                      )}>
                        {signalLabel === "NEW" && (
                          <div className="absolute inset-0 shiny pointer-events-none opacity-90 bg-[linear-gradient(110deg,transparent,35%,rgba(255,215,128,0.72),50%,rgba(255,245,190,0.58),65%,transparent)] bg-[length:200%_100%]" />
                        )}
                        {signalLabel === "PRICE CUT" && (
                          <div className="absolute inset-0 shiny pointer-events-none opacity-90 bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.34),50%,rgba(187,247,208,0.52),65%,transparent)] bg-[length:200%_100%]" />
                        )}
                        <span className="relative z-10">{signalLabel}</span>
                      </Badge>
                    )}
                    <Badge className={cn(
                      "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border",
                      getMlsStyles(property.mlsStatus)
                    )}>
                      {mlsDisplayLabel}
                    </Badge>
                  </>
                );
              })()}
              <Badge variant="secondary" className="bg-[#E6F8F1] text-[#00A36C] border-none px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 ml-auto">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
                {property.matchScore}% Match
              </Badge>
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
