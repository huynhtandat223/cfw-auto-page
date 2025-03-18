import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { FontProvider } from "./themes/shadcn-admin/context/font-context";
import { ThemeProvider } from "./themes/shadcn-admin/context/theme-context";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <FontProvider>
          <RouterProvider router={router} />
        </FontProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
