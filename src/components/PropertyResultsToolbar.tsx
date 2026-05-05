"use client";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "./ui/dropdown-menu";
import { ControlPill } from "./ui/control-pill";
import { sortOptions } from "./mockData";

type Props = {
  visibleCount: number;
  totalCount: number;
  sortValue: string;
  onSortChange: (val: string) => void;
};

export function PropertyResultsToolbar({
  visibleCount,
  totalCount,
  sortValue,
  onSortChange
}: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-200">
      <div className="text-sm text-slate-500 font-medium">
        Showing <span className="text-slate-900 font-semibold">{visibleCount}</span> of <span className="text-slate-900 font-semibold">{totalCount}</span> listings
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ControlPill 
              label={sortOptions.find(opt => opt.value === sortValue)?.label || "Sort by"} 
              active 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortValue} onValueChange={onSortChange}>
              {sortOptions.map((opt) => (
                <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                  {opt.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
