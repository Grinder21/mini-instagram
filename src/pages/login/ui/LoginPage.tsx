import { useState, type FormEvent } from "react";

import { useAuth } from "@/entities/auth";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
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
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Use your user id to sign in.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="user-id">User ID</Label>
          <Input
            autoFocus
            id="user-id"
            inputMode="numeric"
            onChange={(e) => setValue(e.target.value)}
            placeholder="1"
            value={value}
          />

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
            {isBusy ? "Signing in..." : "Sign in"}
          </Button>
        </Form>

        {isBusy && <SpinnerLoader />}
      </CardContent>
    </Card>
  );
}
