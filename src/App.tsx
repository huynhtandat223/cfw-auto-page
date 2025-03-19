import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import "./index.css";

import { IconChecklist, IconLayoutDashboard } from "@tabler/icons-react";
import PageBuilder from "./components/page-builder";
import { FontProvider } from "./context/font-context";
import { ThemeProvider } from "./context/theme-context";
import { useLayerStore } from "./lib/ui-builder/store/layer-store";
import { Test } from "./pages/AutoPage";

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
  const rootRoute = createRootRoute();
  const dynamicRoutes = navGroups.flatMap((group) =>
    group.items.map(({ url, component }) =>
      createRoute({
        getParentRoute: () => rootRoute,
        path: url!,
        component: component || Test,
      }),
    ),
  );

  const routeTree = rootRoute.addChildren(dynamicRoutes);

  return createRouter({ routeTree });
}

const router = createDynamicRouter();

export const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <FontProvider>
        <RouterProvider router={router} />
      </FontProvider>
    </ThemeProvider>
  );
};
