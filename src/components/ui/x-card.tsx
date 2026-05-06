"use client"

import { type ReactNode } from "react"
import { Tweet } from "react-tweet"

import { cn } from "@/lib/utils"

type XCardSize = "sm" | "small" | "default" | "lg" | "large"

interface XCardProps {
  id: string
  caption?: ReactNode
  children?: ReactNode
  className?: string
  size?: XCardSize
}

function normalizeSize(size: XCardSize): "small" | "default" | "large" {
  if (size === "sm") return "small"
  if (size === "lg") return "large"
  return size as "small" | "default" | "large"
}

export function XCard({
  id,
  caption,
  children,
  className,
  size = "default",
}: XCardProps) {
  const normalizedSize = normalizeSize(size)

  const sizeClasses = {
    small: "max-w-sm scale-90",
    default: "max-w-xl",
    large: "max-w-2xl scale-110",
  }

  return (
    <div className={cn("x-card overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm", sizeClasses[normalizedSize], className)}>
      {id ? (
        <div className="flex justify-center p-4">
          <Tweet id={id} />
        </div>
      ) : (
        <div className="p-0">
          {children}
        </div>
      )}
      {caption && (
        <div className="text-muted-foreground mt-2 px-4 pb-4 text-center text-sm">
          {caption}
        </div>
      )}
      <style jsx>{`
        .x-card {
          --tweet-container-margin: 0;
          --tweet-font-family: inherit;
          --tweet-font-color: hsl(var(--foreground));
          --tweet-bg-color: transparent;
          --tweet-bg-color-hover: transparent;
          --tweet-border: none;
        }
      `}</style>
    </div>
  )
}
