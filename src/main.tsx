import { createRoot } from "react-dom/client";

import { RouterProvider } from "@/app/providers/router";
import { AuthProvider } from "@/entities/auth";
import { SettingsProvider } from "@/entities/settings";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <SettingsProvider>
    <AuthProvider>
      <RouterProvider />
    </AuthProvider>
  </SettingsProvider>
);
