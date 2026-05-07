"use client";
import React from "react";

import { useSearchParams } from "next/navigation";
import { usePropertyContext } from "./PropertyContext";
import { HomeValueLandingPage } from "./HomeValueLandingPage";
import { HomeValueDetailPage } from "./HomeValueDetailPage";
import { HomeValueSummaryPage } from "./HomeValueSummaryPage";

export function HomeValuePage() {
  const { homeValueListings, activeHomeValueId, setActiveHomeValueId } = usePropertyContext();
  const searchParams = useSearchParams();
  const isAdding = searchParams.get("add") === "true";
  const urlId = searchParams.get("id");

  // Sync URL ID to Context if provided and different
  React.useEffect(() => {
    if (urlId && urlId !== activeHomeValueId) {
      setActiveHomeValueId(urlId);
    }
  }, [urlId, activeHomeValueId, setActiveHomeValueId]);

  if (homeValueListings.length === 0 || isAdding) {
    return <HomeValueLandingPage />;
  }

  // If we have multiple homes and no specific ID in the URL, show the summary dashboard
  if (homeValueListings.length > 1 && !urlId) {
    return <HomeValueSummaryPage />;
  }

  return <HomeValueDetailPage />;
}
