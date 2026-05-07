"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { properties as initialProperties, initialSavedSearches, initialHomeValueListings, type Property, type PropertyStatus, type SavedSearch, type Message, type HomeValueListing } from "./mockData";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hi! I saw the listing for the property on Oak Street. Is it still available?",
    time: "10:32 AM",
    isIncoming: true,
  },
  {
    id: "2",
    content: "Yes, it is! Would you like to schedule a viewing?",
    time: "10:35 AM",
    isIncoming: false,
    status: "Delivered",
  },
  {
    id: "3",
    content: "That would be great! I'm available this weekend.",
    time: "10:36 AM",
    isIncoming: true,
  },
  {
    id: "4",
    content: "Perfect! How about Saturday at 2 PM?",
    time: "10:38 AM",
    isIncoming: false,
    status: "Delivered",
  },
  {
    id: "5",
    content: "Can you send me the property details?",
    time: "12:25 PM",
    isIncoming: true,
  },
];

export type MoreFiltersState = {
  maxHoa: string
  listingType: {
    ownerPosted: boolean
    agentListed: boolean
    newConstruction: boolean
    foreclosures: boolean
    auctions: boolean
  }
  listingStatus: {
    comingSoon: boolean
    acceptingBackupOffers: boolean
    pendingUnderContract: boolean
  }
  tours: {
    openHouse: boolean
    threeDTour: boolean
    showcase: boolean
  }
  parkingSpots: string
  garage: boolean
  squareFeetMin: string
  squareFeetMax: string
  lotSizeMin: string
  lotSizeMax: string
  yearBuiltMin: string
  yearBuiltMax: string
  basement: boolean
  singleStoryOnly: boolean
  communities55: "include" | "dont_show" | "only_show"
  amenities: {
    ac: boolean
    pool: boolean
    waterfront: boolean
  }
  view: {
    city: boolean
    mountain: boolean
    park: boolean
    water: boolean
  }
  commuteAddress: string
  commuteFiltersOpen: boolean
  commuteTime: string
  commuteMode: "drive" | "walk" | "transit" | "bike"
  daysOnMarket: string
  keywords: string
  propertyType: string
  beds: string
  baths: string
  matchScore: string
}

export const defaultMoreFilters: MoreFiltersState = {
  maxHoa: "Any",
  listingType: {
    ownerPosted: true,
    agentListed: true,
    newConstruction: true,
    foreclosures: true,
    auctions: true,
  },
  listingStatus: {
    comingSoon: true,
    acceptingBackupOffers: false,
    pendingUnderContract: false,
  },
  tours: {
    openHouse: false,
    threeDTour: false,
    showcase: false,
  },
  parkingSpots: "Any",
  garage: false,
  squareFeetMin: "No Min",
  squareFeetMax: "No Max",
  lotSizeMin: "No Min",
  lotSizeMax: "No Max",
  yearBuiltMin: "",
  yearBuiltMax: "",
  basement: false,
  singleStoryOnly: false,
  communities55: "include",
  amenities: {
    ac: false,
    pool: false,
    waterfront: false,
  },
  view: {
    city: false,
    mountain: false,
    park: false,
    water: false,
  },
  commuteAddress: "",
  commuteFiltersOpen: false,
  commuteTime: "Any",
  commuteMode: "drive",
  daysOnMarket: "Any",
  keywords: "",
  propertyType: "Any",
  beds: "Any",
  baths: "Any",
  matchScore: "Any",
}

