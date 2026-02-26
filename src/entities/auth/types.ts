import type { User } from "@/entities/user";

export type AuthStatus = "loading" | "authenticated" | "guest";

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  error: string | null;
  loginById: (id: number) => void;
  logout: () => void;
};
