"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { properties as initialProperties, initialSavedSearches, type Property, type PropertyStatus, type SavedSearch, type Message } from "./mockData";

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
  sendMessage: (content: string) => void;
  recentlyViewedIds: string[];
  profileData: { name: string; email: string; phone: string; contactMethod: string };
  updateProfileData: (data: Partial<{ name: string; email: string; phone: string; contactMethod: string }>) => void;
  commutes: { id: string; address: string; type: string }[];
  addCommute: (commute: { address: string; type: string }) => void;
  removeCommute: (id: string) => void;
  interestedCount: number;
  notInterestedCount: number;
  recentlyViewedCount: number;
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(initialSavedSearches);
  const [selectedSavedSearchId, setSelectedSavedSearchId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [profileData, setProfileData] = useState({
    name: "Michael Loft",
    email: "michael@example.com",
    phone: "(512) 555-0148",
    contactMethod: "email",
  });
  const [commutes, setCommutes] = useState<{ id: string; address: string; type: string }[]>([]);

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
  }, []);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isIncoming: false,
      status: "Delivered",
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const updateProfileData = useCallback((data: Partial<typeof profileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  }, []);

  const addCommute = useCallback((commute: { address: string; type: string }) => {
    setCommutes((prev) => [...prev, { id: Date.now().toString(), ...commute }]);
  }, []);

  const removeCommute = useCallback((id: string) => {
    setCommutes((prev) => prev.filter((c) => c.id !== id));
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
        properties,
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
        recentlyViewedIds,
        profileData,
        updateProfileData,
        commutes,
        addCommute,
        removeCommute,
        interestedCount: counts.interested,
        notInterestedCount: counts.notInterested,
        recentlyViewedCount: counts.visited,
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
