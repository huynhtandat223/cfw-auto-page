import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import "./index.css";

import { FontProvider } from "./themes/shadcn-admin/context/font-context";
import { ThemeProvider } from "./themes/shadcn-admin/context/theme-context";
import { IconChecklist, IconLayoutDashboard } from "@tabler/icons-react";
import { Test } from "./pages/AutoPage";
import PageBuilder from "./components/page-builder";
import { useStore } from "zustand";
import { PageLayer, useLayerStore } from "./lib/ui-builder/store/layer-store";

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
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconLayoutDashboard,
      },
      {
        title: "Tasks",
        url: "/tasks",
        icon: IconChecklist,
      },
    ],
  },
];

function createRouter1(pageLayers: PageLayer[]) {
  const localNavGroups = [
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
        })),
    },
  ];

  const rootRoute = createRootRoute();
  const dynamicRoutes = localNavGroups.flatMap((group) =>
    group.items.map(({ url, component }) =>
      createRoute({
        getParentRoute: () => rootRoute,
        path: url,
        component: component || Test,
      })
    )
  );

  const routeTree = rootRoute.addChildren(dynamicRoutes);

  return createRouter({ routeTree });
}

export const App = () => {
  const pages = useStore(useLayerStore, (state) => state.pages);
  const router = createRouter1(pages);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <FontProvider>
        <RouterProvider router={router} />
      </FontProvider>
    </ThemeProvider>
  );
};
