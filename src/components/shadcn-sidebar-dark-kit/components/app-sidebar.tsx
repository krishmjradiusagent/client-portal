"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  LayoutGrid,
  BarChart3,
  Heart,
  X,
  Building2,
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navGroups = [
  {
    label: "Searches",
    items: [
      { title: "Search", url: "/search", icon: Search },
      { title: "My Matches", url: "/matches", icon: Sparkles },
      { title: "My Searches", url: "/my-searches", icon: LayoutGrid },
      { title: "My Home Value", url: "/home-value", icon: Home },
    ],
  },
  {
    label: "Leads",
    items: [
      { title: "Interested", url: "/interested", icon: Heart, badge: "0" },
      { title: "Messages", url: "/messages", icon: MessageSquare },
      { title: "Not Interested", url: "/not-interested", icon: X, badge: "0" },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings2 },
      { title: "Logout", url: "/logout", icon: LogOut },
    ],
  },
] as const

const savedSearches = [
  { title: "Downtown condo sweep", subtitle: "Downtown Austin", url: "/saved-searches/downtown-condo-sweep" },
  { title: "Westlake family homes", subtitle: "Westlake", url: "/saved-searches/westlake-family-homes" },
] as const

function isActive(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Building2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Radius CRM</span>
                    <span className="truncate text-xs">Agent portal</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                <DropdownMenuLabel className="text-xs text-muted-foreground">Workspace</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Building2 className="size-4" />
                  Radius CRM
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <Collapsible key={group.label} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {group.label}
                  <ChevronsUpDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(pathname, item.url)}>
                          <Link href={item.url}>
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                        {"badge" in item ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>Saved searches</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedSearches.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(pathname, item.url)}>
                    <Link href={item.url}>
                      <LayoutGrid className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href={item.url}>{item.subtitle}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Insights" isActive={isActive(pathname, "/insights")}>
                  <Link href="/insights">
                    <BarChart3 className="size-4" />
                    <span>Insights</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction showOnHover>
                  <ChevronsUpDown className="size-4" />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Auditing" isActive={isActive(pathname, "/auditing")}>
                  <Link href="/auditing">
                    <ShieldCheck className="size-4" />
                    <span>Auditing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/avatars/ila-corcoran.png" alt="Ila Corcoran" />
                    <AvatarFallback className="rounded-lg">IC</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Ila Corcoran</span>
                    <span className="truncate text-xs">Agent</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">IC</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Ila Corcoran</span>
                      <span className="truncate text-xs">ila@radiusagent.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><BadgeCheck className="size-4" /> Account</DropdownMenuItem>
                  <DropdownMenuItem><CreditCard className="size-4" /> Billing</DropdownMenuItem>
                  <DropdownMenuItem><Bell className="size-4" /> Notifications</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
