import { useState, type FormEvent } from "react";
import { KeyRound, Sparkles } from "lucide-react";

import { useAuth } from "@/entities/auth";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Form } from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { SpinnerLoader } from "@/shared/ui/Loader";

const demoUserIds = [1, 3, 5, 8];

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { error, loginById, status } = useAuth();
  const isBusy = status === "loading";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLocalError(null);

    const id = Number(value);

    if (!Number.isFinite(id) || id <= 0) {
      setLocalError("Enter a valid user id");
      return;
    }

    loginById(id);
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <img
            alt="Photo feed preview"
            className="h-28 w-full object-cover"
            src="https://picsum.photos/seed/login-feed/900/240"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Demo mode
          </Badge>
          <Badge variant="outline">JSONPlaceholder users</Badge>
        </div>
        <CardTitle className="text-3xl">Login</CardTitle>
        <CardDescription>
          Enter your `userId` to open your profile and albums.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="user-id">User ID</Label>
          <Input
            autoFocus
            id="user-id"
            inputMode="numeric"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Try 1"
            value={value}
          />

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Quick pick demo users:</p>
            <div className="grid grid-cols-4 gap-2">
              {demoUserIds.map((id) => (
                <Button
                  key={id}
                  onClick={() => setValue(String(id))}
                  size="sm"
                  variant={value === String(id) ? "secondary" : "outline"}
                >
                  #{id}
                </Button>
              ))}
            </div>
          </div>

          {localError && (
            <Alert variant="destructive">
              <AlertTitle>Validation error</AlertTitle>
              <AlertDescription>{localError}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Sign in failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button disabled={isBusy} fullWidth type="submit">
            <KeyRound className="h-4 w-4" />
            {isBusy ? "Signing in..." : "Sign in"}
          </Button>
        </Form>

        {isBusy && <SpinnerLoader />}
      </CardContent>
    </Card>
  );
}
