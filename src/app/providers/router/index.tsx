import { AppRoutes } from "@/app/routes";
import { BrowserRouter } from "react-router-dom";

export function RouterProvider() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
