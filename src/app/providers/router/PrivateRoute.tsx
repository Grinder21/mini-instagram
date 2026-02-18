import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/auth/lib/useAuth";
import { SpinnerLoader } from "@/shared/ui/Loader";

export function PrivateRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="p-6">
        <SpinnerLoader />
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
