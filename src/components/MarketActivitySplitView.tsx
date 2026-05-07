"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePropertyContext } from "./PropertyContext";
import { Checkbox } from "./ui/checkbox";
import { recentlyListedData, recentlySoldData, type CompProperty } from "./mockData";
import { PropertyCompareDialog } from "./PropertyCompareDialog";

// ── Types ──
// Type CompProperty is now imported from mockData

// ── Utils ──
function formatPriceToK(priceStr: string) {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return priceStr;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `$${Math.floor(num / 1000)}K`;
  return `$${num}`;
}

// ── Components ──
// Market Activity sections use shared data from mockData.ts
import { PropertyCard } from "./PropertyCard";

export function MarketActivitySplitView() {
  const { selectedCompIds, toggleCompSelection, clearCompSelection } = usePropertyContext();
  const [mapFilter, setMapFilter] = useState<"all" | "listed" | "sold">("all");
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [hoveredComp, setHoveredComp] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredListed = mapFilter === "sold" ? [] : recentlyListedData;
  const filteredSold = mapFilter === "listed" ? [] : recentlySoldData;

  const mapToProperty = (comp: CompProperty): Property => ({
    id: comp.address,
    address: comp.address,
    area: comp.meta,
    city: "Austin",
    state: "TX",
    price: parseInt(comp.price.replace(/[^0-9]/g, ""), 10),
    beds: comp.beds,
    baths: comp.baths,
    sqft: comp.sqft,
    lot: "N/A",
    yearBuilt: 2020,
    listedDate: "2024-05-01",
    matchScore: 96,
    mlsStatus: comp.status === "Active" ? "ACT" : comp.status === "Coming Soon" ? "CS" : "CLOSED",
    status: "search",
    type: "House",
    image: comp.image,
    images: [comp.image],
    markerTop: comp.markerTop,
    markerLeft: comp.markerLeft,
    description: "",
    tags: [],
  });

  return (
    <div className="space-y-6 relative w-full" ref={containerRef}>
      {/* ── Market Activity Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="space-y-0.5">
          <h3 className="text-[19px] font-bold text-slate-900 tracking-tight">
            Market Activity
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Recently listed and sold homes similar to your property.
          </p>
        </div>
      </div>

      {/* ── Split Container ── */}
      <div className={cn(
        "grid gap-4 items-start",
        isDesktop ? "grid-cols-[minmax(420px,0.46fr)_minmax(520px,0.54fr)]" : "grid-cols-1"
      )}>
        {/* LEFT PANEL: Property Activity List */}
        <div className={cn(
          "space-y-8 pb-20",
          isDesktop && "max-h-[calc(100vh-200px)] min-h-[640px] overflow-y-auto pr-2 custom-scrollbar"
        )}>
          {/* Recently Listed Section */}
          {filteredListed.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                Recently Listed
              </h4>
              <div className={cn(
                "grid gap-4",
                isDesktop ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
              )}>
                {filteredListed.map((comp, i) => {
                  const property = mapToProperty(comp);
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredComp(comp.address)}
                      onMouseLeave={() => setHoveredComp(null)}
                      className="relative"
                    >
                      <PropertyCard 
                        property={property} 
                        variant="marketActivity"
                        showActions={false}
                        onOpen={() => {}}
                        onLike={() => {}}
                        onDislike={() => {}}
                        route="home-value"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <Checkbox 
                          checked={selectedCompIds.includes(comp.address)}
                          onCheckedChange={() => toggleCompSelection(comp.address)}
                          className="rounded-full bg-white/80 border-white/20 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 shadow-lg"
                        />
                      </div>
                      {hoveredComp === comp.address && (
                        <motion.div 
                          layoutId="hover-border"
                          className="absolute -inset-0.5 rounded-[22px] border-2 border-indigo-500/50 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recently Sold Section */}
          {filteredSold.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                Recently Sold
              </h4>
              <div className={cn(
                "grid gap-4",
                isDesktop ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
              )}>
                {filteredSold.map((comp, i) => {
                  const property = mapToProperty(comp);
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredComp(comp.address)}
                      onMouseLeave={() => setHoveredComp(null)}
                      className="relative"
                    >
                      <PropertyCard 
                        property={property} 
                        variant="marketActivity"
                        showActions={false}
                        onOpen={() => {}}
                        onLike={() => {}}
                        onDislike={() => {}}
                        route="home-value"
                      />
                      <div className="absolute top-4 right-4 z-10">
                        <Checkbox 
                          checked={selectedCompIds.includes(comp.address)}
                          onCheckedChange={() => toggleCompSelection(comp.address)}
                          className="rounded-full bg-white/80 border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 shadow-lg"
                        />
                      </div>
                      {hoveredComp === comp.address && (
                        <motion.div 
                          layoutId="hover-border"
                          className="absolute -inset-0.5 rounded-[22px] border-2 border-purple-500/50 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Sticky Map */}
        <div className={cn(
          "relative rounded-[24px] border border-slate-200 overflow-hidden bg-slate-50 shadow-inner group",
          isDesktop ? "sticky top-4 h-[calc(100vh-200px)] min-h-[640px]" : "h-[500px]"
        )}>
          {/* Simulated Map Background */}
          <div
            className="absolute inset-0 bg-cover bg-center grayscale-[0.1] transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]"
            style={{ backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-97.7431,30.2672,13,0/1200x800?access_token=pk.eyJ1IjoiYm9iaWUiLCJhIjoiY2p4bHh4eHh4eHh4eHh4eHh4eHh4eHh4In0.x")' }}
          />
          <div className="absolute inset-0 bg-slate-900/5 mix-blend-multiply pointer-events-none" />
          
          {/* ── Map Overlays ── */}
          
          {/* Top Left: Context info */}
          <div className="absolute top-5 left-5 z-10 space-y-1">
            <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/50">
              <h5 className="text-[11px] font-bold text-slate-900">Market map</h5>
              <p className="text-[10px] text-slate-500 font-medium">Listed + sold comps near 1205 E 7th St</p>
            </div>
          </div>

          {/* Top Right: Filter pills */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-1.5">
            {[
              { key: "all" as const, label: "All" },
              { key: "listed" as const, label: "Listed" },
              { key: "sold" as const, label: "Sold" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setMapFilter(f.key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all duration-200 backdrop-blur-md shadow-sm",
                  mapFilter === f.key
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white/90 text-slate-700 border-slate-200 hover:bg-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Bottom Left: Legend */}
          <div className="absolute bottom-5 left-5 z-10">
            <div className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-slate-200/50 space-y-2 min-w-[120px]">
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-indigo-600 border border-white shadow-sm" />
                <span className="text-[10px] font-bold text-slate-700">Current home</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-slate-900 border border-white shadow-sm" />
                <span className="text-[10px] font-bold text-slate-700">Listed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-purple-500 border border-white shadow-sm" />
                <span className="text-[10px] font-bold text-slate-700">Sold</span>
              </div>
            </div>
          </div>

          {/* ── Pins ── */}
          
          {/* Current Home Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600 blur-md opacity-40 scale-150 animate-pulse" />
              <div className="relative w-9 h-9 rounded-full bg-indigo-600 border-[2.5px] border-white shadow-2xl flex items-center justify-center">
                <Home className="size-4 text-white" />
              </div>
            </div>
          </div>

          {/* Listed Pins */}
          {filteredListed.map((p, i) => (
            <div
              key={`listed-${i}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer z-10"
              style={{ top: p.markerTop, left: p.markerLeft }}
              onMouseEnter={() => setHoveredComp(p.address)}
              onMouseLeave={() => setHoveredComp(null)}
            >
              <motion.div 
                animate={{ scale: hoveredComp === p.address ? 1.15 : 1 }}
                className={cn(
                  "px-2 py-1 rounded-lg border shadow-lg text-[10px] font-black transition-all duration-200",
                  hoveredComp === p.address || selectedCompIds.includes(p.address)
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-200"
                )}
              >
                {formatPriceToK(p.price)}
              </motion.div>
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mx-auto mt-0.5 border border-white shadow-sm transition-colors",
                hoveredComp === p.address || selectedCompIds.includes(p.address) ? "bg-indigo-500" : "bg-slate-900"
              )} />
            </div>
          ))}

          {/* Sold Pins */}
          {filteredSold.map((p, i) => (
            <div
              key={`sold-${i}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer z-10"
              style={{ top: p.markerTop, left: p.markerLeft }}
              onMouseEnter={() => setHoveredComp(p.address)}
              onMouseLeave={() => setHoveredComp(null)}
            >
              <motion.div 
                animate={{ scale: hoveredComp === p.address ? 1.15 : 1 }}
                className={cn(
                  "px-2 py-1 rounded-lg border shadow-lg text-[10px] font-black transition-all duration-200",
                  hoveredComp === p.address || selectedCompIds.includes(p.address)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-purple-50 text-purple-700 border-purple-200"
                )}
              >
                {formatPriceToK(p.price)}
              </motion.div>
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mx-auto mt-0.5 border border-white shadow-sm transition-colors",
                hoveredComp === p.address || selectedCompIds.includes(p.address) ? "bg-purple-400" : "bg-purple-600"
              )} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison Floating Bar ── */}
      <AnimatePresence>
        {selectedCompIds.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-8 min-w-[420px]">
              <div className="flex -space-x-3">
                {selectedCompIds.map((addr, i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-lg">
                    <img 
                      src={[...recentlyListedData, ...recentlySoldData].find(p => p.address === addr)?.image} 
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-bold text-white tracking-tight">
                    {selectedCompIds.length} Properties Selected
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Persisted for your next session.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCompSelection}
                  className="text-white/60 hover:text-white text-xs font-bold"
                >
                  Clear
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setShowCompareDialog(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-6 font-bold text-xs h-10 shadow-lg shadow-indigo-600/20"
                >
                  Compare
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PropertyCompareDialog 
        open={showCompareDialog}
        onClose={() => setShowCompareDialog(false)}
        properties={[...recentlyListedData, ...recentlySoldData].filter(p => selectedCompIds.includes(p.address))}
        onToggleSelection={toggleCompSelection}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
