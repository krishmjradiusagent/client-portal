"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bed,
  Bath,
  Square,
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import type { CompProperty } from "./mockData";
import { usePropertyContext } from "./PropertyContext";
import { Loader2 } from "lucide-react";

interface PropertyCompareDialogProps {
  open: boolean;
  onClose: () => void;
  properties: CompProperty[];
  onToggleSelection: (id: string) => void;
}

export function PropertyCompareDialog({
  open,
  onClose,
  properties,
  onToggleSelection,
}: PropertyCompareDialogProps) {
  const { sendMessage } = usePropertyContext();
  const [isBooking, setIsBooking] = React.useState(false);

  // If dialog is open but no properties are selected, we should probably close it
  React.useEffect(() => {
    if (open && properties.length === 0) {
      onClose();
    }
  }, [open, properties.length, onClose]);

  const handleBookTour = async () => {
    setIsBooking(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const propertyList = properties.map(p => p.address).join(", ");
    sendMessage(`Hi Scott, I'm interested in booking a tour for these properties: ${propertyList}. What's your availability this week?`);
    
    setIsBooking(false);
    onClose();
  };

  if (properties.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-5xl bg-slate-50 border-none p-0 overflow-hidden rounded-[32px] shadow-2xl">
        <DialogHeader className="p-8 bg-white border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
                Compare Properties
              </DialogTitle>
              <p className="text-sm text-slate-500 font-medium">
                Side-by-side analysis of your selected market comparables.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-slate-100"
            >
              <X className="size-5 text-slate-500" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-8 overflow-x-auto custom-scrollbar">
          <div className="flex gap-6 min-w-max pb-4">
            <AnimatePresence>
              {properties.map((p, idx) => (
                <motion.div
                  key={p.address}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  layout
                  transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="w-[320px] bg-white rounded-[24px] border border-slate-200/60 shadow-sm overflow-hidden flex flex-col group/card relative"
                >
                  {/* Remove Button */}
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => onToggleSelection(p.address)}
                    className="absolute top-3 right-3 z-30 size-8 rounded-full bg-white/80 backdrop-blur-md border border-white/20 shadow-lg opacity-0 group-hover/card:opacity-100 transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="size-4" />
                  </Button>

                  {/* Property Image & Status */}
                  <div className="relative h-48">
                    <img
                      src={p.image}
                      alt={p.address}
                      className="size-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={cn(
                        "border-none font-bold px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-lg shadow-md",
                        p.status === "Active" ? "bg-emerald-500 text-white" :
                        p.status === "Coming Soon" ? "bg-amber-500 text-white" :
                        "bg-purple-600 text-white"
                      )}>
                        {p.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-white/20">
                        <p className="text-lg font-black text-slate-900 leading-none">
                          {p.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Property Info */}
                  <div className="p-5 flex-1 flex flex-col gap-6">
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 leading-snug">
                        {p.address}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                        <MapPin className="size-3" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          {p.meta}
                        </span>
                      </div>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Bed className="size-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-tight">Beds</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">{p.beds}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Bath className="size-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-tight">Baths</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">{p.baths}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Square className="size-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-tight">Sqft</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">{p.sqft.toLocaleString()}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <TrendingUp className="size-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-tight">$/Sqft</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">
                          ${Math.round(parseInt(p.price.replace(/[^0-9]/g, "")) / p.sqft)}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full mt-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold text-sm shadow-lg shadow-slate-200 group"
                    >
                      View Full Listing
                      <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
              <Calendar className="size-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-tight uppercase">Ready to move?</p>
              <p className="text-[10px] text-slate-400 font-medium">Schedule a tour with Scott Kato for any of these properties.</p>
            </div>
          </div>
          <Button 
            disabled={isBooking}
            onClick={handleBookTour}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-8 font-black text-sm h-12 shadow-xl shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-70"
          >
            {isBooking ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              "Book a Tour"
            )}
          </Button>
        </div>
      </DialogContent>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2);
        }
      `}</style>
    </Dialog>
  );
}
