import { isAlbum, type Album } from "@/entities/album";
import { useAuth } from "@/entities/auth";
import { useGetData } from "@/shared/api/useGetData";

export function useGetAlbum(id: string | undefined, enabled = true) {
  const { status, user } = useAuth();

  const canLoad = enabled && status === "authenticated" && Boolean(id);

  const { data, isLoading, error } = useGetData<Album>(
    `https://jsonplaceholder.typicode.com/albums/${id}`,
    undefined,
    canLoad
  );

  if (!enabled) {
    return {
      album: null,
      isLoading: false,
      error: null as string | null,
    };
  }

  if (!canLoad) {
    return {
      album: null,
      isLoading: status === "loading",
      error: status === "loading" ? null : "Forbidden",
    };
  }

  const album = isAlbum(data) ? data : null;

  if (album && user && album.userId !== user.id) {
    return {
      album: null,
      isLoading: false,
      error: "Forbidden",
    };
  }

  const resolvedError = !isLoading && !error && !album ? "Not Found" : error;

  return {
    album,
    isLoading,
    error: resolvedError,
  };
}
