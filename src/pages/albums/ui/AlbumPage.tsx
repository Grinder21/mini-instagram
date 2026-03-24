import { Images } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { useGetAlbum } from "@/features/getAlbum/api/useGetAlbum";
import { useGetAlbumPhotos } from "@/features/getAlbumPhotos/api/useGetAlbumPhotos";
import { getAlbumPhotoPreviewUrl } from "@/shared/lib/imageSeeds";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import { Badge } from "@/shared/ui/Badge";
import {
  BorderedBox,
  SectionHeading,
  TileButton,
  TileGrid,
  TileImage,
} from "@/shared/ui/Blocks";
import { Card, CardContent } from "@/shared/ui/Card";
import { SpinnerLoader } from "@/shared/ui/Loader";
import { PageHeader } from "@/shared/ui/PageHeader";

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

  if (isAlbumLoading) {
    return <SpinnerLoader />;
  }

  if (albumError === "Forbidden") {
    return <Navigate to="/forbidden" replace />;
  }

  if (albumError || !album) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Card className="max-w-6xl">
      <PageHeader
        description="Browse photos inside this album collection."
        icon={<Images className="h-7 w-7 text-primary" />}
        introClassName="space-y-2"
        title={`Album #${album.id}`}
      />

      <CardContent className="space-y-6">
        <BorderedBox className="space-y-2 bg-background/70">
          <p className="text-sm font-semibold">Album title</p>
          <p className="text-sm text-muted-foreground">{album.title}</p>
        </BorderedBox>

        {photosError && (
          <Alert variant="destructive">
            <AlertTitle>Failed to load photos</AlertTitle>
            <AlertDescription>{photosError}</AlertDescription>
          </Alert>
        )}

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <SectionHeading>Photos</SectionHeading>
            <Badge variant="outline">
              {isPhotosLoading ? "Loading..." : `${photos.length} items`}
            </Badge>
          </div>

          {isPhotosLoading && <SpinnerLoader />}

          {!photosError && !isPhotosLoading && photos.length === 0 && (
            <p>There are no photos in this album.</p>
          )}

          {!photosError && !isPhotosLoading && photos.length > 0 && (
            <TileGrid>
              {photos.map((photo, index) => (
                <TileButton
                  key={photo.id}
                  className="p-0"
                  onClick={() => navigate(`/photos/${photo.id}`)}
                  title={photo.title}
                >
                  <div className="relative h-full w-full">
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-black/55 px-2 py-0.5 text-[10px] text-white">
                      #{index + 1}
                    </span>
                    <TileImage
                      alt={photo.title}
                      className="group-hover:scale-105"
                      onError={(event) => {
                        if (event.currentTarget.src !== photo.thumbnailUrl) {
                          event.currentTarget.src = photo.thumbnailUrl;
                        }
                      }}
                      src={getAlbumPhotoPreviewUrl(photo.id)}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/35 to-transparent px-2.5 py-2">
                      <p className="text-[11px] font-medium text-white/95">{photo.title}</p>
                    </div>
                  </div>
                </TileButton>
              ))}
            </TileGrid>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
