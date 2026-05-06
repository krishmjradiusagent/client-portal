"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { usePropertyContext } from "./PropertyContext";
import { XCard } from "./ui/x-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThumbsUp, ThumbsDown, Minus, Trash2, Mail, Phone, MessageCircle, Building2, UserRound } from "lucide-react";
import { AddressAutocomplete } from "./ui/address-autocomplete";

export function ProfilePage() {
  const { 
    interestedCount, 
    notInterestedCount, 
    properties,
    profileData,
    updateProfileData,
    commutes,
    addCommute,
    removeCommute
  } = usePropertyContext();

  const neutralCount = properties.filter(p => p.status === "search").length;

  const [parkPreference, setParkPreference] = useState<"like" | "dislike" | "neutral" | null>(null);

  const [commuteAddress, setCommuteAddress] = useState("");
  const [commuteType, setCommuteType] = useState("drive");
  const [commuteError, setCommuteError] = useState("");

  const handleAddCommute = () => {
    if (!commuteAddress.trim()) {
      setCommuteError("Enter an address first.");
      return;
    }
    setCommuteError("");
    addCommute({ address: commuteAddress, type: commuteType });
    setCommuteAddress("");
  };

  const handleRemoveCommute = (id: string) => {
    removeCommute(id);
  };

  return (
    <div className="bg-background px-6 py-6">
      <div className="w-full max-w-none space-y-8 pb-24">
        <div className="w-full">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your search preferences, commute settings, and portal details.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
          {/* Left column */}
          <div className="min-w-0 space-y-6">
            {/* 1. Contact details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={profileData.name} onChange={(e) => updateProfileData({ name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profileData.email} onChange={(e) => updateProfileData({ email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={profileData.phone} onChange={(e) => updateProfileData({ phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Preferred contact method</Label>
                  <ToggleGroup
                    type="single"
                    value={profileData.contactMethod}
                    onValueChange={(val) => {
                      if (val) updateProfileData({ contactMethod: val });
                    }}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="email" aria-label="Email">Email</ToggleGroupItem>
                    <ToggleGroupItem value="text" aria-label="Text">Text</ToggleGroupItem>
                    <ToggleGroupItem value="phone" aria-label="Phone">Phone</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>

            {/* 2. Search preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Search preferences</CardTitle>
                <CardDescription>Tell us what matters. Your feedback helps tune future matches.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center bg-muted/30">
                  <div className="space-y-1">
                    <p className="font-medium">Near parks</p>
                    <p className="text-sm text-muted-foreground">Homes close to parks, trails, or green space.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={parkPreference === "like" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setParkPreference("like")}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Like
                    </Button>
                    <Button
                      variant={parkPreference === "neutral" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setParkPreference("neutral")}
                    >
                      <Minus className="mr-2 h-4 w-4" />
                      Neutral
                    </Button>
                    <Button
                      variant={parkPreference === "dislike" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setParkPreference("dislike")}
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Dislike
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Commutes */}
            <Card>
              <CardHeader>
                <CardTitle>Commutes</CardTitle>
                <CardDescription>Add locations that matter so listings can show realistic commute context.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md bg-muted p-4 text-sm">
                  Add a location to calculate commute time from any listing.
                </div>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="commute-address" className="sr-only">Address</Label>
                    <AddressAutocomplete
                      value={commuteAddress}
                      onChange={(val) => {
                        setCommuteAddress(val);
                        if (commuteError) setCommuteError("");
                      }}
                      placeholder="Work, school, gym, or custom address"
                    />
                    {commuteError && <p className="text-sm text-destructive">{commuteError}</p>}
                  </div>
                  <div className="w-full sm:w-40">
                    <Select value={commuteType} onValueChange={setCommuteType}>
                      <SelectTrigger aria-label="Commute type">
                        <SelectTrigger aria-label="Commute type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drive">Drive</SelectItem>
                        <SelectItem value="walk">Walk</SelectItem>
                        <SelectItem value="transit">Transit</SelectItem>
                        <SelectItem value="bike">Bike</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddCommute} className="w-full sm:w-auto">Add commute</Button>
                </div>

                {commutes.length > 0 && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="space-y-3">
                      {commutes.map((commute) => (
                        <div key={commute.id} className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{commute.address}</span>
                            <Badge variant="secondary" className="capitalize">{commute.type}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveCommute(commute.id)}
                            aria-label="Remove commute"
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column / Rail */}
          <aside className="min-w-0 space-y-6 xl:sticky xl:top-6 self-start">
            {/* 5. Your agent */}
            <XCard className="profile-agent-xcard border-none bg-transparent p-0 shadow-none">
              <div className="rounded-2xl border bg-card shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="profile-agent-xcard__header relative overflow-hidden rounded-t-2xl bg-gradient-to-b from-primary/5 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="profile-agent-xcard__avatar h-14 w-14 border-2 border-background shadow-sm">
                      <AvatarImage src="" alt="Scott Kato" />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">SK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xl tracking-tight">Scott Kato</h3>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none text-[10px] h-4 px-1.5 uppercase tracking-tighter">Your Agent</Badge>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Building2 className="h-3 w-3" />
                        Circle Real Estate
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-0 space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" className="profile-agent-xcard__action w-full gap-2 bg-background/50 hover:bg-primary/5 hover:text-primary border-primary/10 transition-colors">
                      <Mail className="h-3.5 w-3.5" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="profile-agent-xcard__action w-full gap-2 bg-background/50 hover:bg-primary/5 hover:text-primary border-primary/10 transition-colors">
                      <Phone className="h-3.5 w-3.5" />
                      Phone
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                      <div className="p-1.5 rounded-md bg-muted/50">
                        <Phone className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-medium tracking-tight">(512) 555-0182</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                      <div className="p-1.5 rounded-md bg-muted/50">
                        <UserRound className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-medium tracking-tight">Real Estate Agent</span>
                    </div>
                  </div>
                  
                  <Button className="w-full h-11 font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Scott
                  </Button>
                </div>
              </div>
            </XCard>

            {/* 4. Home feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Home feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Interested homes</span>
                    <Badge variant="secondary">{interestedCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Not interested</span>
                    <Badge variant="outline">{notInterestedCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Neutral</span>
                    <Badge variant="ghost">{neutralCount}</Badge>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/interested">View home feedback</Link>
                </Button>
              </CardContent>
            </Card>

            {/* 6. Match tuning */}
            <Card>
              <CardHeader>
                <CardTitle>Match tuning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your likes, dislikes, and commute locations help refine which homes appear first.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Parks</Badge>
                  <Badge variant="secondary">Commute</Badge>
                  <Badge variant="secondary">Saved searches</Badge>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
