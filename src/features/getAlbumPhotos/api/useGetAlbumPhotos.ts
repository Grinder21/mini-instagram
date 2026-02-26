import { isPhotoArray, type Photo } from "@/entities/photo";
import { useGetData } from "@/shared/api/useGetData";

export function useGetAlbumPhotos(albumId: string | undefined, enabled = true) {
  const canLoad = enabled && Boolean(albumId);

  const { data, isLoading, error } = useGetData<Photo[]>(
    "https://jsonplaceholder.typicode.com/photos",
    { albumId },
    canLoad
  );

  if (!enabled) {
    return {
      photos: [] as Photo[],
      isLoading: false,
      error: null as string | null,
    };
  }

  const photos = isPhotoArray(data) ? data : [];

  return {
    photos,
    isLoading,
    error,
  };
}
