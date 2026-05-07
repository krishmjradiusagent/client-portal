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
import { MarketActivitySplitView } from "./MarketActivitySplitView";

function formatPriceToK(priceStr: string) {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  if (isNaN(num)) return priceStr;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1000) return `$${Math.floor(num / 1000)}K`;
  return `$${num}`;
}

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

  if (!listing) return null;

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
          </div>
        </motion.div>

        {/* ── 4 & 5. Seller Intent Section (Full Width Grid) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* ── 6c. Selling Timeline ── */}
          <Card className="border border-slate-200 rounded-lg shadow-sm">
            <CardContent className="px-5 py-5 space-y-4">
              <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
                What&apos;s your ideal timeline for selling?
              </h3>
              <div className="flex flex-wrap gap-2">
                {timelineOptions.map((opt) => (
                  <Button
                    key={opt}
                    variant={selectedTimeline === opt ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-9 rounded-full text-xs font-semibold px-4 transition-all duration-200",
                      selectedTimeline === opt
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
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
            <CardContent className="px-5 py-5 space-y-4">
              <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">
                Before selling checklist
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={checklist.upgrades}
                    onCheckedChange={(v) =>
                      setChecklist((p) => ({ ...p, upgrades: !!v }))
                    }
                    className="size-4 rounded-md border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <span
                    className={cn(
                      "text-[13px] font-medium transition-colors",
                      checklist.upgrades
                        ? "text-slate-400 line-through"
                        : "text-slate-600 group-hover:text-slate-900"
                    )}
                  >
                    Confirm home upgrades
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={checklist.comps}
                    onCheckedChange={(v) =>
                      setChecklist((p) => ({ ...p, comps: !!v }))
                    }
                    className="size-4 rounded-md border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <span
                    className={cn(
                      "text-[13px] font-medium transition-colors",
                      checklist.comps
                        ? "text-slate-400 line-through"
                        : "text-slate-600 group-hover:text-slate-900"
                    )}
                  >
                    Review recent comps
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={checklist.cma}
                    onCheckedChange={(v) =>
                      setChecklist((p) => ({ ...p, cma: !!v }))
                    }
                    className="size-4 rounded-md border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <span
                    className={cn(
                      "text-[13px] font-medium transition-colors",
                      checklist.cma
                        ? "text-slate-400 line-through"
                        : "text-slate-600 group-hover:text-slate-900"
                    )}
                  >
                    Ask Ila for a CMA
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── 7. Market Activity Section (Split View - Full Width) ── */}
        <div className="mt-4 pt-4">
          <MarketActivitySplitView />
        </div>

      </div>
    </div>
  );
}
