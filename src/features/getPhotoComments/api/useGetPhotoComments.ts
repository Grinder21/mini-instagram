import { isCommentArray, type Comment } from "@/entities/comment";
import { useGetData } from "@/shared/api/useGetData";

export function useGetPhotoComments(photoId: string | undefined, enabled = true) {
  const canLoad = enabled && Boolean(photoId);
  const parsedPhotoId = Number(photoId);
  const normalizedPostId =
    Number.isInteger(parsedPhotoId) && parsedPhotoId > 0 ? parsedPhotoId : undefined;

  const { data, isLoading, error } = useGetData<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments",
    { postId: normalizedPostId },
    canLoad && normalizedPostId !== undefined
  );

  if (!enabled) {
    return {
      comments: [] as Comment[],
      isLoading: false,
      error: null as string | null,
    };
  }

  const comments = isCommentArray(data) ? data : [];

  return {
    comments,
    isLoading,
    error,
  };
}
