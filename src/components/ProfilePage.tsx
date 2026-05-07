"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import Link from "next/link";
import { usePropertyContext } from "./PropertyContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  ThumbsUp, ThumbsDown, Minus, Mail, Phone, MessageCircle, 
  Building2, UserRound, MapPin, Bed, Bath, Sparkles, 
  Settings2, Activity, Search, Heart, BellRing, BellOff
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";
import { useAuth } from "@/lib/auth";

export function ProfilePage() {
  const { 
    interestedCount, 
    notInterestedCount, 
    properties,
    profileData,
    updateProfileData,
    savedSearches,
    selectedSavedSearchId,
    setSelectedSavedSearchId
  } = usePropertyContext();
  const { setAuthMode, authUser } = useAuth();

  const neutralCount = properties.filter(p => p.status === "search").length;

  const [preferences, setPreferences] = useState<Record<string, "like" | "dislike" | "neutral">>({
    parks: "neutral",
    openFloorPlan: "neutral",
    naturalLight: "neutral",
    largeYard: "neutral",
    quietNeighborhood: "neutral"
  });

  const updatePreference = (key: string, val: "like" | "dislike" | "neutral") => {
    setPreferences(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="bg-[#f8fafc] min-h-full px-4 sm:px-8 py-8 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl space-y-8 pb-24">
        {/* Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage your personal information, contact preferences, and search criteria.
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left Column: Main Content */}
          <div className="min-w-0 space-y-8">
            
            {/* Context Card: Search Summary */}
            {savedSearches.length === 0 ? (
              <Card className="border-slate-200 shadow-sm overflow-hidden text-center py-10 px-6">
                <div className="mx-auto bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h2 className="font-semibold text-slate-900 mb-1">No saved search yet</h2>
                <p className="text-sm text-slate-500 mb-6">Create a search to start tracking matching homes.</p>
                <Button onClick={() => {
                  if (!authUser) {
                    setAuthMode("signup");
                  } else {
                    // Navigate to search creation flow in real implementation
                  }
                }}>Create Search</Button>
              </Card>
            ) : (
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-md">
                      <Search className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">Active Search Context</h2>
                      <p className="text-xs text-slate-500">
                        {savedSearches.length === 1 
                          ? "Saved search criteria" 
                          : "Choose a saved search to view matching homes"}
                      </p>
                    </div>
                  </div>
                  {savedSearches.length >= 6 && (
                    <div className="sm:max-w-[240px] w-full">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">Viewing search</div>
                      <Select 
                        value={selectedSavedSearchId || savedSearches[0].id} 
                        onValueChange={setSelectedSavedSearchId}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select a search" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedSearches.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {savedSearches.length > 1 && savedSearches.length <= 5 && (
                  <div className="px-6 pt-5 pb-0">
                    <div className="flex flex-wrap gap-2">
                      {savedSearches.map(s => {
                        const isSelected = (selectedSavedSearchId || savedSearches[0].id) === s.id;
                        return (
                          <TooltipProvider key={s.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => setSelectedSavedSearchId(s.id)}
                                  className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors border max-w-[200px]
                                    ${isSelected 
                                      ? "border-primary bg-primary/5 text-primary font-medium" 
                                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}
                                  `}
                                >
                                  <span className="truncate">{s.name}</span>
                                  {s.propertyIds?.length > 0 && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}>
                                      {s.propertyIds.length} matches
                                    </span>
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{s.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )
                      })}
                    </div>
                    <Separator className="mt-5" />
                  </div>
                )}

                <CardContent className={`p-6 ${savedSearches.length > 1 && savedSearches.length <= 5 ? "pt-5" : ""}`}>
                  {(() => {
                    const activeSearch = savedSearches.find(s => s.id === (selectedSavedSearchId || savedSearches[0].id)) || savedSearches[0];
                    const criteriaStr = activeSearch.criteria.toLowerCase();
                    const bedsMatch = criteriaStr.match(/(\d+\+?)\s*beds?/);
                    const beds = bedsMatch ? bedsMatch[1] + " Beds" : "Any";
                    
                    const priceRange = activeSearch.priceMin && activeSearch.priceMax 
                      ? `${activeSearch.priceMin} - ${activeSearch.priceMax}`
                      : activeSearch.priceMax ? `Up to ${activeSearch.priceMax}`
                      : activeSearch.priceMin ? `${activeSearch.priceMin}+`
                      : "Any";

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Location</p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" /> 
                            <span className="truncate">{activeSearch.location || "Any"}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Price Range</p>
                          <div className="text-sm font-semibold text-slate-700">{priceRange}</div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Beds</p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            <Bed className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {beds}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Baths</p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            <Bath className="h-3.5 w-3.5 text-slate-400 shrink-0" /> Any
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Property Type</p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" /> Any
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Alerts</p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            {activeSearch.emailAlerts === false ? <BellOff className="h-3.5 w-3.5 text-slate-400 shrink-0" /> : <BellRing className="h-3.5 w-3.5 text-slate-400 shrink-0" />} 
                            {activeSearch.emailAlerts === false ? "Off" : "On"}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Contact Details */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>How your agent and the portal will reach you.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-600">Full Name</Label>
                  <Input id="name" value={profileData.name} onChange={(e) => updateProfileData({ name: e.target.value })} className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-600">Email Address</Label>
                  <Input id="email" value={profileData.email} onChange={(e) => updateProfileData({ email: e.target.value })} className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-600">Phone Number</Label>
                  <Input id="phone" value={profileData.phone} onChange={(e) => updateProfileData({ phone: e.target.value })} className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-600">Preferred Contact Method</Label>
                  <ToggleGroup
                    type="single"
                    value={profileData.contactMethod}
                    onValueChange={(val) => {
                      if (val) updateProfileData({ contactMethod: val });
                    }}
                    className="justify-start bg-slate-50 p-1 rounded-md border"
                  >
                    <ToggleGroupItem value="email" aria-label="Email" className="data-[state=on]:bg-white data-[state=on]:shadow-sm">Email</ToggleGroupItem>
                    <ToggleGroupItem value="text" aria-label="Text" className="data-[state=on]:bg-white data-[state=on]:shadow-sm">Text</ToggleGroupItem>
                    <ToggleGroupItem value="phone" aria-label="Phone" className="data-[state=on]:bg-white data-[state=on]:shadow-sm">Phone</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Search Preferences */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-slate-400" />
                  <CardTitle className="text-lg">Property Preferences</CardTitle>
                </div>
                <CardDescription>
                  Rate these features to help us understand your lifestyle needs. 
                  Your agent uses this to fine-tune your personalized matches.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-slate-100">
                {[
                  { id: "parks", label: "Near parks", desc: "Homes close to parks, trails, or green space." },
                  { id: "openFloorPlan", label: "Open floor plan", desc: "Spacious layout with connected living areas." },
                  { id: "naturalLight", label: "Natural light", desc: "Large windows and bright, sunlit rooms." },
                  { id: "largeYard", label: "Large yard", desc: "Ample outdoor space for activities or gardening." },
                  { id: "quietNeighborhood", label: "Quiet neighborhood", desc: "Low traffic streets and peaceful surroundings." },
                ].map((pref) => (
                  <div key={pref.id} className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{pref.label}</p>
                      <p className="text-sm text-slate-500">{pref.desc}</p>
                    </div>
                    <div className="flex gap-2 shrink-0 bg-slate-100 p-1 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updatePreference(pref.id, "like")}
                        className={`transition-all h-8 px-3 rounded-md ${preferences[pref.id] === "like" ? "bg-white text-emerald-600 shadow-sm hover:text-emerald-700 hover:bg-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
                      >
                        <ThumbsUp className="mr-1.5 h-3.5 w-3.5" />
                        Like
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updatePreference(pref.id, "neutral")}
                        className={`transition-all h-8 px-3 rounded-md ${preferences[pref.id] === "neutral" ? "bg-white text-slate-900 shadow-sm hover:text-slate-900 hover:bg-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
                      >
                        <Minus className="mr-1.5 h-3.5 w-3.5" />
                        Neutral
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updatePreference(pref.id, "dislike")}
                        className={`transition-all h-8 px-3 rounded-md ${preferences[pref.id] === "dislike" ? "bg-white text-rose-600 shadow-sm hover:text-rose-700 hover:bg-white" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
                      >
                        <ThumbsDown className="mr-1.5 h-3.5 w-3.5" />
                        Dislike
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Sticky Rail */}
          <aside className="min-w-0 space-y-6 lg:sticky lg:top-8 self-start max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar pb-8">
            
            {/* Agent Context Card */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-6 py-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Building2 className="w-32 h-32 transform translate-x-8 -translate-y-8" />
                </div>
                <div className="relative z-10 flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                    <AvatarImage src="" alt="Scott Kato" />
                    <AvatarFallback className="bg-slate-800 text-white font-bold text-xl">SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <Badge className="bg-white/20 hover:bg-white/20 text-white border-none text-[10px] h-5 px-2 uppercase tracking-wider mb-1.5 font-semibold">Your Agent</Badge>
                    <h3 className="font-bold text-xl tracking-tight leading-none">Scott Kato</h3>
                    <p className="text-sm font-medium text-slate-300 mt-1 flex items-center gap-1.5">
                      Circle Real Estate
                    </p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="w-full gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                    <Mail className="h-4 w-4 text-slate-400" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                    <Phone className="h-4 w-4 text-slate-400" />
                    Call
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 rounded-md bg-slate-100 text-slate-500">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Direct Line</p>
                      <span className="font-semibold text-slate-700">(512) 555-0182</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="p-2 rounded-md bg-slate-100 text-slate-500">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Role</p>
                      <span className="font-semibold text-slate-700">Real Estate Agent</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full h-11 font-semibold">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Scott
                </Button>
              </CardContent>
            </Card>

            {/* Interaction Feedback Summary */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Home Feedback</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Your property ratings help us refine the recommendations you see.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Heart className="h-4 w-4 text-rose-500" />
                      <span>Interested</span>
                    </div>
                    <Badge variant="secondary" className="bg-rose-50 text-rose-600 hover:bg-rose-100 border-none">{interestedCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <ThumbsDown className="h-4 w-4 text-slate-400" />
                      <span>Not interested</span>
                    </div>
                    <Badge variant="outline" className="text-slate-500">{notInterestedCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Minus className="h-4 w-4 text-slate-400" />
                      <span>Undecided</span>
                    </div>
                    <Badge variant="ghost" className="text-slate-500 bg-slate-50">{neutralCount}</Badge>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full text-sm h-9">
                  <Link href="/interested">Review feedback history</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Match Tuning Card */}
            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Match Calibration
                    </span>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-bold">84%</Badge>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 inset-shadow-sm">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: "84%" }} />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1">
                    Your profile completeness and consistent feedback powers a highly accurate match algorithm.
                  </p>
                </div>
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>
    </div>
  );
}
