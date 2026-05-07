"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, Bed, Bath, Ruler, Calendar, Maximize, Clock, MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePropertyContext } from "./PropertyContext";
import { cn } from "@/lib/utils";

export function PropertyDetailPage() {
  const { 
    selectedPropertyId, 
    setSelectedPropertyId, 
    properties,
    toggleInterested,
    toggleNotInterested,
    addPropertyActivity
  } = usePropertyContext();
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const isInterested = property.status === "interested";
  const isNotInterested = property.status === "notInterested";

  const handleInterestToggle = () => {
    toggleInterested(property.id);
    addPropertyActivity(property.id, {
      type: isInterested ? "Removed interest" : "Marked as Interested",
      user: "You"
    });
  };

  const handlePassToggle = () => {
    toggleNotInterested(property.id);
    addPropertyActivity(property.id, {
      type: isNotInterested ? "Removed pass" : "Marked as Pass",
      user: "You"
    });
  };

  const fullDescription = `${property.description} A polished Austin home with practical living spaces, strong natural light, and outdoor areas sized for easy hosting. The layout keeps daily routines simple while giving buyers enough flexibility for work, guests, and weekend use. Buyer to verify schools, taxes, square footage, zoning, restrictions, and all listing details.`;
  const monthlyCost = Math.round(property.price * 0.00542);
  const propertyTax = Math.round(property.price * 0.0186 / 12);
  const insurance = Math.round(property.price * 0.0032 / 12);
  const principalInterest = Math.max(monthlyCost - propertyTax - insurance - 350, 0);

  return (
    <div className="flex flex-1 min-h-0 flex-col bg-background overflow-hidden">
      {/* Top Nav */}
      <header className="flex h-14 shrink-0 items-center border-b px-6">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="max-w-[360px] truncate text-sm font-medium text-foreground">
              {property.address} | {currentIndex + 1} of {properties.length}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
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
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Column: Details */}
            <div className="space-y-6">
              {/* Header Info */}
              <Card className="overflow-hidden border-border/80 shadow-sm">
                <CardContent className="space-y-5 p-6 md:p-7">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 space-y-4">
                      <div className="space-y-2">
                        <div className="text-[34px] font-semibold leading-none tracking-tight text-foreground md:text-[38px]">${property.price.toLocaleString()}</div>
                        <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-foreground md:text-[26px]">{property.address}</h1>
                        <div className="flex items-center gap-2 text-[15px] font-medium text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {property.area} · {property.city}, {property.state}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
                        <div className="font-semibold">{property.beds} <span className="font-normal text-muted-foreground">beds</span></div>
                        <Separator orientation="vertical" className="h-5" />
                        <div className="font-semibold">{property.baths} <span className="font-normal text-muted-foreground">baths</span></div>
                        <Separator orientation="vertical" className="h-5" />
                        <div className="font-semibold">{property.sqft.toLocaleString()} <span className="font-normal text-muted-foreground">sqft</span></div>
                        <Separator orientation="vertical" className="h-5" />
                        <div className="font-semibold">{property.lot} <span className="font-normal text-muted-foreground">lot</span></div>
                        <Separator orientation="vertical" className="h-5" />
                        <div className="font-semibold">{property.yearBuilt} <span className="font-normal text-muted-foreground">year</span></div>
                      </div>
                    </div>
                    <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-full" aria-label="Share home">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-3 border-t pt-5 sm:grid-cols-2 lg:grid-cols-5">
                    {[
                      { icon: Bed, label: "Beds", value: property.beds },
                      { icon: Bath, label: "Baths", value: property.baths },
                      { icon: Ruler, label: "Sqft", value: property.sqft.toLocaleString() },
                      { icon: Maximize, label: "Lot", value: property.lot },
                      { icon: Calendar, label: "Year", value: property.yearBuilt },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg border bg-muted/30 p-3">
                        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </div>
                        <div className="text-lg font-semibold">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t pt-5">
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      {property.matchScore}% Match
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">Estimated monthly $4,850/mo</span>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">About this home</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="max-w-[800px] text-base leading-7 text-muted-foreground">
                    {showFullDescription ? fullDescription : `${fullDescription.slice(0, 230)}...`}
                  </p>
                  <Button variant="link" className="h-auto p-0 font-semibold" onClick={() => setShowFullDescription(!showFullDescription)}>
                    {showFullDescription ? "Show less" : "Show more"}
                  </Button>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Updated kitchen", "Natural light", "Garage", "Walkable", "Large backyard", "New appliances", ...property.tags].map(tag => (
                      <Badge key={tag} variant="secondary" className="border-none bg-muted font-medium text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Details Accordion */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Facts & features</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="key-facts" className="border-t-0">
                      <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">Key facts</AccordionTrigger>
                      <AccordionContent className="pb-6">
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
                          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-bold">Listing ID</div>
                          <div className="font-medium text-base">#4829302</div>
                        </div>
                      </div>
                    </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="interior">
                      <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">Interior features</AccordionTrigger>
                      <AccordionContent className="pb-6">
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

                    <AccordionItem value="systems">
                      <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">Heating, cooling, appliances</AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="grid grid-cols-1 gap-8 text-base md:grid-cols-3">
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Heating</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Central</li>
                              <li>Natural gas</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Cooling</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Central air</li>
                              <li>Ceiling fans</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Appliances</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Dishwasher</li>
                              <li>Gas range</li>
                              <li>Refrigerator</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="exterior">
                      <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">Exterior, parking, lot</AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="grid grid-cols-1 gap-8 text-base md:grid-cols-3">
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Exterior</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Private patio</li>
                              <li>Fenced yard</li>
                              <li>Covered porch</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Parking</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Attached garage</li>
                              <li>2 garage spaces</li>
                              <li>Driveway parking</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Lot</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>{property.lot}</li>
                              <li>Level yard</li>
                              <li>Street access</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="construction">
                      <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">Building & construction</AccordionTrigger>
                      <AccordionContent className="pb-6 text-base text-muted-foreground">
                      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 font-bold uppercase">Year Built</div>
                          <div className="text-foreground">{property.yearBuilt}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 font-bold uppercase">Structure Type</div>
                          <div className="text-foreground">{property.type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 font-bold uppercase">Roof</div>
                          <div className="text-foreground">Composition</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1 font-bold uppercase">Foundation</div>
                          <div className="text-foreground">Slab</div>
                        </div>
                      </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="utilities">
                      <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">Utilities, HOA, community</AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="grid grid-cols-1 gap-8 text-base md:grid-cols-3">
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Utilities</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Electric connected</li>
                              <li>Natural gas connected</li>
                              <li>Public sewer</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">HOA</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>$350 monthly</li>
                              <li>Common area maintenance</li>
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-foreground">Community</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li>Sidewalks</li>
                              <li>Nearby retail</li>
                              <li>Bike routes</li>
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-72 overflow-hidden rounded-lg border bg-muted">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px),linear-gradient(0deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" />
                    <div className="absolute left-1/2 top-1/2 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background shadow-lg">
                      {property.address}
                    </div>
                  </div>
                  <div className="grid gap-4 text-sm md:grid-cols-3">
                    <div>
                      <div className="font-semibold">Neighborhood</div>
                      <div className="text-muted-foreground">{property.area}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Area context</div>
                      <div className="text-muted-foreground">Near South Congress retail and major Austin corridors</div>
                    </div>
                    <div>
                      <div className="font-semibold">Address</div>
                      <div className="text-muted-foreground">{property.address}, {property.city}, {property.state}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Schools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 text-left text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-medium">School</th>
                          <th className="px-4 py-3 font-medium">Grades</th>
                          <th className="px-4 py-3 font-medium">Distance</th>
                          <th className="px-4 py-3 font-medium">Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Travis Heights Elementary", "PK-5", "0.8 mi", "7/10"],
                          ["Lively Middle School", "6-8", "1.9 mi", "5/10"],
                          ["Austin High School", "9-12", "3.2 mi", "6/10"],
                        ].map(([name, grades, distance, rating]) => (
                          <tr key={name} className="border-t">
                            <td className="px-4 py-3 font-medium">{name}</td>
                            <td className="px-4 py-3 text-muted-foreground">{grades}</td>
                            <td className="px-4 py-3 text-muted-foreground">{distance}</td>
                            <td className="px-4 py-3 text-muted-foreground">{rating}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Price and tax history</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50 text-left text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-medium">Date</th>
                          <th className="px-4 py-3 font-medium">Event</th>
                          <th className="px-4 py-3 font-medium">Price</th>
                          <th className="px-4 py-3 font-medium">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["May 1, 2024", "Listed for sale", `$${property.price.toLocaleString()}`, "-"],
                          ["Apr 14, 2022", "Sold", "$790,000", "+8.2%"],
                          ["2024 tax", "Assessment", "$812,400", "$15,100 tax"],
                        ].map(([date, event, price, change]) => (
                          <tr key={`${date}-${event}`} className="border-t">
                            <td className="px-4 py-3 font-medium">{date}</td>
                            <td className="px-4 py-3 text-muted-foreground">{event}</td>
                            <td className="px-4 py-3 text-muted-foreground">{price}</td>
                            <td className="px-4 py-3 text-muted-foreground">{change}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Market value and investment</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  {[
                    ["Estimated value", `$${Math.round(property.price * 0.985).toLocaleString()}`, "Range $850K - $925K"],
                    ["Comparable homes", "6 active", "3 recently sold nearby"],
                    ["Rent estimate", "$4,350/mo", "Range $4,050 - $4,700"],
                  ].map(([label, value, note]) => (
                    <div key={label} className="rounded-lg border bg-muted/30 p-4">
                      <div className="text-sm font-medium text-muted-foreground">{label}</div>
                      <div className="mt-2 text-xl font-semibold">{value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{note}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Public facts and climate risk</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-3 text-sm">
                    {[
                      ["Parcel number", "040201-18-0942"],
                      ["County", "Travis"],
                      ["Zoning", "Residential"],
                      ["APN", "040201180942"],
                      ["Tax assessed value", "$812,400"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 border-b pb-2">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 text-sm">
                    {[
                      ["Flood risk", "Minimal"],
                      ["Fire risk", "Moderate"],
                      ["Heat risk", "Major"],
                      ["Wind risk", "Minor"],
                      ["Air quality risk", "Moderate"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 border-b pb-2">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Nearby homes</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-3">
                  {properties.filter((item) => item.id !== property.id).slice(0, 3).map((item) => (
                    <div key={item.id} className="overflow-hidden rounded-lg border">
                      <img src={item.image} alt={item.address} className="h-32 w-full object-cover" />
                      <div className="space-y-1 p-3">
                        <div className="font-semibold">${item.price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{item.address}</div>
                        <div className="text-xs text-muted-foreground">{item.beds} bd · {item.baths} ba · {item.sqft.toLocaleString()} sqft</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <Input placeholder="Name" aria-label="Name" />
                    <Input type="email" placeholder="Email" aria-label="Email" />
                    <Input type="tel" placeholder="Phone" aria-label="Phone" />
                  </div>
                  <Textarea
                    placeholder={`I am interested in ${property.address}.`}
                    aria-label="Message"
                    className="min-h-28"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button>Contact agent</Button>
                    <Button variant="outline">Request a tour</Button>
                  </div>
                </CardContent>
              </Card>

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

            {/* Right Column: Sticky Info Panel */}
            <aside className="relative">
              <div className="sticky top-8 space-y-6">
                <Card className="overflow-hidden border-primary/10 shadow-lg">
                  <div className={cn(
                    "h-1.5 w-full",
                    isInterested ? "bg-emerald-500" : isNotInterested ? "bg-rose-500" : "bg-muted"
                  )} />
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Are you interested?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button
                        variant={isInterested ? "default" : "outline"}
                        className={cn("h-11 flex-1 gap-2", isInterested && "bg-emerald-600 hover:bg-emerald-700")}
                        onClick={handleInterestToggle}
                      >
                        <Heart className={cn("h-4 w-4", isInterested && "fill-current")} />
                        Interested
                      </Button>
                      <Button
                        variant={isNotInterested ? "destructive" : "outline"}
                        className="h-11 flex-1 gap-2"
                        onClick={handlePassToggle}
                      >
                        <X className="h-4 w-4" />
                        Pass
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Listing snapshot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {[
                      ["Status", `Active (${property.mlsStatus})`],
                      ["Days on market", "4 days"],
                      ["Listing ID", "#4829302"],
                      ["Listed date", property.listedDate],
                      ["Brokerage", "Keller Williams Realty Austin"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 border-b pb-2 last:border-b-0 last:pb-0">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Estimated monthly cost</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-2xl font-semibold">${monthlyCost.toLocaleString()}/mo</div>
                      <div className="text-xs text-muted-foreground">Estimate only. Buyer to verify.</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        ["Principal & interest", principalInterest],
                        ["Property taxes", propertyTax],
                        ["Home insurance", insurance],
                        ["HOA fees", 350],
                        ["Mortgage insurance", 0],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-6">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">${Number(value).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Open houses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="text-sm font-semibold">Saturday, May 9</div>
                      <div className="text-xs text-muted-foreground">12:00 PM - 2:00 PM</div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="text-sm font-semibold">Sunday, May 10</div>
                      <div className="text-xs text-muted-foreground">1:00 PM - 3:00 PM</div>
                    </div>
                    <Button variant="outline" className="w-full">Ask for availability</Button>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Contact agent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full border bg-muted">
                        <img src="/avatar-scott.png" alt="Scott Kato" className="h-full w-full rounded-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Scott Kato</div>
                        <div className="text-xs text-muted-foreground">(512) 555-0148</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Message agent
                      </Button>
                      <Button variant="outline">Request a tour</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Listing metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {[
                      ["Provided by", "ACTRIS"],
                      ["MLS source", "Internet Data Exchange"],
                      ["Last updated", new Date().toLocaleDateString()],
                      ["Equal housing", "Applies"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-6 border-b pb-2 last:border-b-0 last:pb-0">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="text-right font-medium">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
