import { HashRouter } from "react-router-dom";

import { AppRoutes } from "@/app/routes";

export function RouterProvider() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
