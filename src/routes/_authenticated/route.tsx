import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/themes/shadcn-admin/components/layout/app-sidebar";
import SkipToMain from "@/themes/shadcn-admin/components/skip-to-main";
import { SearchProvider } from "@/themes/shadcn-admin/context/search-context";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
