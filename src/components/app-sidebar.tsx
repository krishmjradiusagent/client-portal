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
  Home,
  Plus,
  Bookmark,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Separator } from "@/components/ui/separator"

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
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, type Transition } from "framer-motion"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { usePropertyContext } from "./PropertyContext"

const transition: Transition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

function isActive(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const { 
    interestedCount, 
    notInterestedCount, 
    recentlyViewedCount,
    savedSearches,
    selectedSavedSearchId,
    setSelectedSavedSearchId,
    homeValueListings,
    activeHomeValueId,
    setActiveHomeValueId
  } = usePropertyContext()
  const { authUser, signOut, setAuthMode, requireAuth } = useAuth()
  const isCollapsed = state === "collapsed"
  const isAuthenticated = Boolean(authUser)

  const searchesGroup = {
    label: "SEARCHES",
    items: [
      { title: "Search", url: "/search", icon: Search },
      { title: "My Searches", url: "/my-searches", icon: LayoutGrid },
      { title: "Home Value", url: "/home-value", icon: Home },
      { title: "Messages", url: "/messages", icon: MessageSquare },
    ],
  } as const

  const engagementGroup = { label: "ENGAGEMENT" } as const

  const accountGroup = {
    label: "ACCOUNT",
    items: [
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings2 },
      { title: "Logout", url: "/logout", icon: LogOut },
    ],
  } as const

  const engagementItems = [
    { title: "Interested", url: "/interested", icon: Heart, badge: interestedCount.toString() },
    { title: "Not Interested", url: "/not-interested", icon: X, badge: notInterestedCount.toString() },
    { title: "Recently Viewed", url: "/recently-viewed", icon: History, badge: recentlyViewedCount.toString() },
  ]

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className={cn("transition-all duration-300", isCollapsed ? "p-1.5" : "p-3 pb-1")}>
        <Card className={cn(
          "relative overflow-hidden border-none transition-all duration-300",
          isCollapsed 
            ? "bg-transparent p-0 mb-0 aspect-square flex items-center justify-center" 
            : "bg-zinc-800/50 backdrop-blur-md rounded-2xl p-3 mb-1"
        )}>
          {/* Base Overlay for readability */}
          {!isCollapsed && <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-sm z-0" />}

          {/* Background Animation Layer */}
          {!isCollapsed && (
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <FlickeringGrid 
                className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                squareSize={4}
                gridGap={6}
                color="hsl(var(--muted-foreground))" // shadcn semantic token, lighter than card
                maxOpacity={0.3}
                flickerChance={1}
              />
            </div>
          )}

          {/* Content Layer */}
          <div className={cn(
            "relative z-10 flex flex-col items-center text-center transition-all duration-300",
            isCollapsed ? "gap-0" : "gap-1.5"
          )}>
            <Avatar className={cn(
              "rounded-full border-2 border-sidebar-border/50 shadow-lg transition-all duration-300",
              isCollapsed ? "h-8 w-8" : "h-11 w-11"
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
                  className="flex flex-col gap-0"
                >
                  <span className="text-sm font-bold text-sidebar-foreground tracking-tight drop-shadow-sm">Ila Corcoran</span>
                  <span className="text-xs text-sidebar-foreground/90 font-semibold">Radius Agent</span>
                  <span className="text-[10px] text-sidebar-foreground/70 tracking-wider font-medium">(562) 512-5806</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        {/* SEARCHES Section - Collapsible */}
        <SidebarGroup className="py-0.5">
          <SidebarGroupLabel className="h-7 mb-0 px-2">
            {searchesGroup.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {searchesGroup.items.map((item) => {
                if (item.title === "Home Value") {
                  return (
                    <Collapsible key={item.title} defaultOpen={homeValueListings.length > 0} className="group/collapsible">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(pathname, item.url)} className="h-9 pr-14">
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="right-1 hover:bg-slate-100 rounded-lg">
                            <ChevronsUpDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <SidebarMenuAction asChild className="right-7 hover:bg-slate-100 rounded-lg">
                          <Link href="/home-value?add=true">
                            <Plus className="size-3.5" />
                          </Link>
                        </SidebarMenuAction>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mr-0 pr-0 gap-0 py-0">
                            {homeValueListings.map((listing) => (
                              <SidebarMenuSubItem key={listing.id}>
                                <SidebarMenuSubButton 
                                  asChild 
                                  isActive={activeHomeValueId === listing.id && isActive(pathname, item.url)}
                                  onClick={() => setActiveHomeValueId(listing.id)}
                                  className="h-7 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
                                >
                                  <Link href={`${item.url}?id=${listing.id}`}>
                                    <span className="truncate">{listing.address.split(',')[0]}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                            {homeValueListings.length === 0 && (
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="h-8 text-[10px] text-sidebar-foreground/30 px-3 font-medium">
                                  <Link href="/home-value">No homes added yet</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                if (item.title === "My Searches") {
                  return (
                    <Collapsible key={item.title} defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          asChild
                          tooltip={item.title} 
                          isActive={false}
                          className="h-9 pr-8 bg-transparent hover:bg-sidebar-accent data-[active=true]:bg-transparent data-[state=open]:bg-transparent"
                        >
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="right-1 hover:bg-sidebar-accent/50 rounded-lg">
                            <ChevronsUpDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mr-0 pr-0 gap-0 py-0 mt-1 mb-1">
                            {savedSearches.map((search) => (
                              <SidebarMenuSubItem key={search.id}>
                                <SidebarMenuSubButton 
                                  asChild 
                                  isActive={selectedSavedSearchId === search.id && (isActive(pathname, item.url) || isActive(pathname, "/searches"))}
                                  onClick={() => setSelectedSavedSearchId(search.id)}
                                  className="h-[26px] py-0 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors data-[active=true]:py-0"
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

                // Messages — gated when logged out
                if (item.title === "Messages" && !isAuthenticated) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="h-9 transition-colors duration-200"
                          onClick={() => requireAuth("message_agent")}
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </motion.div>
                    </SidebarMenuItem>
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


        {/* Engagement Section - Collapsible */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="py-0.5">
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
          <SidebarGroup className="py-0.5">
            <SidebarGroupLabel asChild className="h-7 mb-1 px-2">
              <CollapsibleTrigger>
                MORE
                <ChevronsUpDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {accountGroup.items.map((item) => {
                    if (item.title === "Logout") {
                      return (
                        <SidebarMenuItem key={item.title}>
                          <motion.div whileTap={{ scale: 0.97 }} transition={transition}>
                            <SidebarMenuButton
                              tooltip={item.title}
                              className="h-9 transition-colors duration-200"
                              onClick={() => signOut()}
                            >
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                            </SidebarMenuButton>
                          </motion.div>
                        </SidebarMenuItem>
                      );
                    }
                    return (
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
                    );
                  })}
                  
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

      {/* Unified Auth + Agent Section */}
      {!isAuthenticated && !isCollapsed && (
        <div className="mt-auto px-3 pb-1 pt-0">
          <div className="bg-background rounded-xl border border-border shadow-sm p-3 flex flex-col gap-3 relative">
            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center gap-1.5 text-foreground">
                <Bookmark className="h-4 w-4" />
                <span className="text-xs font-semibold tracking-tight">Save your progress</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-[1.3] pr-2">
                Create an account to save favorites and collaborate.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col gap-1.5 mt-1">
              <Button 
                size="sm" 
                className="h-8 w-full text-[12px] font-semibold"
                onClick={() => setAuthMode("signup")}
              >
                Sign up free
              </Button>
              <div className="flex items-center justify-center gap-1 text-[11px] pt-1">
                <span className="text-muted-foreground">Have an account?</span>
                <button 
                  className="font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setAuthMode("signin")}
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SidebarFooter className={cn("flex flex-row items-center transition-all duration-300 p-3", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <div className="flex flex-col text-[10px] text-muted-foreground">
            <span className="font-medium text-sidebar-foreground">ilia@radiusagent.com</span>
            <span>License #01383148</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0">
          {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
