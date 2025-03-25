import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import "./index.css";

import { IconChecklist, IconLayoutDashboard } from "@tabler/icons-react";
import { PageBuilder } from "./components/ui-builder";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { FontProvider } from "./context/font-context";
import { ThemeProvider } from "./context/theme-context";
import { useLayerStore } from "./components/ui-builder/store/layer-store";
import { Test } from "./pages/AutoPage";
import { InputForm } from "./pages/Test";

const pageLayers = useLayerStore.getState().pages;

export const navGroups = [
  {
    title: "Page builder",
    icon: IconLayoutDashboard,
    items: [
      {
        title: "Page builder",
        url: "/page-builder",
        icon: IconLayoutDashboard,
        component: PageBuilder,
      },
      {
        title: "Input form",
        url: "/input-form",
        icon: IconLayoutDashboard,
        component: InputForm,
      },
    ],
  },
  {
    title: "General",
    items: pageLayers
      .filter((page) => page.route!)
      .map((page) => ({
        title: page.name,
        url: page.route,
        icon: IconChecklist,
        component: Test,
      })),
  },
];

function createDynamicRouter() {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
    errorComponent: ErrorBoundary,
    pendingComponent: LoadingSpinner,
  });

  // Create index route
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Home Page</div>,
  });

  // Create dynamic routes
  const dynamicRoutes = navGroups.flatMap((group) =>
    group.items.map(({ url, component }) =>
      createRoute({
        getParentRoute: () => rootRoute,
        path: url!,
        component: component || Test,
        errorComponent: ErrorBoundary,
        pendingComponent: LoadingSpinner,
      }),
    ),
  );

  // Add all routes to the root
  const routeTree = rootRoute.addChildren([indexRoute, ...dynamicRoutes]);

  return createRouter({ 
    routeTree,
    defaultPreload: 'intent',
    context: {
      // Add any context you need here
    }
  });
}

const router = createDynamicRouter();

// Declare the router type
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <FontProvider>
        <RouterProvider router={router} />
      </FontProvider>
    </ThemeProvider>
  );
};
