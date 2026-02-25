import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import { SpinnerLoader } from "@/shared/ui/Loader";

export function AuthGuard() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <SpinnerLoader />;
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
