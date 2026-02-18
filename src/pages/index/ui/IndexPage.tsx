import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/providers/auth/lib/useAuth";
import { SpinnerLoader } from "@/shared/ui/Loader";

export default function IndexPage() {
  const { status, user } = useAuth();

  if (status === "loading") {
    return (
      <div className="p-6">
        <SpinnerLoader />
      </div>
    );
  }

  if (status === "authenticated" && user) {
    return <Navigate to={`/users/${user.id}`} replace />;
  }

  return <Navigate to="/login" replace />;
}
