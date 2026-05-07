"use client";

import React, { useState } from "react";
import { Search, Home, MapPin, BarChart3, FileText, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePropertyContext } from "./PropertyContext";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

export function HomeValueLandingPage() {
  const { addHomeValueListing } = usePropertyContext();
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleAddHome = () => {
    if (!address) return;
    const newId = `hv-${Date.now()}`;
    addHomeValueListing({
      id: newId,
      address: address,
      city: "Austin",
      state: "TX",
      zip: "78701",
      estimate: 1250000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      lastUpdated: "Just now",
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
    });
    router.push(`/home-value?id=${newId}`);
  };

  const benefits = [
    {
      title: "Get Your Home Value Instantly",
      desc: "Access your home dashboard at any time and receive monthly updates.",
      icon: Home,
    },
    {
      title: "Compare Your Home's Value",
      desc: "Browse listings and compare your home to real properties from the MLS.",
      icon: MapPin,
    },
    {
      title: "See Demand In Your Area",
      desc: "Analyze buyer demand by price range to see the demand for homes in your area.",
      icon: BarChart3,
    },
  ];

  const faqs = [
    { q: "Why stay up-to-date with your property value?", a: "Tracking your home's value helps you make informed decisions about refinancing, selling, or leveraging your equity." },
    { q: "How is a home value estimate calculated?", a: "Estimates use recent comparable sales, current market conditions, and property characteristics from public records." },
    { q: "What factors affect my home's value?", a: "Location, square footage, condition, recent renovations, school districts, and local market trends all influence value." },
    { q: "How to price your home for sale?", a: "Your agent can provide a detailed CMA comparing your home to similar properties that recently sold nearby." },
    { q: "Will my personal details be shared?", a: "No. Your information is only shared with your assigned agent and never sold to third parties." },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white">

      {/* Hero Section — bg image + overlay */}
      <section className="relative min-h-[340px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Content Card */}
        <Card className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl border-0">
          <CardContent className="p-8 space-y-5">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                What&apos;s my home worth?
              </h1>
              <p className="text-sm text-slate-500">
                Get a free home value estimate instantly
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Home Address
              </label>
              <div className="flex items-center border border-slate-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <Search className="size-4 text-slate-400 ml-3 shrink-0" />
                <Input
                  placeholder="Enter your address"
                  className="h-10 border-none shadow-none focus-visible:ring-0 text-sm text-slate-900 placeholder:text-slate-400"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddHome()}
                />
              </div>
            </div>

            <Button
              onClick={handleAddHome}
              className="w-full h-11 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm gap-2"
            >
              View Home Value <ChevronRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Benefits Section */}
      <section className="w-full max-w-3xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-xl font-bold text-slate-900 text-center">
          Receive an Estimate and Explore Your Home&apos;s Value
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <Card key={i} className="border border-slate-200 rounded-lg shadow-sm text-center">
              <CardContent className="p-5 space-y-3">
                <div className="mx-auto w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                  <b.icon className="size-5 text-slate-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-2xl mx-auto px-6 pb-12 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 text-center">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-100">
              <AccordionTrigger className="text-sm font-medium text-slate-800 hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-slate-500 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Agent Footer */}
      <section className="w-full max-w-2xl mx-auto px-6 pb-12 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Get an Expert Opinion on Your Home&apos;s Value
        </h2>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-16 border-2 border-white shadow-lg">
            <AvatarImage src="/avatar-ila.png" />
            <AvatarFallback className="font-bold">IC</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-base font-bold text-slate-900">Ila Corcoran</p>
            <p className="text-xs text-slate-500">License #01383148</p>
            <p className="text-xs text-slate-500">Radius Agent</p>
          </div>
        </div>
      </section>
    </div>
  );
}
