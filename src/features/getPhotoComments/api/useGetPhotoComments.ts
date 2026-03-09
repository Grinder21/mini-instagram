import { isCommentArray, type Comment } from "@/entities/comment";
import { useGetData } from "@/shared/api/useGetData";

export function useGetPhotoComments(photoId: string | undefined, enabled = true) {
  const canLoad = enabled && Boolean(photoId);
  const parsedPhotoId = Number(photoId);
  const normalizedPostId =
    Number.isInteger(parsedPhotoId) && parsedPhotoId > 0 ? parsedPhotoId : undefined;
  const fallbackPostId =
    normalizedPostId !== undefined ? ((normalizedPostId - 1) % 100) + 1 : undefined;

  const {
    data: primaryData,
    isLoading: isPrimaryLoading,
    error: primaryError,
  } = useGetData<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments",
    { postId: normalizedPostId },
    canLoad && normalizedPostId !== undefined
  );

  const primaryComments = isCommentArray(primaryData) ? primaryData : [];
  const shouldLoadFallback =
    canLoad &&
    normalizedPostId !== undefined &&
    fallbackPostId !== undefined &&
    fallbackPostId !== normalizedPostId &&
    !isPrimaryLoading &&
    !primaryError &&
    primaryComments.length === 0;

  const {
    data: fallbackData,
    isLoading: isFallbackLoading,
    error: fallbackError,
  } = useGetData<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments",
    { postId: fallbackPostId },
    shouldLoadFallback
  );

  if (!enabled) {
    return {
      comments: [] as Comment[],
      isLoading: false,
      error: null as string | null,
      mappedFromPostId: null as number | null,
    };
  }

  const fallbackComments = isCommentArray(fallbackData) ? fallbackData : [];
  const hasPrimaryComments = primaryComments.length > 0;
  const hasFallbackComments = fallbackComments.length > 0;
  const useFallbackComments =
    !hasPrimaryComments &&
    hasFallbackComments &&
    fallbackPostId !== undefined &&
    fallbackPostId !== normalizedPostId;

  return {
    comments: useFallbackComments ? fallbackComments : primaryComments,
    isLoading: isPrimaryLoading || isFallbackLoading,
    error: primaryError ?? fallbackError,
    mappedFromPostId: useFallbackComments ? fallbackPostId : null,
  };
}
