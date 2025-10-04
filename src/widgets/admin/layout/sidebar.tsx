"use client";

import { ROUTE } from "@/shared/config/path";
import {
  BellDotIcon,
  BookMarked,
  ChartPieIcon,
  CircleUserRoundIcon,
  Home,
  LogOut,
  Presentation,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import Link from "next/link";
import { app } from "@/shared/config/app";
import { authService } from "@/features/api/site/auth";
import { ReactNode } from "react";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  notification?: number;
}

interface MenuGroup {
  title: string;
  list: MenuItem[];
}

const listMenu: MenuGroup[] = [
  {
    title: "Управление",
    list: [
      {
        title: "Уведомления",
        url: "/admin/notifications",
        icon: BellDotIcon,
        // notification: user?.all_notification_count || 0,
      },
      {
        title: "Тарифы",
        url: ROUTE.ADMIN.TARIFF,
        icon: Presentation,
      },
      //   {
      //     title: "Статистика",
      //     url: APP_ROUTES.ADMIN.STATISTICS,
      //     icon: ChartPieIcon,
      //   },
      {
        title: "Словарь",
        url: ROUTE.ADMIN.DICTIONARIES,
        icon: BookMarked,
      },
    ],
  },
  {
    title: "Модерация",
    list: [
      {
        title: "Объявлениe",
        url: ROUTE.ADMIN.ADS.MODERATION(),
        icon: Home,
      },
      //   {
      //     title: "Пользователи",
      //     url: APP_ROUTES.ADMIN.USER.MODERATION,
      //     icon: CircleUserRoundIcon,
      //   },
    ],
  },
];

function AppSidebarUi() {
  const logout = async () => {
    await authService.logout();
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="text-primary" />
              <span className="text-xl text-primary">{app.siteName}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarGroup>

        {listMenu.map((el) => (
          <SidebarGroup key={el.title}>
            <SidebarGroupLabel>{el.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {el.list.map((el) => (
                  <SidebarMenuItem key={el.title}>
                    <SidebarMenuButton asChild>
                      <a href={el.url} className="flex items-center gap-2">
                        <el.icon className="h-4 w-4" />
                        <span className="text-lg">{el.title}</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="text-base">
                      {el.notification}
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="text-lg">
                  <LogOut />
                  Выход
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const AppSidebarClient = ({ children }: { children: ReactNode }) => (
  <SidebarProvider>
    <AppSidebarUi />

    <div className="ml-1 mt-4 w-full">
      <div className="flex items-center gap-5">
        <SidebarTrigger />
      </div>

      <div className="mt-5 pl-6 pr-6 md:pr-14">{children}</div>
    </div>
  </SidebarProvider>
);
export { AppSidebarClient };
