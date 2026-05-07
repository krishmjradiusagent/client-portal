"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { PropertyProvider } from "@/components/PropertyContext"
import { AuthProvider } from "@/lib/auth"
import { AuthModal } from "@/components/auth/AuthModal"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Routes that should have a fixed, non-scrolling viewport layout (Search, Map, Messages)
  const isFixedLayout = !["/home-value", "/profile", "/settings"].some(path => 
    pathname === path || pathname.startsWith(path + "/") || pathname.startsWith(path + "?")
  )

  return (
    <AuthProvider>
      <PropertyProvider>
        <div className={cn(
          "dark bg-background text-foreground transition-all duration-300",
          isFixedLayout ? "h-[100dvh] overflow-hidden" : "min-h-screen"
        )}>
          <SidebarProvider
            defaultOpen
            className={cn(isFixedLayout && "h-full")}
            style={
              {
                "--sidebar-width": "16rem",
                "--sidebar-width-mobile": "18rem",
              } as React.CSSProperties
            }
          >
            <AppSidebar />
            <SidebarInset className={cn(
              "min-h-0",
              isFixedLayout ? "h-full" : "overflow-visible"
            )}>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </div>
        {/* Auth modal renders at root level, portaled by Dialog */}
        <AuthModal />
      </PropertyProvider>
    </AuthProvider>
  )
}
