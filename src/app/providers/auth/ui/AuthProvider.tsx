import React, { useMemo, useState, useEffect } from "react";
import { useGetUser } from "@/features/getUser/api/useGetUser";
import {
  AuthContext,
  STORAGE_KEY,
  type AuthContextValue,
  type AuthStatus,
} from "../model/authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | undefined>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const id = raw ? Number(raw) : undefined;
    return id && Number.isFinite(id) && id > 0 ? id : undefined;
  });

  const { user, isLoading, error } = useGetUser(userId);

  useEffect(() => {
    if (!userId) return;
    if (!isLoading && error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [userId, isLoading, error]);

  const status: AuthStatus = useMemo(() => {
    if (!userId) return "guest";
    if (isLoading) return "loading";
    if (error) return "guest";
    if (user) return "authenticated";
    return "guest";
  }, [userId, isLoading, user, error]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      status,
      user: status === "authenticated" ? (user ?? null) : null,
      error,
      loginById: (id: number) => {
        localStorage.setItem(STORAGE_KEY, String(id));
        setUserId(id);
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUserId(undefined);
      },
    };
  }, [status, user, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
