import { useContext } from "react";
import { AuthContext } from "../model/authContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used AuthProvider");
  return ctx;
}
