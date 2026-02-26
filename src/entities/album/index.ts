export interface Album {
  userId: number;
  id: number;
  title: string;
}

export function isAlbum(payload: unknown): payload is Album {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const maybeAlbum = payload as Partial<Album>;

  return (
    typeof maybeAlbum.userId === "number" &&
    typeof maybeAlbum.id === "number" &&
    typeof maybeAlbum.title === "string"
  );
}

export function isAlbumArray(payload: unknown): payload is Album[] {
  return Array.isArray(payload) && payload.every(isAlbum);
}
