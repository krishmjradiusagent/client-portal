"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MessageSquare,
  Info,
  Send,
  Bed,
  Bath,
  Square,
  TrendingUp,
  Clock,
  CheckSquare,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  Map as MapIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { usePropertyContext } from "./PropertyContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import { HomeValueCard } from "./home-value-card";

function formatPriceToK(priceStr: string) {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return priceStr;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `$${Math.floor(num / 1000)}K`;
  return `$${num}`;
}

// ── Compact Comp Card (seller context, no buyer actions) ──
function HomeValueCompCard({
  address,
  price,
  beds,
  baths,
  sqft,
  status,
  meta,
  image,
}: {
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  meta: string;
  image: string;
}) {
  const shortPrice = price.toLowerCase().includes("sold") 
    ? `Sold ${formatPriceToK(price)}`
    : formatPriceToK(price);

  return (
    <Card className="border border-slate-200/80 rounded-[24px] overflow-hidden group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 ease-out bg-white p-1.5">
      <div className="relative h-44 bg-slate-100 rounded-[18px] overflow-hidden cursor-pointer">
        <img
          src={image}
          alt={address}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {status === "Active" && (
            <Badge className="bg-[#FFF4D4] hover:bg-[#FFF4D4] text-[#936400] border-none font-bold px-2.5 py-1 text-[10px] uppercase tracking-wider shadow-sm rounded-md">
              New
            </Badge>
          )}
          <Badge className={cn(
            "border-none font-bold px-2.5 py-1 text-[10px] uppercase tracking-wider shadow-sm rounded-md",
            status === "Active" ? "bg-[#E6F8F0] hover:bg-[#E6F8F0] text-[#047857]" :
            status === "Coming Soon" ? "bg-amber-100 hover:bg-amber-100 text-amber-800" :
            "bg-[#F3E8FF] hover:bg-[#F3E8FF] text-[#7E22CE]"
          )}>
            {status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-[#E6F8F0] hover:bg-[#E6F8F0] text-[#047857] border-none font-bold px-2 py-1 text-[11px] shadow-sm flex items-center gap-1 rounded-md">
            <Sparkles className="w-3 h-3" />
            96%
          </Badge>
        </div>

        {/* Carousel Controls */}
        <div className="absolute inset-y-0 left-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-0.5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
            <ChevronRight className="w-5 h-5 ml-0.5" />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          <div className="h-1.5 w-4 bg-white rounded-full shadow-sm"></div>
          <div className="h-1.5 w-1.5 bg-white/60 rounded-full shadow-sm"></div>
          <div className="h-1.5 w-1.5 bg-white/60 rounded-full shadow-sm"></div>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-lg shadow-sm border border-white/20">
          <span className="text-[15px] font-extrabold text-[#5B21B6] tracking-tight">{shortPrice}</span>
        </div>
      </div>

      <CardContent className="p-3 pt-4 pb-2 space-y-3">
        <h3 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">{address}</h3>
        
        <div className="flex items-center gap-3 text-[13px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Bed className="size-3.5 text-slate-400/80" strokeWidth={2.5} />
            <span><span className="font-bold text-slate-800">{beds}</span> bd</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-3.5 text-slate-400/80" strokeWidth={2.5} />
            <span><span className="font-bold text-slate-800">{baths}</span> ba</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="size-3.5 text-slate-400/80" strokeWidth={2.5} />
            <span><span className="font-bold text-slate-800">{sqft.toLocaleString()}</span> sqft</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Mock comp data ──
const recentlyListedData = [
  {
    address: "2101 S Congress Ave",
    price: "$895,000",
    beds: 3,
    baths: 2,
    sqft: 1824,
    status: "Active",
    meta: "0.4 mi away",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    markerTop: "42%",
    markerLeft: "45%",
  },
  {
    address: "4208 Hyde Park Rd",
    price: "$1,140,000",
    beds: 4,
    baths: 3,
    sqft: 2460,
    status: "Active",
    meta: "1.1 mi away",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
    markerTop: "35%",
    markerLeft: "58%",
  },
  {
    address: "4683 Glenalbyn Drive",
    price: "$1,795,000",
    beds: 3,
    baths: 3,
    sqft: 2189,
    status: "Coming Soon",
    meta: "2.4 mi away",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
    markerTop: "48%",
    markerLeft: "32%",
  },
];

const recentlySoldData = [
  {
    address: "3507 Cazador Street",
    price: "Sold $875,000",
    beds: 2,
    baths: 1,
    sqft: 1058,
    status: "Sold",
    meta: "Sold 2 weeks ago",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=600&auto=format&fit=crop",
    markerTop: "55%",
    markerLeft: "52%",
  },
  {
    address: "1205 E 7th St",
    price: "Sold $645,000",
    beds: 2,
    baths: 2,
    sqft: 1150,
    status: "Sold",
    meta: "Sold 2 weeks ago",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop",
    markerTop: "62%",
    markerLeft: "48%",
  },
  {
    address: "702 Wlake Dr",
    price: "Sold $2,450,000",
    beds: 5,
    baths: 4,
    sqft: 4200,
    status: "Sold",
    meta: "Sold 1 month ago",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
    markerTop: "28%",
    markerLeft: "65%",
  },
];

export function HomeValueDetailPage() {
  const { homeValueListings, activeHomeValueId } = usePropertyContext();
  const listing =
    homeValueListings.find((l) => l.id === activeHomeValueId) ||
    homeValueListings[0];

  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    upgrades: false,
    comps: false,
    cma: false,
  });
  const [marketView, setMarketView] = useState<"grid" | "map">("grid");

  if (!listing) return null;

  const fullAddress = [listing.address, listing.city, listing.state, listing.zip]
    .filter(Boolean)
    .join(", ");

  const hasEstimate = listing.estimate != null && listing.estimate > 0;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSent(true);
    setMessage("");
    setTimeout(() => setMessageSent(false), 3000);
  };

  const quickMessages = [
    "Hi Ila",
    "Is now a good time to sell?",
    "Can you review my home value?",
  ];
  const timelineOptions = [
    "Less than 3 months",
    "3–6 months",
    "6–12 months",
    "1+ year",
    "No plans to sell",
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="w-full px-6 py-5 space-y-5">
        {/* ── Page Title removed per user request ── */}

        {/* ── 1. Compact Home Summary Strip (Colorized) ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
        >
          <Card className="rounded-lg shadow-sm border border-stone-200/80 bg-gradient-to-r from-stone-50 via-amber-50/20 to-stone-50">
            <CardContent className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center justify-center size-9 rounded-lg bg-stone-100 border border-stone-200/60">
                  <Home className="size-4 text-stone-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-stone-900">
                    {listing.address}
                  </p>
                  <p className="text-xs text-stone-500">
                    {listing.city}, {listing.state} {listing.zip}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {hasEstimate && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-800/[0.06] px-3 py-1 text-sm font-bold text-stone-900 border border-stone-200/50">
                    ${listing.estimate!.toLocaleString()}
                    <span className="text-[10px] font-medium text-stone-500 uppercase tracking-wide">est.</span>
                  </span>
                )}
                <span className="hidden sm:block w-px h-4 bg-stone-200/80" />
                {listing.beds != null && (
                  <span className="flex items-center gap-1 text-xs text-stone-600">
                    <Bed className="size-3.5 text-stone-400/80" /> {listing.beds} bd
                  </span>
                )}
                {listing.baths != null && (
                  <span className="flex items-center gap-1 text-xs text-stone-600">
                    <Bath className="size-3.5 text-stone-400/80" /> {listing.baths} ba
                  </span>
                )}
                {listing.sqft != null && (
                  <span className="flex items-center gap-1 text-xs text-stone-600">
                    <Square className="size-3.5 text-stone-400/80" />{" "}
                    {listing.sqft.toLocaleString()} sqft
                  </span>
                )}
                {listing.lastUpdated && (
                  <span className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Clock className="size-3" /> {listing.lastUpdated}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.12 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* ── 2. Estimated Home Value ── */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>
            {hasEstimate ? (
              <HomeValueCard 
                estimate={listing.estimate!} 
                lastUpdated={listing.lastUpdated}
              />
            ) : (
              <Card className="rounded-lg shadow-sm border border-slate-200 bg-white">
                <CardHeader className="pb-0 px-5 pt-5">
                  <CardTitle className="text-sm font-bold text-slate-700 tracking-wide uppercase">
                    Estimated Home Value
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pt-4 pb-5 space-y-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-3">
                      <p className="text-base font-semibold text-slate-800">
                        Get an expert opinion on your home&apos;s value from{" "}
                        <span className="font-bold">Ila Corcoran</span>
                      </p>
                      <Button className="bg-slate-800 hover:bg-slate-700 text-white rounded-md px-5 h-10 text-sm font-semibold gap-2">
                        <MessageSquare className="size-4" /> Request Valuation
                        Estimate
                      </Button>
                    </div>
                    <div className="text-right space-y-0.5 shrink-0">
                      <p className="text-[10px] text-slate-400 font-medium">
                        Provided by the Zestimate API
                      </p>
                      <p className="text-xs text-slate-500">
                        Zestimate® home valuation*
                      </p>
                      <p className="text-lg font-semibold text-slate-400">
                        —
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-md p-3">
                    <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our 3rd party data providers do not have an automated
                      valuation for this property. However, as an expert in
                      your market, your agent can provide a complete report of
                      your property value and market conditions.{" "}
                      <button className="text-indigo-600 font-semibold hover:underline">
                        Contact Agent
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
            </motion.div>

            {/* ── 3. Market Signal ── */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}>
            <Card className="border border-indigo-100 bg-indigo-50/30 rounded-lg shadow-sm">
              <CardContent className="px-5 py-4 flex items-start gap-3">
                <TrendingUp className="size-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-indigo-900">
                    Market signal
                  </p>
                  <p className="text-xs text-indigo-700/80 leading-relaxed">
                    Homes similar to yours are seeing active buyer interest
                    nearby. Recent listing and sale activity can help Ila
                    validate a stronger pricing strategy before you list.
                  </p>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* ── 4. Market Activity Section with Grid/Map Toggle ── */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="space-y-0.5">
                  <h3 className="text-[19px] font-bold text-slate-900 tracking-tight">
                    Market Activity
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Nearby listings and sales similar to your property.
                  </p>
                </div>
                
                {/* View Toggle */}
                <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50 backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMarketView("grid")}
                    className={cn(
                      "h-8 px-4 rounded-lg text-xs font-bold gap-2 transition-all duration-200",
                      marketView === "grid"
                        ? "bg-white shadow-sm text-slate-900"
                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                    )}
                  >
                    <LayoutGrid className="size-3.5" />
                    Grid
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMarketView("map")}
                    className={cn(
                      "h-8 px-4 rounded-lg text-xs font-bold gap-2 transition-all duration-200",
                      marketView === "map"
                        ? "bg-white shadow-sm text-slate-900"
                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                    )}
                  >
                    <MapIcon className="size-3.5" />
                    Map
                  </Button>
                </div>
              </div>

              {marketView === "grid" ? (
                <div className="space-y-8">
                  {/* Recently Listed Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Recently Listed
                      </h4>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs font-semibold text-indigo-600 hover:no-underline"
                      >
                        View all
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {recentlyListedData.map((comp, i) => (
                        <HomeValueCompCard key={i} {...comp} />
                      ))}
                    </div>
                  </div>

                  {/* Recently Sold Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Recently Sold
                      </h4>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs font-semibold text-indigo-600 hover:no-underline"
                      >
                        Analyze
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {recentlySoldData.map((comp, i) => (
                        <HomeValueCompCard key={i} {...comp} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="relative rounded-3xl border border-slate-200 overflow-hidden h-[600px] bg-slate-50 shadow-inner group"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[0.2] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
                    style={{ backgroundImage: 'url("/map-screenshot.png")' }}
                  />
                  
                  {/* Map Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                  
                  {/* Legend/Controls */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-slate-200 shadow-sm font-bold px-3 py-1.5 rounded-xl">
                      <Sparkles className="size-3 mr-1.5 text-amber-500" />
                      Smart Markers
                    </Badge>
                  </div>

                  {/* Listed Markers */}
                  {[...recentlyListedData, ...recentlySoldData].map((property, idx) => (
                    <button
                      key={idx}
                      className="absolute group/marker transition-all duration-300 hover:z-20"
                      style={{ top: property.markerTop, left: property.markerLeft }}
                    >
                      <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                        <div className={cn(
                          "px-2.5 py-1 rounded-full border border-white text-[11px] font-bold text-white shadow-xl transition-all duration-200 group-hover/marker:scale-110",
                          property.status === "Sold" ? "bg-purple-600" : "bg-slate-900"
                        )}>
                          {property.price.includes("Sold") ? property.price.split("Sold ")[1] : property.price}
                        </div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 shadow-sm border border-slate-300" />
                        
                        {/* Hover Preview Card */}
                        <div className="absolute bottom-full mb-3 opacity-0 pointer-events-none group-hover/marker:opacity-100 group-hover/marker:pointer-events-auto transition-all duration-300 translate-y-2 group-hover/marker:translate-y-0 w-48">
                          <Card className="p-1 rounded-2xl border-none shadow-2xl bg-white/95 backdrop-blur-md">
                            <div className="h-24 rounded-xl overflow-hidden mb-2">
                              <img src={property.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="p-2 space-y-1 text-left">
                              <p className="text-[13px] font-bold text-slate-900 truncate">{property.address}</p>
                              <p className="text-[11px] font-semibold text-slate-500">{property.price}</p>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Map Bottom Label */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                    <Badge className="bg-slate-900/80 backdrop-blur-md text-white border-none shadow-lg px-4 py-2 rounded-2xl text-[11px] font-medium flex items-center gap-2">
                      <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                      Showing comparable properties near you
                    </Badge>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* ── 6. Agent + Quick Message (Yearly Aesthetic) ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="w-full rounded-[20px] border border-[#27272A] bg-[#18181B] shadow-xl shadow-black/10 overflow-hidden flex flex-col font-sans">
                {/* Agent header — Centered layout */}
                <div className="relative px-5 pt-8 pb-6 flex flex-col items-center text-center">
                  {/* Subtle radial glow behind avatar area */}
                  <div className="absolute top-0 w-full h-48 bg-white/5 blur-3xl pointer-events-none" />

                  {/* Avatar */}
                  <div className="relative z-20 mb-4">
                    <div className="h-20 w-20 rounded-full flex items-center justify-center bg-[#27272A] shadow-xl border border-[#3F3F46]">
                      <Avatar className="size-[4.5rem]">
                        <AvatarImage src="/avatar-ila.png" />
                        <AvatarFallback className="bg-[#3F3F46] text-white font-bold text-lg">
                          IC
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  {/* Name and Role */}
                  <div className="relative z-20 mb-3">
                    <h3 className="text-[22px] font-semibold text-white leading-tight tracking-tight">
                      Ila Corcoran
                    </h3>
                    <p className="text-[15px] text-[#A1A1AA] font-medium mt-1">Radius Agent</p>
                  </div>

                  {/* Description */}
                  <p className="relative z-20 text-[14px] text-[#A1A1AA] leading-relaxed max-w-[280px]">
                    Want a precise valuation? I can compare your home against nearby
                    active and sold homes to give you a confident price range.
                  </p>
                </div>

                {/* Quick message */}
                <div className="px-5 pt-5 pb-6 space-y-4 border-t border-[#27272A] bg-[#18181B]">
                  <h4 className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider text-center">
                    Quick Message
                  </h4>

                  <div className="flex flex-wrap justify-center gap-2">
                    {quickMessages.map((qm) => (
                      <Button
                        key={qm}
                        variant="outline"
                        size="sm"
                        className="h-9 rounded-full text-[13px] font-medium bg-transparent border-[#3F3F46] text-[#A1A1AA] hover:bg-[#27272A] hover:text-white transition-colors duration-200"
                        onClick={() => setMessage(qm)}
                      >
                        {qm}
                      </Button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      placeholder="Write a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="h-11 rounded-xl border-[#3F3F46] text-[14px] bg-[#18181B] text-white placeholder:text-[#71717A] focus-visible:ring-1 focus-visible:ring-white shadow-sm"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="h-11 w-11 rounded-xl bg-[#E5E5E5] hover:bg-white text-[#18181B] shrink-0 transition-colors duration-200 disabled:opacity-40"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>

                  {messageSent && (
                    <p className="text-[13px] text-emerald-400 font-medium text-center mt-2">
                      Message sent to Ila!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── 6c. Selling Timeline ── */}
            <Card className="border border-slate-200 rounded-lg shadow-sm">
              <CardContent className="px-4 py-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  What&apos;s your ideal timeline for selling?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((opt) => (
                    <Button
                      key={opt}
                      variant={selectedTimeline === opt ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "h-8 rounded-full text-xs font-medium",
                        selectedTimeline === opt
                          ? "bg-slate-800 text-white hover:bg-slate-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                      onClick={() => setSelectedTimeline(opt)}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ── 6d. Before Selling Checklist ── */}
            <Card className="border border-slate-200 rounded-lg shadow-sm">
              <CardContent className="px-4 py-4 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Before selling
                </h3>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <Checkbox
                      checked={checklist.upgrades}
                      onCheckedChange={(v) =>
                        setChecklist((p) => ({ ...p, upgrades: !!v }))
                      }
                    />
                    <span
                      className={cn(
                        "text-sm",
                        checklist.upgrades
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      )}
                    >
                      Confirm home upgrades
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <Checkbox
                      checked={checklist.comps}
                      onCheckedChange={(v) =>
                        setChecklist((p) => ({ ...p, comps: !!v }))
                      }
                    />
                    <span
                      className={cn(
                        "text-sm",
                        checklist.comps
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      )}
                    >
                      Review recent comps
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <Checkbox
                      checked={checklist.cma}
                      onCheckedChange={(v) =>
                        setChecklist((p) => ({ ...p, cma: !!v }))
                      }
                    />
                    <span
                      className={cn(
                        "text-sm",
                        checklist.cma
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      )}
                    >
                      Ask Ila for a CMA
                    </span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
