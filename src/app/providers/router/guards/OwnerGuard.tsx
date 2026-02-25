import { Navigate, Outlet, useParams } from "react-router-dom";

import { useAuth } from "@/entities/auth";

export function OwnerGuard() {
  const { user } = useAuth();
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (String(user.id) !== id) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
