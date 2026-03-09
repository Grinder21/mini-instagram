import { Compass, House } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/Card";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <Badge className="w-fit" variant="outline">
          404
        </Badge>
        <CardTitle className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          Page not found
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          The page does not exist or was moved.
        </p>
      </CardContent>

      <CardFooter>
        <Button fullWidth onClick={() => navigate("/")}>
          <House className="h-4 w-4" />
          Go to home
        </Button>
      </CardFooter>
    </Card>
  );
}
