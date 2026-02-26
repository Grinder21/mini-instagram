import { isCommentArray, type Comment } from "@/entities/comment";
import { useGetData } from "@/shared/api/useGetData";

export function useGetPhotoComments(photoId: string | undefined, enabled = true) {
  const canLoad = enabled && Boolean(photoId);

  const { data, isLoading, error } = useGetData<Comment[]>(
    "https://jsonplaceholder.typicode.com/comments",
    { postId: photoId },
    canLoad
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
