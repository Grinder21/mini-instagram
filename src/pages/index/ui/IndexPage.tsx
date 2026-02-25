import { Navigate } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import { SpinnerLoader } from "@/shared/ui/Loader";

export default function IndexPage() {
  const { status, user } = useAuth();

  if (status === "loading") {
    return <SpinnerLoader />;
  }

  if (status === "authenticated" && user) {
    return <Navigate to={`/users/${user.id}`} replace />;
  }

  return <Navigate to="/login" replace />;
}
