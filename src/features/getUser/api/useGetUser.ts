import { useState, useEffect } from "react";
import type { User } from "@/entities/user/model/types";
import 

export function useGetUser(id: number | undefined) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id === undefined) return;
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then(setUser)
      .catch() // todo: реализовать catch
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    isLoading: isLoading,
    user: user,
  };
}
