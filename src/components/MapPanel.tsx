"use client";

import { Layers3, MapPinned, Crosshair } from "lucide-react";
import { Badge } from "./ui/badge";
import type { Property } from "./mockData";

type Props = {
  properties: Property[];
  drawingMode: boolean;
  customBoundaryActive: boolean;
  selectedLocation: string;
  mapLayer: string;
  onMarkerClick: (property: Property) => void;
  onMapClick: () => void;
};

const layerLabels: Record<string, string> = {
  standard: "Standard",
  satellite: "Satellite",
  traffic: "Traffic",
  schools: "Schools"
};

export function MapPanel({
  properties,
  drawingMode,
  customBoundaryActive,
  selectedLocation,
  mapLayer,
  onMarkerClick,
  onMapClick
}: Props) {
  return (
    <div className="relative min-h-[calc(100vh-72px)] flex-1 overflow-hidden bg-slate-100">
      <div
        className={[
          "absolute inset-0",
          mapLayer === "satellite"
            ? "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_25%),linear-gradient(135deg,#1f2937_0%,#334155_45%,#0f172a_100%)]"
            : mapLayer === "traffic"
            ? "bg-[linear-gradient(135deg,#e2e8f0_0%,#cbd5e1_100%)]"
            : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_30%),linear-gradient(135deg,#eef2ff_0%,#dbeafe_45%,#e2e8f0_100%)]"
        ].join(" ")}
        onClick={onMapClick}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

        <div className="absolute left-5 top-5 flex gap-2">
          <Badge variant="outline" className="bg-white/90">
            <MapPinned className="mr-1 h-3.5 w-3.5" />
            {selectedLocation}
          </Badge>
          <Badge variant="secondary" className="bg-slate-950/80 text-white border-slate-900">
            <Layers3 className="mr-1 h-3.5 w-3.5" />
            {layerLabels[mapLayer]}
          </Badge>
          {drawingMode ? (
            <Badge variant="success" className="bg-emerald-600 text-white border-emerald-600">
              <Crosshair className="mr-1 h-3.5 w-3.5" />
              Drawing mode
            </Badge>
          ) : null}
        </div>

        {customBoundaryActive ? (
          <div className="absolute left-[18%] top-[18%] h-[46%] w-[38%] rounded-[36px] border-2 border-dashed border-blue-500 bg-blue-500/10 shadow-[0_0_0_9999px_rgba(15,23,42,0.06)]" />
        ) : null}

        <div className="absolute right-6 top-5 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Map layer</div>
          <div className="mt-1 text-sm font-semibold text-slate-900">{layerLabels[mapLayer]}</div>
          <div className="mt-1 text-xs text-slate-500">Tap map while drawing to set a boundary.</div>
        </div>

        {properties.map((property) => (
          <button
            key={property.id}
            className="group absolute"
            style={{ top: property.markerTop, left: property.markerLeft }}
            onClick={(event) => {
              event.stopPropagation();
              onMarkerClick(property);
            }}
          >
            <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="rounded-full border border-white bg-slate-950 px-3 py-1 text-xs font-semibold text-white shadow-lg transition group-hover:scale-105">
                ${Math.round(property.price / 1000)}K
              </div>
              <div className="mt-1 h-2 w-2 rounded-full bg-white shadow-sm" />
            </div>
          </button>
        ))}

        <div className="absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/85 p-4 shadow-xl backdrop-blur">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Search state</div>
          <div className="mt-1 text-sm font-semibold text-slate-900">Custom boundary map</div>
          <div className="mt-1 text-xs text-slate-500">{customBoundaryActive ? "Boundary active" : "No boundary set"}</div>
        </div>
      </div>
    </div>
  );
}
