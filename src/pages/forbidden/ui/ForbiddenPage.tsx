import { Ban, Home, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";

export default function ForbiddenPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <Badge className="w-fit" variant="secondary">
          Restricted
        </Badge>
        <CardTitle className="flex items-center gap-2">
          <Ban className="h-6 w-6 text-destructive" />
          Access denied
        </CardTitle>
        <CardDescription>
          This section is available only to the account owner.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          fullWidth
          onClick={() => navigate(user ? `/user/${user.id}` : "/login")}
        >
          <UserRound className="h-4 w-4" />
          Go back
        </Button>
        <Button fullWidth onClick={() => navigate("/")} variant="outline">
          <Home className="h-4 w-4" />
          Home
        </Button>
      </CardContent>
    </Card>
  );
}