type PropertyContextType = {
  properties: Property[];
  visitedIds: Set<string>;
  savedSearches: SavedSearch[];
  selectedSavedSearchId: string | null;
  toggleInterested: (propertyId: string) => void;
  toggleNotInterested: (propertyId: string) => void;
  markVisited: (propertyId: string) => void;
  addSavedSearch: (search: SavedSearch) => void;
  deleteSavedSearch: (id: string) => void;
  updateSavedSearch: (search: SavedSearch) => void;
  setSelectedSavedSearchId: (id: string | null) => void;
  messages: Message[];
  sendMessage: (content: string, propertyId?: string) => void;
  propertyActivity: Record<string, { type: string; user: string; time: string }[]>;
  addPropertyActivity: (propertyId: string, activity: { type: string; user: string }) => void;
  recentlyViewedIds: string[];
  profileData: { 
    name: string; 
    email: string; 
    phone: string; 
    contactMethod: string; 
    commuteAddress: string;
    commuteMode: "drive" | "walk" | "transit" | "bike";
    maxCommuteTime: string;
  };
  updateProfileData: (data: Partial<{ 
    name: string; 
    email: string; 
    phone: string; 
    contactMethod: string; 
    commuteAddress: string;
    commuteMode: "drive" | "walk" | "transit" | "bike";
    maxCommuteTime: string;
  }>) => void;
  interestedCount: number;
  notInterestedCount: number;
  recentlyViewedCount: number;
  homeValueListings: HomeValueListing[];
  addHomeValueListing: (listing: HomeValueListing) => void;
  removeHomeValueListing: (id: string) => void;
  updateHomeValueListing: (id: string, updates: Partial<HomeValueListing>) => void;
  activeHomeValueId: string | null;
  setActiveHomeValueId: (id: string | null) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  moreFilters: MoreFiltersState;
  setMoreFilters: (filters: MoreFiltersState) => void;
  selectedCompIds: string[];
  toggleCompSelection: (id: string) => void;
  clearCompSelection: () => void;
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(initialSavedSearches);
  const [selectedSavedSearchId, setSelectedSavedSearchId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [propertyActivity, setPropertyActivity] = useState<Record<string, { type: string; user: string; time: string }[]>>({});
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [profileData, setProfileData] = useState({
    name: "Michael Loft",
    email: "michael@example.com",
    phone: "(512) 555-0148",
    contactMethod: "email",
    commuteAddress: "782 Park Avenue, New York, NY",
    commuteMode: "drive" as const,
    maxCommuteTime: "30",
  });
  const [homeValueListings, setHomeValueListings] = useState<HomeValueListing[]>(initialHomeValueListings);
  const [activeHomeValueId, setActiveHomeValueId] = useState<string | null>(initialHomeValueListings[0]?.id || null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [moreFilters, setMoreFilters] = useState<MoreFiltersState>(defaultMoreFilters);
  const toggleInterested = useCallback((propertyId: string) => {
    setProperties((current) =>
      current.map((p) => {
        if (p.id !== propertyId) return p;
        const newStatus: PropertyStatus = p.status === "interested" ? "search" : "interested";
        return { ...p, status: newStatus };
      })
    );
  }, []);

  const toggleNotInterested = useCallback((propertyId: string) => {
    setProperties((current) =>
      current.map((p) => {
        if (p.id !== propertyId) return p;
        const newStatus: PropertyStatus = p.status === "notInterested" ? "search" : "notInterested";
        return { ...p, status: newStatus };
      })
    );
  }, []);

  const addPropertyActivity = useCallback((propertyId: string, activity: { type: string; user: string }) => {
    setPropertyActivity((prev) => {
      const current = prev[propertyId] || [];
      const newActivity = {
        ...activity,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      return { ...prev, [propertyId]: [newActivity, ...current] };
    });
  }, []);

  const markVisited = useCallback((propertyId: string) => {
    setVisitedIds((current) => {
      const next = new Set(current);
      next.add(propertyId);
      return next;
    });
    setRecentlyViewedIds((current) => {
      const filtered = current.filter(id => id !== propertyId);
      return [propertyId, ...filtered].slice(0, 20); // Keep last 20
    });
    addPropertyActivity(propertyId, { type: "Viewed", user: "You" });
  }, [addPropertyActivity]);

  const sendMessage = useCallback((content: string, propertyId?: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      time,
      isIncoming: false,
      status: "Delivered",
    };
    setMessages((prev) => [...prev, newMessage]);
    
    if (propertyId) {
      addPropertyActivity(propertyId, { type: "Message sent", user: "You" });
    }
  }, [addPropertyActivity]);

  const updateProfileData = useCallback((data: Partial<typeof profileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  }, []);
  
  const addHomeValueListing = useCallback((listing: HomeValueListing) => {
    setHomeValueListings((prev) => [listing, ...prev]);
    setActiveHomeValueId(listing.id);
  }, []);

  const removeHomeValueListing = useCallback((id: string) => {
    setHomeValueListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateHomeValueListing = useCallback((id: string, updates: Partial<HomeValueListing>) => {
    setHomeValueListings((prev) => prev.map((l) => l.id === id ? { ...l, ...updates } : l));
  }, []);

  const addSavedSearch = useCallback((search: SavedSearch) => {
    setSavedSearches((current) => [search, ...current]);
    setSelectedSavedSearchId(search.id);
  }, []);

  const updateSavedSearch = useCallback((updated: SavedSearch) => {
    setSavedSearches((current) => current.map(s => s.id === updated.id ? updated : s));
  }, []);

  const deleteSavedSearch = useCallback((id: string) => {
    setSavedSearches((current) => current.filter((s) => s.id !== id));
    if (selectedSavedSearchId === id) {
      setSelectedSavedSearchId(null);
    }
  }, [selectedSavedSearchId]);

  const [selectedCompIds, setSelectedCompIds] = useState<string[]>([]);

  // Load selected comps from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("radius_selected_comps");
    if (saved) {
      try {
        setSelectedCompIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved comps", e);
      }
    }
  }, []);

  // Sync selected comps to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("radius_selected_comps", JSON.stringify(selectedCompIds));
  }, [selectedCompIds]);

  const toggleCompSelection = useCallback((id: string) => {
    setSelectedCompIds((prev) =>
      prev.includes(id)
        ? prev.filter((a) => a !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  }, []);

  const clearCompSelection = useCallback(() => {
    setSelectedCompIds([]);
  }, []);

  const scoredProperties = useMemo(() => {
    return properties.map(property => {
      let score = property.matchScore;
      
      // Only adjust if commute address is set
      if (profileData.commuteAddress) {
        // Simulate distance based on marker positions (0-100 scale)
        // Let's assume a "work" location at 50, 50 for simulation
        const workX = 50;
        const workY = 50;
        const propX = parseFloat(property.markerLeft);
        const propY = parseFloat(property.markerTop);
        
        const dist = Math.sqrt(Math.pow(propX - workX, 2) + Math.pow(propY - workY, 2));
        
        // Simulating commute time: dist * 2 minutes
        const commuteMinutes = Math.round(dist * 1.5);
        const maxTime = parseInt(profileData.maxCommuteTime) || 30;
        
        if (commuteMinutes <= maxTime) {
          score += 5; // Bonus for being within max commute
        } else {
          score -= Math.min(10, Math.floor((commuteMinutes - maxTime) / 5)); // Penalty for being over
        }
        
        // Mode preference bonus
        if (profileData.commuteMode === "walk" && property.tags.includes("Walkable")) {
          score += 3;
        }
        if (profileData.commuteMode === "drive" && property.tags.includes("EV ready")) {
          score += 2;
        }
      }
      
      return { ...property, matchScore: Math.min(100, Math.max(0, score)) };
    });
  }, [properties, profileData.commuteAddress, profileData.commuteMode, profileData.maxCommuteTime]);

  const counts = useMemo(() => {
    return {
      interested: properties.filter((p) => p.status === "interested").length,
      notInterested: properties.filter((p) => p.status === "notInterested").length,
      visited: visitedIds.size,
    };
  }, [properties, visitedIds]);

  return (
    <PropertyContext.Provider
      value={{
        properties: scoredProperties,
        visitedIds,
        savedSearches,
        selectedSavedSearchId,
        toggleInterested,
        toggleNotInterested,
        markVisited,
        addSavedSearch,
        deleteSavedSearch,
        updateSavedSearch,
        setSelectedSavedSearchId,
        messages,
        sendMessage,
        propertyActivity,
        addPropertyActivity,
        recentlyViewedIds,
        profileData,
        updateProfileData,
        interestedCount: counts.interested,
        notInterestedCount: counts.notInterested,
        recentlyViewedCount: counts.visited,
        homeValueListings,
        addHomeValueListing,
        removeHomeValueListing,
        updateHomeValueListing,
        activeHomeValueId,
        setActiveHomeValueId,
        selectedPropertyId,
        setSelectedPropertyId,
        moreFilters,
        setMoreFilters,
        selectedCompIds,
        toggleCompSelection,
        clearCompSelection,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("usePropertyContext must be used within a PropertyProvider");
  }
  return context;
}
