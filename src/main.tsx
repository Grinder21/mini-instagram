import { createRoot } from "react-dom/client";
import { RouterProvider } from "./app/providers/router";
import { AuthProvider } from "./app/providers/auth/ui/AuthProvider";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider />
  </AuthProvider>,
);
