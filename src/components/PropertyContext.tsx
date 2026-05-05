"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { properties as initialProperties, initialSavedSearches, type Property, type PropertyStatus, type SavedSearch } from "./mockData";

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
