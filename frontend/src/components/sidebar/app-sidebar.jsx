import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Booking",
    url: "/Booking",
    icon: Home,
  },
  {
    title: "Occupancy",
    url: "/Occupancy",
    icon: Inbox,
  },
  {
    title: "Guests",
    url: "/Guests",
    icon: Calendar,
  },
  {
    title: "Rooms",
    url: "/Rooms",
    icon: Search,
  },
  {
    title: "Room Types",
    url: "/RoomsTypes",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/Settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-700 text-white ">
        <SidebarHeader className="bg-gray-700 flex items-center justify-center h-14" >HotelV3</SidebarHeader>
        <SidebarContent className="bg-gray-700">
            <SidebarGroup>
            <SidebarGroupLabel className="bg-gray-700 flex items-center justify-center h-20  text-white">Logo</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-gray-700">User</SidebarFooter>
    </Sidebar>
  )
}
