"use client"
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage} from "@/components/ui/breadcrumb";

const sidebarItems = [
  {
    label: "Pesquisadores",
    href: "/pesquisadores",
  },
  {
    label: "Empresas",
    href: "/empresas",
  },
];

export function AppPageHeader() {
    const pathname = usePathname();

    const activeItem = sidebarItems.find(item => item.href === pathname);

    const pageLabel = activeItem ? activeItem.label : "Página Atual";
    
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 border border-border bg-white" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Conexão Pesquisadores-Empresas
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{
                    pageLabel
                  }</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
    );
}