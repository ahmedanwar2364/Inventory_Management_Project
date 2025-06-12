import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar';
import { Package, Warehouse } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'طلبات القوافل',
      icon: Package,
      path: '/convoy-requests'
    },
    {
      title: 'المخازن',
      icon: Warehouse,
      path: '/warehouses'
    }
  ];

  return (
    <div className="flex h-screen" dir="rtl">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-sidebar-primary" />
              <span className="font-semibold text-lg">نظام المخزون</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuButton
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  isActive={location.pathname === item.path}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout; 