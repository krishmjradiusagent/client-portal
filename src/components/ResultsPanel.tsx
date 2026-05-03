"use client";

import { ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { PropertyCard } from "./PropertyCard";
import type { Property, RouteKey, SavedSearch } from "./mockData";

type Props = {
  route: RouteKey;
  properties: Property[];
  likedIds: string[];
  dislikedIds: string[];
  savedSearches: SavedSearch[];
  onOpenProperty: (property: Property) => void;
  onLike: (property: Property) => void;
  onDislike: (property: Property) => void;
  onEditSearch: () => void;
  onRunSavedSearch: (location: string) => void;
  onDeleteSavedSearch: (id: string) => void;
};

function sectionCopy(route: RouteKey, count: number) {
  switch (route) {
    case "matches":
      return { title: "My Matches", description: "MEL scores sorted high to low.", countLabel: `${count} matches` };
    case "interested":
      return { title: "Interested", description: "Saved into shared Radius CRM state.", countLabel: `${count} homes` };
    case "not-interested":
      return { title: "Not Interested", description: "Hidden from match recommendations.", countLabel: `${count} homes` };
    case "my-searches":
      return { title: "My Home Search", description: "Unlimited saved searches under Radius CRM.", countLabel: `${count} searches` };
    default:
      return { title: "Search", description: "Browse live inventory and match scores.", countLabel: `${count} homes` };
  }
}

export function ResultsPanel({
  route,
  properties,
  likedIds,
  dislikedIds,
  savedSearches,
  onOpenProperty,
  onLike,
  onDislike,
  onEditSearch,
  onRunSavedSearch,
  onDeleteSavedSearch
}: Props) {
  const copy = sectionCopy(route, properties.length);

  if (route === "my-searches") {
    return (
      <div className="w-[580px] shrink-0 border-r border-slate-200 bg-slate-50">
        <div className="border-b border-slate-200 bg-white px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold text-slate-900">{copy.title}</div>
              <div className="mt-1 text-sm text-slate-500">{copy.description}</div>
            </div>
            <Badge variant="default">{copy.countLabel}</Badge>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <Button className="w-full justify-center" onClick={onEditSearch}>
            Create saved search
          </Button>
          {savedSearches.map((search) => (
            <Card key={search.id} className="border-slate-200">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{search.name}</CardTitle>
                    <CardDescription className="mt-1">{search.location}</CardDescription>
                  </div>
                  <Badge variant="success">{search.frequency}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-slate-600">{search.criteria}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">Updated {search.updatedAt}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onRunSavedSearch(search.location)}>
                      Run
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onEditSearch}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDeleteSavedSearch(search.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[580px] shrink-0 border-r border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-slate-900">{copy.title}</div>
            <div className="mt-1 text-sm text-slate-500">{copy.description}</div>
          </div>
          <Badge variant="default">{copy.countLabel}</Badge>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="grid grid-cols-2 gap-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              route={route}
              liked={likedIds.includes(property.id)}
              disliked={dislikedIds.includes(property.id)}
              onOpen={() => onOpenProperty(property)}
              onLike={() => onLike(property)}
              onDislike={() => onDislike(property)}
            />
          ))}
        </div>
        {properties.length === 0 ? (
          <Card className="border-dashed border-slate-300 bg-white">
            <CardContent className="py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <ChevronRight className="h-5 w-5" />
              </div>
              <div className="mt-3 text-sm font-medium text-slate-900">No homes here</div>
              <div className="mt-1 text-sm text-slate-500">Adjust filters or save a new search.</div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
