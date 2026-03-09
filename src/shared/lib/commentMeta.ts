type CommentDateMeta = {
  iso: string;
  label: string;
};

export function getCommentDateMeta(
  commentId: number,
  photoId: number,
  locale = "ru-RU"
): CommentDateMeta {
  const seed = Math.abs(photoId * 137 + commentId * 29);
  const minutesAgo = 45 + (seed % (60 * 24 * 90));
  const date = new Date(Date.now() - minutesAgo * 60_000);
  const label = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  return {
    iso: date.toISOString(),
    label,
  };
}
