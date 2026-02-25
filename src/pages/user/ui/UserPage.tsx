import { Navigate } from "react-router-dom";

import { useGetUser } from "@/features/getUser/api/useGetUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { SpinnerLoader } from "@/shared/ui/Loader";

type UserPageProps = {
  id: string;
};

export default function UserPage({ id }: UserPageProps) {
  const { user, isLoading, error } = useGetUser(id);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error || !user) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>

      <CardContent>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </CardContent>
    </Card>
  );
}
