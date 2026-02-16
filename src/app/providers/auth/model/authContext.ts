import { createContext } from "react";
import type { User } from "@/entities/user/model/types";

export type AuthStatus = "loading" | "authenticated" | "guest" | "error";

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  error: string | null;
  loginById: (id: number) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const STORAGE_KEY = "auth:userId";
