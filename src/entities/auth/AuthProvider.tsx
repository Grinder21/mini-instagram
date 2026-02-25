import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useGetData } from "@/shared/api/useGetData";

import { AUTH_STORAGE_KEY, AuthContext } from "./authContext";
import {
  isUser,
  type AuthContextValue,
  type AuthStatus,
  type User,
} from "./types";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<number | undefined>(() => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    const id = raw ? Number(raw) : undefined;

    return id && Number.isInteger(id) && id > 0 ? id : undefined;
  });
  const [requestVersion, setRequestVersion] = useState(0);

  const { data, isLoading, error } = useGetData<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    { v: requestVersion },
    userId !== undefined
  );

  const authUser = isUser(data) ? data : null;

  useEffect(() => {
    if (!userId || isLoading) {
      return;
    }

    if (error || !authUser) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [authUser, error, isLoading, userId]);

  const status: AuthStatus = useMemo(() => {
    if (!userId) {
      return "guest";
    }

    if (isLoading) {
      return "loading";
    }

    if (authUser) {
      return "authenticated";
    }

    return "guest";
  }, [authUser, isLoading, userId]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      status,
      user: status === "authenticated" ? authUser : null,
      error,
      loginById: (id: number) => {
        if (!Number.isInteger(id) || id <= 0) {
          return;
        }

        localStorage.setItem(AUTH_STORAGE_KEY, String(id));
        setUserId(id);
        setRequestVersion((value) => value + 1);
      },
      logout: () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUserId(undefined);
        setRequestVersion((value) => value + 1);
      },
    };
  }, [authUser, error, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
