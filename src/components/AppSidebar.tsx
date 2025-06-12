
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Package, Truck, LogOut, Users } from "lucide-react"
=======
import { Package, Truck } from "lucide-react"
>>>>>>> parent of e93de26 (Add logout button and user info to sidebar)
=======
import { Package, Truck } from "lucide-react"
>>>>>>> parent of e93de26 (Add logout button and user info to sidebar)
=======
import { Package, Truck } from "lucide-react"
>>>>>>> parent of e93de26 (Add logout button and user info to sidebar)
import { Link, useLocation } from "react-router-dom"

const items = [
  {
    title: "المخازن",
    url: "/",
    icon: Package,
  },
  {
    title: "إدارة القوافل والمساعدات",
    url: "/convoy-requests",
    icon: Truck,
  },
  {
    title: "العائلات",
    url: "/families",
    icon: Users,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>نظام إدارة المخزون</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
