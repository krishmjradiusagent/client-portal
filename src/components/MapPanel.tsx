"use client";

import { Layers3, MapPinned, Pencil, Map as MapIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Property } from "./mockData";
import { ControlPill } from "./ui/control-pill";

type Props = {
  properties: Property[];
  drawingMode: boolean;
  customBoundaryActive: boolean;
  selectedLocation: string;
  mapLayer: string;
  onToggleDrawingMode: () => void;
  onMarkerClick: (property: Property) => void;
  onMapClick: () => void;
  mode?: string;
  onSaveSearch?: (name: string, frequency: string, emailAlerts: boolean) => void;
  minPrice?: string;
  maxPrice?: string;
  moreFilters?: any;
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
  onToggleDrawingMode,
  onMarkerClick,
  onMapClick,
  mode,
  onSaveSearch,
  minPrice,
  maxPrice,
  moreFilters
}: Props) {
  return (
    <div className="relative h-full flex-1 overflow-hidden bg-slate-100 font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/map-screenshot.png")' }}
        onClick={onMapClick}
      >
        {/* Map Overlay Controls */}
        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
          <ControlPill 
            icon={<MapPinned className="h-4 w-4" />}
            label="All areas"
          />
          <ControlPill 
            icon={<Layers3 className="h-4 w-4" />}
            label="Standard"
          />
          <ControlPill 
            icon={<Pencil className="h-4 w-4" />}
            label={drawingMode ? "Stop drawing" : "Draw"}
            active={drawingMode}
            onClick={() => onToggleDrawingMode()}
          />


        </div>

        {customBoundaryActive && !drawingMode && (
          <div className="absolute left-[18%] top-[18%] h-[46%] w-[38%] rounded-[36px] border-2 border-dashed border-slate-400 bg-slate-900/5 shadow-[0_0_0_9999px_rgba(15,23,42,0.06)] pointer-events-none" />
        )}



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
              <div className="rounded-full border border-white bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg transition group-hover:scale-105">
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
