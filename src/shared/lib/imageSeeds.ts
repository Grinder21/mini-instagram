const PRAVATAR_IMAGES_POOL = 70;

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

function toPravatarImageId(seed: number) {
  return (Math.abs(seed) % PRAVATAR_IMAGES_POOL) + 1;
}

export function getUserAvatarUrl(userId: number, size = 160) {
  return `https://i.pravatar.cc/${size}?img=${toPravatarImageId(userId)}`;
}

export function getUserCoverUrl(userId: number, width = 1400, height = 340) {
  return `https://picsum.photos/seed/user-cover-${userId}/${width}/${height}`;
}

export function getAlbumCoverUrl(albumId: number, width = 600, height = 600) {
  return `https://picsum.photos/seed/album-cover-${albumId}/${width}/${height}`;
}

export function getAlbumPhotoPreviewUrl(
  photoId: number,
  width = 720,
  height = 720
) {
  return `https://picsum.photos/seed/album-photo-${photoId}/${width}/${height}`;
}

export function getPhotoFallbackUrl(photoId: number, width = 1400, height = 1000) {
  return `https://picsum.photos/seed/photo-detail-${photoId}/${width}/${height}`;
}

export function getCommentAvatarUrl(email: string, size = 96) {
  const imageId = toPravatarImageId(hashString(email));

  return `https://i.pravatar.cc/${size}?img=${imageId}`;
}
