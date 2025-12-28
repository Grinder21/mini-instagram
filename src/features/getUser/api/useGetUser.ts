import { useGetData } from "@/shared/api/useGetData";
import type { User } from "@/entities/user/model/types";

export function useGetUser(id: number | undefined) {
  const { data, isLoading, error } = useGetData<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    undefined,
    id !== undefined
  );

  return {
    user: data,
    isLoading,
    error,
  };
}
