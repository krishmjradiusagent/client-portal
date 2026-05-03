"use client";

import type { Dispatch, SetStateAction } from "react";
import { ChevronDown, Home, Heart, Search, Settings, UserRound, XCircle, LayoutGrid } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { RouteKey, SavedSearch } from "./mockData";

type Props = {
  activeRoute: RouteKey;
  setActiveRoute: (route: RouteKey) => void;
  expandedSidebarGroups: Record<string, boolean>;
  setExpandedSidebarGroups: Dispatch<SetStateAction<Record<string, boolean>>>;
  savedSearches: SavedSearch[];
  likedCount: number;
  dislikedCount: number;
};

const navGroups = [
  {
    key: "searches",
    label: "Searches",
    icon: Search,
    routes: [
      { key: "search", label: "Search" },
      { key: "matches", label: "My Matches" },
      { key: "my-searches", label: "My Home Search" }
    ]
  },
  {
    key: "leads",
    label: "Leads",
    icon: Heart,
    routes: [
      { key: "interested", label: "Interested" },
      { key: "not-interested", label: "Not Interested" }
    ]
  },
  {
    key: "account",
    label: "Account",
    icon: UserRound,
    routes: [
      { key: "profile", label: "My Profile" },
      { key: "settings", label: "Settings" }
    ]
  }
];

export function Sidebar({
  activeRoute,
  setActiveRoute,
  expandedSidebarGroups,
  setExpandedSidebarGroups,
  savedSearches,
  likedCount,
  dislikedCount
}: Props) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[220px] flex-col border-r border-slate-800 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-4 py-5">
        <div className="text-lg font-semibold tracking-tight">Radius CRM</div>
        <div className="mt-1 text-xs text-slate-400">Client portal prototype</div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Button
          variant="default"
          className="mb-4 w-full justify-start rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => setActiveRoute("search")}
        >
          <Home className="h-4 w-4" />
          Search
        </Button>

        {navGroups.map((group) => {
          const Icon = group.icon;
          const expanded = expandedSidebarGroups[group.key] ?? true;
          return (
            <div key={group.key} className="mb-3">
              <button
                className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                onClick={() => setExpandedSidebarGroups((prev) => ({ ...prev, [group.key]: !expanded }))}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {group.label}
                </span>
                <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
              </button>
              {expanded ? (
                <div className="mt-2 space-y-1 pl-2">
                  {group.routes.map((item) => {
                    const selected = activeRoute === item.key;
                    return (
                      <button
                        key={item.key}
                        className={[
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                          selected ? "bg-white text-slate-950" : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        ].join(" ")}
                        onClick={() => setActiveRoute(item.key as RouteKey)}
                      >
                        <span>{item.label}</span>
                        {item.key === "interested" ? (
                          <Badge variant={selected ? "default" : "muted"}>{likedCount}</Badge>
                        ) : item.key === "not-interested" ? (
                          <Badge variant={selected ? "default" : "muted"}>{dislikedCount}</Badge>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Saved searches</div>
          <div className="space-y-2">
            {savedSearches.slice(0, 3).map((search) => (
              <button
                key={search.id}
                className="flex w-full items-start justify-between rounded-xl bg-slate-950 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                onClick={() => setActiveRoute("my-searches")}
              >
                <div>
                  <div className="font-medium">{search.name}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{search.location}</div>
                </div>
                <LayoutGrid className="mt-0.5 h-4 w-4 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 p-3">
        <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-3 py-2 text-xs text-slate-300">
          <span>Client portal</span>
          <XCircle className="h-4 w-4 text-slate-500" />
        </div>
      </div>
    </aside>
  );
}
