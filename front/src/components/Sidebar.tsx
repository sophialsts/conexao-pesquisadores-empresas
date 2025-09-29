"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

import { Users, Building2, ChevronRight } from "lucide-react";

const sidebarItems = [
  {
    label: "Pesquisadores",
    href: "/pesquisadores",
    icon: Users,
  },
  {
    label: "Empresas",
    href: "/empresas",
    icon: Building2,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-eng-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <ChevronRight className="size-7" />
            </div>
            <span className="font-bold text-xl">Simcc</span>
          </SidebarMenuButton>
          <Separator className="mt-2 h-px bg-gray-300 dark:bg-gray-600" />
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conexão Pesquisadores-Empresas</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="
                      transition-all
                      data-[active=true]:font-medium
                      data-[active=true]:bg-eng-primary
                      hover:bg-gray-200
                      data-[active=true]:text-white
                      hover:data-[active=true]:bg-eng-secondary
                    "
                  >
                    <Link href={item.href}>
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter></SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}