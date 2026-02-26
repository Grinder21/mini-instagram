export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export function isComment(payload: unknown): payload is Comment {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const maybeComment = payload as Partial<Comment>;

  return (
    typeof maybeComment.postId === "number" &&
    typeof maybeComment.id === "number" &&
    typeof maybeComment.name === "string" &&
    typeof maybeComment.email === "string" &&
    typeof maybeComment.body === "string"
  );
}

export function isCommentArray(payload: unknown): payload is Comment[] {
  return Array.isArray(payload) && payload.every(isComment);
}
