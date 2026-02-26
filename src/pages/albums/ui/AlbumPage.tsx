import { Navigate, useNavigate } from "react-router-dom";

import { useGetAlbum } from "@/features/getAlbum/api/useGetAlbum";
import { useGetAlbumPhotos } from "@/features/getAlbumPhotos/api/useGetAlbumPhotos";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import {
  BorderedBox,
  TileButton,
  TileGrid,
  TileImage,
} from "@/shared/ui/Blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { SpinnerLoader } from "@/shared/ui/Loader";

type AlbumPageProps = {
  id: string;
};

export default function AlbumPage({ id }: AlbumPageProps) {
  const navigate = useNavigate();

  const { album, isLoading: isAlbumLoading, error: albumError } = useGetAlbum(id);
  const {
    photos,
    isLoading: isPhotosLoading,
    error: photosError,
  } = useGetAlbumPhotos(id, Boolean(album));

  if (isAlbumLoading || (album && isPhotosLoading)) {
    return <SpinnerLoader />;
  }

  if (albumError === "Forbidden") {
    return <Navigate to="/forbidden" replace />;
  }

  if (albumError || !album) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Album</CardTitle>
      </CardHeader>

      <CardContent>
        <BorderedBox>{album.title}</BorderedBox>

        {photosError && (
          <Alert variant="destructive">
            <AlertTitle>Failed to load photos</AlertTitle>
            <AlertDescription>{photosError}</AlertDescription>
          </Alert>
        )}

        {!photosError && photos.length === 0 && <p>There are no photos in this album.</p>}

        {!photosError && photos.length > 0 && (
          <TileGrid>
            {photos.map((photo) => (
              <TileButton
                key={photo.id}
                onClick={() => navigate(`/photos/${photo.id}`)}
                title={photo.title}
              >
                <TileImage alt={photo.title} src={photo.thumbnailUrl} />
              </TileButton>
            ))}
          </TileGrid>
        )}
      </CardContent>
    </Card>
  );
}
