"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { PropertyProvider } from "@/components/PropertyContext"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PropertyProvider>
      <div className="dark h-screen overflow-hidden bg-background text-foreground">
      <SidebarProvider
        defaultOpen
        style={
          {
            "--sidebar-width": "16rem",
            "--sidebar-width-mobile": "18rem",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="overflow-hidden">

          <main className="flex h-full flex-col">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
    </PropertyProvider>
  )
}
