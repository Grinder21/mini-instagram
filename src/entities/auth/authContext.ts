import { createContext } from "react";

import type { AuthContextValue } from "./types";

export const AUTH_STORAGE_KEY = "auth:userId";

export const AuthContext = createContext<AuthContextValue | null>(null);
