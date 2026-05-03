"use client";

import * as React from "react";

type AvatarProps = {
  name: string;
  image?: string;
  className?: string;
};

export function Avatar({ name, image, className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={[
        "flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-sm font-semibold text-slate-700",
        className
      ].join(" ")}
    >
      {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : initials}
    </div>
  );
}
