"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, Bed, Bath, Ruler, Calendar, Maximize, TrendingDown, Clock, Info, ShieldCheck, MessageCircle, X, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { usePropertyContext } from "./PropertyContext";
import { ChatMessageBubble } from "./client-portal/ChatMessageBubble";
import { cn } from "@/lib/utils";
import type { Property } from "./mockData";

export function PropertyDetailPage() {
  const { 
    selectedPropertyId, 
    setSelectedPropertyId, 
    properties, 
    toggleInterested, 
    toggleNotInterested,
    visitedIds,
    messages,
    sendMessage,
    propertyActivity,
    addPropertyActivity
  } = usePropertyContext();

  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"activity" | "chat">("activity");

  const property = useMemo(() => 
    properties.find(p => p.id === selectedPropertyId),
    [properties, selectedPropertyId]
  );

  const currentIndex = useMemo(() => 
    properties.findIndex(p => p.id === selectedPropertyId),
    [properties, selectedPropertyId]
  );

  if (!property) return null;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % properties.length;
    setSelectedPropertyId(properties[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + properties.length) % properties.length;
    setSelectedPropertyId(properties[prevIndex].id);
  };

  const handleSendMessage = () => {
    if (messageText.trim() && property) {
      sendMessage(messageText, property.id);
      setMessageText("");
      setActiveTab("chat");
    }
  };

  const handleInterestToggle = () => {
    if (property) {
      toggleInterested(property.id);
      addPropertyActivity(property.id, { 
        type: isInterested ? "Removed interest" : "Marked as Interested", 
        user: "You" 
      });
    }
  };

  const handlePassToggle = () => {
    if (property) {
      toggleNotInterested(property.id);
      addPropertyActivity(property.id, { 
        type: isNotInterested ? "Removed pass" : "Marked as Pass", 
        user: "You" 
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current && activeTab === "chat") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const activity = useMemo(() => 
    property ? propertyActivity[property.id] || [] : [],
    [property, propertyActivity]
  );

  const isInterested = property.status === "interested";
  const isNotInterested = property.status === "notInterested";

  return (
    <div className="flex h-full flex-col bg-background overflow-hidden">
      {/* Top Nav */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="-ml-2 h-9 gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setSelectedPropertyId(null)}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs font-medium text-muted-foreground">
              {currentIndex + 1} of {properties.length}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-9 gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("h-9 gap-2", isInterested && "text-rose-600 hover:text-rose-700 hover:bg-rose-50")}
            onClick={handleInterestToggle}
          >
            <Heart className={cn("h-4 w-4", isInterested && "fill-current")} />
            {isInterested ? "Saved" : "Save"}
          </Button>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          {/* Gallery - Airbnb Style */}
          <section className="mb-8 overflow-hidden rounded-xl border">
            <div className="grid h-[500px] grid-cols-4 grid-rows-2 gap-2 bg-muted">
              {/* Main Hero */}
              <div className="relative col-span-2 row-span-2 overflow-hidden group">
                <img 
                  src={property.images[0] || property.image} 
                  alt={property.address}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              
              {/* Secondary Images */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative overflow-hidden group bg-slate-100">
                  {property.images[i] ? (
                    <img 
                      src={property.images[i]} 
                      alt={`${property.address} - ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
                      <Clock className="h-8 w-8 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {i === 4 && property.images.length > 5 && (
                    <Button variant="secondary" className="absolute bottom-4 right-4 h-9 bg-white text-foreground shadow-sm hover:bg-white/90">
                      Show all {property.images.length} photos
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Property Layout Container */}
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Left Column: Details */}
            <div className="space-y-12">
              {/* Header Info */}
              <section className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">{property.address}</h1>
                    <div className="flex items-center gap-1.5 text-lg text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {property.area} · {property.city}, {property.state}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">${property.price.toLocaleString()}</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Estimated Monthly: $4,850/mo
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-y py-6">
                  <div className="flex items-center gap-2 pr-4 border-r last:border-0">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <div className="text-lg font-semibold">{property.beds} <span className="text-sm font-normal text-muted-foreground">Beds</span></div>
                  </div>
                  <div className="flex items-center gap-2 pr-4 border-r last:border-0">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <div className="text-lg font-semibold">{property.baths} <span className="text-sm font-normal text-muted-foreground">Baths</span></div>
                  </div>
                  <div className="flex items-center gap-2 pr-4 border-r last:border-0">
                    <Ruler className="h-5 w-5 text-muted-foreground" />
                    <div className="text-lg font-semibold">{property.sqft.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">Sqft</span></div>
                  </div>
                  <div className="flex items-center gap-2 pr-4 border-r last:border-0">
                    <Maximize className="h-5 w-5 text-muted-foreground" />
                    <div className="text-lg font-semibold">{property.lot} <span className="text-sm font-normal text-muted-foreground">Lot</span></div>
                  </div>
                  <div className="flex items-center gap-2 pr-4 border-r last:border-0">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div className="text-lg font-semibold">{property.yearBuilt} <span className="text-sm font-normal text-muted-foreground">Year</span></div>
                  </div>
                  <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-100 font-bold px-3 py-1">
                    {property.matchScore}% Match
                  </Badge>
                </div>
              </section>

              {/* Description */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">About this home</h2>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-[800px]">
                  {property.description} {property.description.length < 200 && "Discover the perfect blend of modern luxury and cozy comfort in this stunning property. Featuring high-end finishes, an open-concept living area, and a private outdoor retreat, this home is designed for both relaxation and entertainment."}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {property.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 border-none font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Key Details Accordion */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Property details</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="key-facts" className="border-t">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Key Facts</AccordionTrigger>
                    <AccordionContent className="pb-8">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">Property Type</div>
                          <div className="font-medium text-base">{property.type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">MLS Status</div>
                          <div className="font-medium text-base">Active ({property.mlsStatus})</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">Days on Market</div>
                          <div className="font-medium text-base">4 days</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">Price per Sqft</div>
                          <div className="font-medium text-base">${Math.round(property.price / property.sqft)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">HOA Dues</div>
                          <div className="font-medium text-base">$350/mo</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">MLS ID</div>
                          <div className="font-medium text-base">#4829302</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="interior">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Interior Features</AccordionTrigger>
                    <AccordionContent className="pb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
                        <div className="space-y-4">
                          <h4 className="font-bold text-foreground">Bedrooms & Bathrooms</h4>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Total Bedrooms: {property.beds}</li>
                            <li>Total Bathrooms: {property.baths}</li>
                            <li>Full Bathrooms: {Math.floor(property.baths)}</li>
                            <li>Partial Bathrooms: {property.baths % 1 > 0 ? 1 : 0}</li>
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold text-foreground">Kitchen</h4>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>Chef's Kitchen with Island</li>
                            <li>Quartz Countertops</li>
                            <li>Premium Stainless Appliances</li>
                            <li>Built-in Wine Cooler</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="construction">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">Building & Construction</AccordionTrigger>
                    <AccordionContent className="pb-8 text-base text-muted-foreground">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 font-bold uppercase">Year Built</div>
                          <div className="text-foreground">{property.yearBuilt}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 font-bold uppercase">Structure Type</div>
                          <div className="text-foreground">{property.type}</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              {/* MLS Disclaimer */}
              <section className="pt-12 border-t text-[11px] text-muted-foreground leading-relaxed">
                <div className="flex gap-4 mb-4">
                  <img src="/mls-logo.png" alt="MLS Logo" className="h-8 w-auto grayscale opacity-50" />
                  <div>
                    The data relating to real estate for sale on this web site comes in part from the Internet Data Exchange Program of ACTRIS. 
                    Real estate listings held by brokerage firms other than Radius Agent are marked with the Internet Data Exchange logo or 
                    the Internet Data Exchange thumbnail logo and detailed information about them includes the name of the listing brokers. 
                    Listing courtesy of Keller Williams Realty Austin.
                  </div>
                </div>
                <div className="uppercase font-bold mb-2">IDX Disclaimer</div>
                <p>
                  Information Deemed Reliable but Not Guaranteed. All information should be verified by the user and it is recommended 
                  that the user hire a professional to verify all info. This information was last updated: {new Date().toLocaleDateString()}.
                </p>
              </section>
            </div>

            {/* Right Column: Sticky Feedback Panel */}
            <aside className="relative">
              <div className="sticky top-8 space-y-6">
                {/* Interest Status Card */}
                <Card className="shadow-lg border-primary/10 overflow-hidden">
                  <div className={cn(
                    "h-1.5 w-full",
                    isInterested ? "bg-emerald-500" : isNotInterested ? "bg-rose-500" : "bg-muted"
                  )} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Are you interested?</CardTitle>
                      <Badge variant="outline" className="font-bold uppercase tracking-wider text-[10px]">
                        Feedback
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button 
                        variant={isInterested ? "default" : "outline"}
                        className={cn("flex-1 h-12 gap-2", isInterested && "bg-emerald-600 hover:bg-emerald-700")}
                        onClick={handleInterestToggle}
                      >
                        <Heart className={cn("h-4 w-4", isInterested && "fill-current")} />
                        Interested
                      </Button>
                      <Button 
                        variant={isNotInterested ? "destructive" : "outline"}
                        className="flex-1 h-12 gap-2"
                        onClick={handlePassToggle}
                      >
                        <X className="h-4 w-4" />
                        Pass
                      </Button>
                    </div>
                    
                    {isInterested && (
                      <div className="space-y-3 pt-2">
                        <div className="text-sm font-medium flex items-center gap-2 text-emerald-700">
                          <ShieldCheck className="h-4 w-4" />
                          Great choice! We'll keep you updated.
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-xs leading-relaxed">
                          Your agent, <strong>Scott Kato</strong>, has been notified. 
                          Would you like to request a tour or more info?
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Team Card */}
                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Team Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border overflow-hidden">
                        <img src="/avatar-scott.png" alt="Scott Kato" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">Scott Kato</div>
                        <div className="text-xs text-muted-foreground truncate">Your Radius Agent</div>
                      </div>
                      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px]">Online</Badge>
                    </div>

                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-9 bg-slate-100/50 p-1">
                        <TabsTrigger value="activity" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Activity</TabsTrigger>
                        <TabsTrigger value="chat" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm">Chat</TabsTrigger>
                      </TabsList>

                      <TabsContent value="activity" className="mt-4">
                        <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                          {activity.length > 0 ? (
                            activity.slice(0, 5).map((act, i) => (
                              <div key={i} className="relative pl-6">
                                <div className={cn(
                                  "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm",
                                  act.type.includes("Interested") ? "bg-emerald-500" : 
                                  act.type.includes("Pass") ? "bg-rose-500" :
                                  act.type.includes("Message") ? "bg-blue-500" : "bg-slate-300"
                                )} />
                                <div className="text-xs font-semibold">{act.type}</div>
                                <div className="text-[10px] text-muted-foreground">{act.user} · {act.time}</div>
                              </div>
                            ))
                          ) : (
                            <div className="relative pl-6">
                              <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
                              <div className="text-xs font-medium text-muted-foreground">No recent activity</div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="chat" className="mt-4">
                        <ScrollArea ref={scrollRef} className="h-[200px] pr-4 -mr-4">
                          <div className="space-y-4">
                            {messages.slice(-5).map((msg, i) => (
                              <div key={msg.id} className={cn(
                                "flex flex-col gap-1",
                                msg.isIncoming ? "items-start" : "items-end"
                              )}>
                                <div className={cn(
                                  "max-w-[85%] px-3 py-2 rounded-2xl text-xs font-medium",
                                  msg.isIncoming 
                                    ? "bg-slate-100 text-slate-800 rounded-bl-none" 
                                    : "bg-primary text-primary-foreground rounded-br-none"
                                )}>
                                  {msg.content}
                                </div>
                                <span className="text-[9px] text-muted-foreground px-1">{msg.time}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>

                    <div className="flex gap-2 pt-2">
                      <Input 
                        placeholder="Ask Scott a question..." 
                        className="h-10 text-xs bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button size="icon" className="h-10 w-10 shrink-0" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Agent Call to Action */}
                <Button className="w-full h-12 text-base bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold">
                  Contact Scott Kato
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
