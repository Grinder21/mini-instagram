export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export function isPhoto(payload: unknown): payload is Photo {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const maybePhoto = payload as Partial<Photo>;

  return (
    typeof maybePhoto.albumId === "number" &&
    typeof maybePhoto.id === "number" &&
    typeof maybePhoto.title === "string" &&
    typeof maybePhoto.url === "string" &&
    typeof maybePhoto.thumbnailUrl === "string"
  );
}

export function isPhotoArray(payload: unknown): payload is Photo[] {
  return Array.isArray(payload) && payload.every(isPhoto);
}
