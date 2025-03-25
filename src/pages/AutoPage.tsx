import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown, Search, ThemeSwitch } from "@/components/ui-builder";
import SkipToMain from "@/components/skip-to-main";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { useLayerStore } from "@/components/ui-builder/store/layer-store";
import { cn } from "@/lib/utils";
import { Outlet, ReactNode, useLocation } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { Suspense, lazy, useMemo } from "react";
import { Toaster } from "sonner";
import { useStore } from "zustand";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load the LayerRenderer component
const LayerRenderer = lazy(() => import("@/components/ui-builder/components/PageBuilder/layer-renderer"));

export function Test() {
  const { pages } = useStore(useLayerStore, (state) => state);
  const { pathname } = useLocation();

  const page = useMemo(() => {
    const page = pages.find((page) => page.route === pathname);
    return page;
  }, [pathname, pages]);

  return (
    <ShadcnAdminLayout>
      <Suspense fallback={<LoadingSpinner size="lg" className="h-[50vh]" />}>
        <LayerRenderer page={page!} />
      </Suspense>
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

            <Main>
              {children || <Outlet />}
              <Toaster />
            </Main>
          </>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
