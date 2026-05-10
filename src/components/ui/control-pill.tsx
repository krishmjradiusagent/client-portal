import * as React from "react"
import { cn } from "@/lib/utils"

export type ControlPillProps = {
  icon?: React.ReactNode
  label: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const ControlPill = React.forwardRef<HTMLButtonElement, ControlPillProps>(
  ({ icon, label, active, disabled, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-3 text-sm font-medium shadow-sm transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 lg:h-9",
          "border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
          active && "border-slate-900/30 bg-slate-900/10 text-slate-900 hover:bg-slate-900/15",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {icon && <span className="h-4 w-4 shrink-0 flex items-center justify-center">{icon}</span>}
        <span>{label}</span>
      </button>
    )
  }
)
ControlPill.displayName = "ControlPill"
