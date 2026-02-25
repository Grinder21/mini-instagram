import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/Card";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>404</CardTitle>
      </CardHeader>

      <CardContent>
        <p>Page not found.</p>
      </CardContent>

      <CardFooter>
        <Button fullWidth onClick={() => navigate("/")}>
          Go to home
        </Button>
      </CardFooter>
    </Card>
  );
}
