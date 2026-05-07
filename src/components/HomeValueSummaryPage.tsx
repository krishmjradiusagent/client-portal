"use client";

import React from "react";
import { Plus, Home, MapPin, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { usePropertyContext } from "./PropertyContext";
import { motion } from "framer-motion";

export function HomeValueSummaryPage() {
  const { homeValueListings, setActiveHomeValueId } = usePropertyContext();

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
      <div className="px-4 py-2 space-y-2 pb-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Homes</h1>
            <div className="h-4 w-px bg-slate-200 hidden md:block" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">
              {homeValueListings.length} tracked properties
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = "/home-value?add=true"}
            className="h-7 rounded-lg bg-slate-900 text-white font-bold text-[9px] uppercase tracking-wider gap-1.5 px-3 shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <Plus className="w-3 h-3" />
            Add Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
          {homeValueListings.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => {
                setActiveHomeValueId(listing.id);
                window.location.href = `/home-value?id=${listing.id}`;
              }}
              className="cursor-pointer group"
            >
              <Card className="border border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden hover:shadow-md hover:border-indigo-100 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex h-24">
                    <div className="w-[80px] shrink-0 relative bg-slate-50 border-r border-slate-50">
                      {listing.imageUrl ? (
                        <img 
                          src={listing.imageUrl} 
                          alt={listing.address}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <Home className="w-5 h-5 stroke-[1.5]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-2.5 flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors text-[11px] leading-tight">
                            {listing.address}
                          </h3>
                          <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                        </div>
                        <div className="flex items-center text-slate-400 font-bold text-[8px] uppercase tracking-wider">
                          <MapPin className="w-2.5 h-2.5 mr-1 text-slate-300" />
                          {listing.city}, {listing.state}
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <div className="space-y-0">
                          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Est. Value</p>
                          <p className="text-base font-black text-slate-900 tracking-tight leading-none">
                            ${listing.estimate?.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-[8px] bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 scale-90 origin-bottom-right">
                          <TrendingUp className="w-2 h-2" />
                          <span>+2.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Add Another Home Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: homeValueListings.length * 0.05 }}
            onClick={() => window.location.href = "/home-value?add=true"}
            className="cursor-pointer group h-24"
          >
            <Card className="h-full border-2 border-dashed border-slate-100 bg-slate-50/30 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-indigo-200 hover:bg-white hover:shadow-sm transition-all group-hover:scale-[1.01]">
              <div className="w-6 h-6 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                <Plus className="w-3 h-3" />
              </div>
              <span className="text-[8px] font-black text-slate-400 group-hover:text-slate-600 uppercase tracking-widest">Add Home</span>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
