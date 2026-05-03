"use client";

import { Heart, X, MapPin, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import type { Property } from "./mockData";

type Props = {
  property: Property;
  liked: boolean;
  disliked: boolean;
  onOpen: () => void;
  onLike: () => void;
  onDislike: () => void;
  route: string;
};

export function PropertyCard({ property, liked, disliked, onOpen, onLike, onDislike, route }: Props) {
  return (
    <Card className="overflow-hidden border-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <button className="block w-full text-left" onClick={onOpen}>
        <div className="relative h-40 w-full overflow-hidden">
          <img src={property.image} alt={property.address} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge variant="outline" className="bg-white/95 text-slate-700">
              {property.status}
            </Badge>
            <Badge variant="success" className="bg-emerald-50/95">
              Match {property.matchScore}/100
            </Badge>
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-xs font-medium text-white">
            {property.type}
          </div>
        </div>
      </button>
      <CardContent className="space-y-3 pt-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold text-slate-900">${property.price.toLocaleString()}</div>
              <div className="mt-0.5 text-sm text-slate-500">
                {property.beds} bd · {property.baths} ba · {property.sqft.toLocaleString()} sf
              </div>
            </div>
            <Badge variant="secondary">{route === "matches" ? "AI picked" : property.area}</Badge>
          </div>
          <div className="mt-1 flex items-start gap-1.5 text-sm text-slate-700">
            <MapPin className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
            <span>{property.address}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {property.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant={liked ? "success" : "default"}
            size="sm"
            className="flex-1"
            onClick={(event) => {
              event.stopPropagation();
              onLike();
            }}
          >
            <Heart className="h-4 w-4" />
            {liked ? "Interested" : "Like"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${disliked ? "border-red-300 bg-red-50 text-red-700" : "text-slate-700"}`}
            onClick={(event) => {
              event.stopPropagation();
              onDislike();
            }}
          >
            <X className="h-4 w-4" />
            {disliked ? "Not interested" : "Dislike"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-3"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
