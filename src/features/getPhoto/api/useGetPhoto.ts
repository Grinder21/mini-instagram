import { isPhoto, type Photo } from "@/entities/photo";
import { useAuth } from "@/entities/auth";
import { useGetData } from "@/shared/api/useGetData";

export function useGetPhoto(id: string | undefined) {
  const { status } = useAuth();

  const canLoad = status === "authenticated" && Boolean(id);

  const { data, isLoading, error } = useGetData<Photo>(
    `https://jsonplaceholder.typicode.com/photos/${id}`,
    undefined,
    canLoad
  );

  if (!canLoad) {
    return {
      photo: null,
      isLoading: status === "loading",
      error: status === "loading" ? null : "Forbidden",
    };
  }

  const photo = isPhoto(data) ? data : null;
  const resolvedError = !isLoading && !error && !photo ? "Not Found" : error;

  return {
    photo,
    isLoading,
    error: resolvedError,
  };
}
