"use client";

import { useState } from "react";
import { Heart, X, MapPin, Home, Bed, Bath, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { Property } from "./mockData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import "@/components/shadcn-space/button/button-02.css";

type Props = {
  property: Property;
  onOpen: () => void;
  onLike: () => void;
  onDislike: () => void;
  route: string;
  isHomeValue?: boolean;
};

export function PropertyCard({ property, onOpen, onLike, onDislike, route, isHomeValue }: Props) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const liked = property.status === "interested";
  const disliked = property.status === "notInterested";
  const isNew = property.isNew;
  const isPriceCut = property.hasPriceCut;
  
  // Signal Logic (Max 1)
  const signalLabel = isPriceCut ? "PRICE CUT" : isNew ? "NEW" : null;
  const showSignal = !!signalLabel && !isHomeValue;

  // MLS Status Mapping (Exactly 1)
  const mlsStatusMap: Record<string, string> = {
    "ACT": "ACTIVE",
    "ACTIVE": "ACTIVE",
    "CS": "COMING SOON",
    "COMING SOON": "COMING SOON",
    "AUC": "UNDER CONTRACT",
    "AC": "UNDER CONTRACT",
    "ACTIVE UNDER CONTRACT": "UNDER CONTRACT",
    "PND": "PENDING",
    "PENDING": "PENDING",
    "CLOSED": "SOLD"
  };
  const mlsDisplayLabel = mlsStatusMap[property.mlsStatus] || "ACTIVE";
  
  // Color logic
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

  const hasImages = property.images && property.images.length > 0;

  // Format price to millions if over 1M
  const formattedPrice = property.price >= 1000000 
    ? `$${(property.price / 1000000).toFixed(2)}M` 
    : `$${(property.price / 1000).toFixed(0)}K`;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasImages) return;
    setCurrentImgIdx((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasImages) return;
    setCurrentImgIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <Card className="overflow-hidden border-slate-200/60 rounded-[24px] transition hover:-translate-y-0.5 hover:shadow-lg bg-white group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-50">
        <AnimatePresence mode="wait">
          {hasImages ? (
            <motion.img
              key={currentImgIdx}
              src={property.images[currentImgIdx]}
              alt={property.address}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full object-cover cursor-pointer"
              onClick={onOpen}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-slate-50 to-slate-100/50 cursor-pointer" onClick={onOpen}>
              <div className="text-center space-y-3">
                <div className="relative mx-auto">
                  <Home className="h-12 w-12 text-slate-200" />
                  <div className="absolute -inset-1 bg-white/20 blur-xl rounded-full" />
                </div>
                <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
                  Image Pending
                </span>
              </div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Carousel Controls */}
        {hasImages && property.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 pointer-events-auto"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 pointer-events-auto"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Carousel Dots */}
        {hasImages && property.images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
            {property.images.map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentImgIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                )} 
              />
            ))}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between pointer-events-none">
          <div className="flex gap-1.5 items-center pointer-events-auto max-w-[calc(100%-80px)] overflow-hidden">
            {/* Signal Badge (Optional) */}
            {showSignal && (
              <Badge variant="secondary" className={cn(
                "relative overflow-hidden px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border flex-shrink-0",
                getSignalStyles()
              )}>
                {signalLabel === "NEW" && (
                  <div className="absolute inset-0 shiny pointer-events-none opacity-90 bg-[linear-gradient(110deg,transparent,35%,rgba(255,215,128,0.72),50%,rgba(255,245,190,0.58),65%,transparent)] bg-[length:200%_100%]" />
                )}
                {signalLabel === "PRICE CUT" && (
                  <div className="absolute inset-0 shiny pointer-events-none opacity-90 bg-[linear-gradient(110deg,transparent,35%,rgba(52,211,153,0.34),50%,rgba(187,247,208,0.52),65%,transparent)] bg-[length:200%_100%]" />
                )}
                <span className="relative z-10 whitespace-nowrap">{signalLabel}</span>
              </Badge>
            )}

            {/* MLS Status Badge (Required) */}
            {!isHomeValue && (
              <Badge variant="secondary" className={cn(
                "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border flex-shrink-0",
                getMlsStyles(property.mlsStatus)
              )}>
                <span className="whitespace-nowrap">{mlsDisplayLabel}</span>
              </Badge>
            )}
            
            {isHomeValue && (
              <Badge variant="secondary" className="bg-slate-900 text-white border-none px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                <span className="whitespace-nowrap">HOME VALUE</span>
              </Badge>
            )}
          </div>
          
          {!isHomeValue && (
            <Badge variant="secondary" className="bg-[#E6F8F1] text-[#00A36C] border-none px-2 py-0.5 text-[10px] font-bold flex items-center gap-1 pointer-events-auto ml-auto">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
              {property.matchScore}%
            </Badge>
          )}
        </div>

        {/* Floating Price Badge */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <Badge variant="secondary" className="bg-white/95 text-[#4F46E5] border-none px-3 py-1.5 text-sm font-bold shadow-sm pointer-events-auto flex items-center gap-1.5">
            {isHomeValue && <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Est. Value</span>}
            {formattedPrice}
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Address Row */}
        <div className="min-w-0">
          <h3 className="text-[17px] font-extrabold text-slate-900 leading-tight">
            {property.address}
          </h3>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-5 text-[13px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-slate-300" />
            <span><span className="text-slate-900 font-bold">{property.beds}</span> bd</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-slate-300" />
            <span><span className="text-slate-900 font-bold">{property.baths}</span> ba</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-slate-300" />
            <span><span className="text-slate-900 font-bold">{property.sqft.toLocaleString()}</span> Sq. ft</span>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex items-center gap-2">
          <Button
            className={cn(
              "flex-1 h-12 rounded-2xl font-bold text-sm transition-all shadow-sm",
              liked 
                ? "bg-red-600 hover:bg-red-700 text-white shadow-red-100 border-transparent" 
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
          >
            <Heart className={cn("h-4 w-4 mr-2", liked ? "fill-current text-white" : "text-slate-400")} />
            Interested
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-12 w-12 rounded-2xl border-slate-200 bg-[#F8FAFC] text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all",
              disliked && "border-red-200 bg-red-50 text-red-600"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onDislike();
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
