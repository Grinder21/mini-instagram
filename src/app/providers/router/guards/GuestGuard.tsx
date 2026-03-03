import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import { SpinnerLoader } from "@/shared/ui/Loader";

type GuardLocationState = {
  from?: {
    pathname?: string;
  };
};

export function GuestGuard() {
  const { status, user } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <SpinnerLoader />;
  }

  if (status === "authenticated" && user) {
    const state = location.state as GuardLocationState | null;
    const fromPath = state?.from?.pathname;

    return <Navigate to={fromPath ?? `/user/${user.id}`} replace />;
  }

  return <Outlet />;
}
