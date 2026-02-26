import { useAuth } from "@/entities/auth";
import { isUser, type User } from "@/entities/user";
import { useGetData } from "@/shared/api/useGetData";

export function useGetUser(id: string | undefined) {
  const { status, user: authUser } = useAuth();
  const hasAccess =
    status === "authenticated" && Boolean(id) && String(authUser?.id) === id;

  const { data, isLoading, error } = useGetData<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    undefined,
    hasAccess
  );

  const user = isUser(data) ? data : null;

  if (!hasAccess) {
    return {
      user: null,
      isLoading: status === "loading",
      error: status === "loading" ? null : "Forbidden",
    };
  }

  const resolvedError = !isLoading && !error && !user ? "Not Found" : error;

  return {
    user,
    isLoading,
    error: resolvedError,
  };
}
