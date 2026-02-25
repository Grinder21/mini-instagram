import { useNavigate } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";

export default function ForbiddenPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access denied</CardTitle>
        <CardDescription>
          This section is available only to the account owner.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          fullWidth
          onClick={() => navigate(user ? `/users/${user.id}` : "/login")}
        >
          Go back
        </Button>
      </CardContent>

      <CardFooter>
        <Button fullWidth onClick={() => navigate("/")} variant="outline">
          Home
        </Button>
      </CardFooter>
    </Card>
  );
}
