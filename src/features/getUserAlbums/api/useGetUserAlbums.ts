import { isAlbumArray, type Album } from "@/entities/album";
import { useAuth } from "@/entities/auth";
import { useGetData } from "@/shared/api/useGetData";

export function useGetUserAlbums(userId: string | undefined) {
  const { status, user } = useAuth();

  const hasAccess =
    status === "authenticated" && Boolean(userId) && String(user?.id) === userId;

  const { data, isLoading, error } = useGetData<Album[]>(
    "https://jsonplaceholder.typicode.com/albums",
    { userId },
    hasAccess
  );

  if (!hasAccess) {
    return {
      albums: [] as Album[],
      isLoading: status === "loading",
      error: status === "loading" ? null : "Forbidden",
    };
  }

  const albums = isAlbumArray(data) ? data : [];

  return {
    albums,
    isLoading,
    error,
  };
}
