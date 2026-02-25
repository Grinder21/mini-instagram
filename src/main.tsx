import { createRoot } from "react-dom/client";

import { RouterProvider } from "@/app/providers/router";
import { AuthProvider } from "@/entities/auth";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider />
  </AuthProvider>
);
