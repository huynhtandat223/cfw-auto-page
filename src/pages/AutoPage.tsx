import LayerRenderer from "@/components/page-builder/layer-renderer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLayerStore } from "@/lib/ui-builder/store/layer-store";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/themes/shadcn-admin/components/layout/app-sidebar";
import { Header } from "@/themes/shadcn-admin/components/layout/header";
import { Main } from "@/themes/shadcn-admin/components/layout/main";
import { ProfileDropdown } from "@/themes/shadcn-admin/components/profile-dropdown";
import { Search } from "@/themes/shadcn-admin/components/search";
import SkipToMain from "@/themes/shadcn-admin/components/skip-to-main";
import { ThemeSwitch } from "@/themes/shadcn-admin/components/theme-switch";
import { SearchProvider } from "@/themes/shadcn-admin/context/search-context";
import { Outlet, ReactNode } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useStore } from "zustand";

export function Test() {
  const { pages } = useStore(useLayerStore, (state) => state);
  const page = pages[0];

  return (
    <ShadcnAdminLayout>
      <LayerRenderer page={page} />
    </ShadcnAdminLayout>
  );
}

export function ShadcnAdminLayout({ children }: { children?: ReactNode }) {
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
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
          )}
        >
          <>
            <Header fixed>
              <Search />
              <div className="ml-auto flex items-center space-x-4">
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
            </Header>

            <Main>{children || <Outlet />}</Main>
          </>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
