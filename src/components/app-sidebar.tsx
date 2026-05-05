"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  ChevronsUpDown,
  LogOut,
  MessageSquare,
  Search,
  Settings2,
  Sparkles,
  User,
  LayoutGrid,
  Heart,
  X,
  History,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import { AuroraBars } from "@/components/ui/aurora-bars"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const transition: Transition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const searchesGroup = {
  label: "SEARCHES",
  items: [
    { title: "Search", url: "/search", icon: Search },
    { title: "My Matches", url: "/matches", icon: Sparkles },
    { title: "My Searches", url: "/my-searches", icon: LayoutGrid },
  ],
} as const

const engagementGroup = {
  label: "ENGAGEMENT",
  items: [
    { title: "Interested", url: "/interested", icon: Heart, badge: "0" },
    { title: "Not Interested", url: "/not-interested", icon: X, badge: "0" },
    { title: "Recently Viewed", url: "/recently-viewed", icon: History },
  ],
} as const

const accountGroup = {
  label: "ACCOUNT",
  items: [
    { title: "My Profile", url: "/profile", icon: User },
    { title: "Settings", url: "/settings", icon: Settings2 },
    { title: "Logout", url: "/logout", icon: LogOut },
  ],
} as const



import { usePropertyContext } from "./PropertyContext"

function isActive(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const { 
    interestedCount, 
    notInterestedCount, 
    recentlyViewedCount,
    savedSearches,
    selectedSavedSearchId,
    setSelectedSavedSearchId
  } = usePropertyContext()
  const isCollapsed = state === "collapsed"

  const engagementItems = [
    { title: "Interested", url: "/interested", icon: Heart, badge: interestedCount.toString() },
    { title: "Not Interested", url: "/not-interested", icon: X, badge: notInterestedCount.toString() },
    { title: "Recently Viewed", url: "/recently-viewed", icon: History, badge: recentlyViewedCount.toString() },
  ]

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className={cn("transition-all duration-300", isCollapsed ? "p-1.5" : "p-4 pb-2")}>
        <Card className={cn(
          "relative overflow-hidden border-none transition-all duration-300",
          isCollapsed 
            ? "bg-transparent p-0 mb-0 aspect-square flex items-center justify-center" 
            : "bg-zinc-800/50 backdrop-blur-md rounded-2xl p-4 mb-3"
        )}>
          {/* Base Overlay for readability */}
          {!isCollapsed && <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm z-0" />}

          {/* Background Animation Layer */}
          {!isCollapsed && (
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
              <AuroraBars 
                barCount={14} 
                colors={["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "transparent"]}
                speed={3}
                blur={15}
              />
            </div>
          )}

          {/* Content Layer */}
          <div className={cn(
            "relative z-10 flex flex-col items-center text-center transition-all duration-300",
            isCollapsed ? "gap-0" : "gap-2"
          )}>
            <Avatar className={cn(
              "rounded-full border-2 border-sidebar-border/50 shadow-lg transition-all duration-300",
              isCollapsed ? "h-8 w-8" : "h-14 w-14"
            )}>
              <AvatarImage src="/avatar-ila.png" alt="Ila Corcoran" />
              <AvatarFallback className="bg-muted text-[10px] font-bold">IC</AvatarFallback>
            </Avatar>
            
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={transition}
                  className="flex flex-col gap-0.5"
                >
                  <span className="text-base font-bold text-sidebar-foreground tracking-tight drop-shadow-sm">Ila Corcoran</span>
                  <span className="text-sm text-sidebar-foreground/90 font-semibold">Radius Agent</span>
                  <span className="text-xs text-sidebar-foreground/70 mt-0.5 tracking-wider font-medium">(562) 512-5806</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        {/* SEARCHES Section - Collapsible */}
        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="h-7 mb-1 px-2">
            {searchesGroup.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {searchesGroup.items.map((item) => {
                if (item.title === "My Searches") {
                  return (
                    <Collapsible key={item.title} defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} isActive={isActive(pathname, item.url)} className="h-9">
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            <ChevronsUpDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mr-0 pr-0">
                            {savedSearches.map((search) => (
                              <SidebarMenuSubItem key={search.id}>
                                <SidebarMenuSubButton 
                                  asChild 
                                  isActive={selectedSavedSearchId === search.id && isActive(pathname, item.url)}
                                  onClick={() => setSelectedSavedSearchId(search.id)}
                                  className="h-8 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                                >
                                  <Link href={item.url}>
                                    <span className="truncate">{search.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title} 
                        isActive={isActive(pathname, item.url)} 
                        className="h-9 transition-colors duration-200"
                        onClick={() => setSelectedSavedSearchId(null)}
                      >
                        <Link href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Standalone Messages */}
        <SidebarGroup className="py-1">
          <SidebarMenu className="gap-0.5">
            <SidebarMenuItem>
              <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                <SidebarMenuButton asChild tooltip="Messages" isActive={isActive(pathname, "/messages")} className="h-9 transition-colors duration-200">
                  <Link href="/messages">
                    <MessageSquare className="size-4" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </motion.div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Engagement Section - Collapsible */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="py-1">
            <SidebarGroupLabel asChild className="h-7 mb-1 px-2">
              <CollapsibleTrigger>
                {engagementGroup.label}
                <ChevronsUpDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {engagementItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(pathname, item.url)} className="h-9 transition-colors duration-200">
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                            {"badge" in item && item.badge !== "0" ? (
                              <span className="ml-auto text-xs font-medium tabular-nums text-sidebar-foreground/50">
                                {item.badge}
                              </span>
                            ) : null}
                          </Link>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* MORE Section - Collapsible */}
        <Collapsible className="group/collapsible">
          <SidebarGroup className="py-1">
            <SidebarGroupLabel asChild className="h-7 mb-1 px-2">
              <CollapsibleTrigger>
                MORE
                <ChevronsUpDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {accountGroup.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(pathname, item.url)} className="h-9 transition-colors duration-200">
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
                  ))}
                  
                  <SidebarMenuItem>
                    <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                      <SidebarMenuButton className="h-9">
                        <Bell className="size-4" />
                        <span>Notifications</span>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter className={cn("flex flex-row items-center justify-end transition-all duration-300", isCollapsed ? "p-2 justify-center" : "p-4")}>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
