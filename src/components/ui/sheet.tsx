"use client";

import * as React from "react";

type ShellProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export function Sheet({ open, onOpenChange, children }: ShellProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/55" onClick={() => onOpenChange?.(false)}>
      <div className="absolute right-0 top-0 h-full w-full max-w-lg" onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function SheetContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["h-full bg-white shadow-2xl", className].join(" ")} {...props} />;
}
