import { Globe, Mail, MapPin, Settings2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { useGetUser } from "@/features/getUser/api/useGetUser";
import { useGetUserAlbums } from "@/features/getUserAlbums/api/useGetUserAlbums";
import {
  getAlbumCoverUrl,
  getUserAvatarUrl,
  getUserCoverUrl,
} from "@/shared/lib/imageSeeds";
import { Avatar } from "@/shared/ui/Avatar";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import { Badge } from "@/shared/ui/Badge";
import {
  BorderedBox,
  SectionHeading,
  TileButton,
  TileGrid,
  TileImage,
} from "@/shared/ui/Blocks";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { SpinnerLoader } from "@/shared/ui/Loader";

type UserPageProps = {
  id: string;
};

export default function UserPage({ id }: UserPageProps) {
  const navigate = useNavigate();

  const { user, isLoading: isUserLoading, error: userError } = useGetUser(id);
  const {
    albums,
    isLoading: isAlbumsLoading,
    error: albumsError,
  } = useGetUserAlbums(id);

  if (isUserLoading || (user && isAlbumsLoading)) {
    return <SpinnerLoader />;
  }

  if (userError === "Forbidden" || albumsError === "Forbidden") {
    return <Navigate to="/forbidden" replace />;
  }

  if (userError || !user) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Card className="max-w-6xl">
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-3xl">Welcome, {user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your profile, albums and global app settings.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <Button fullWidth onClick={() => navigate("/settings")} variant="outline">
            <Settings2 className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <section className="rounded-2xl border border-border/60 bg-muted/25 p-4 sm:p-5">
          <div className="mb-5 overflow-hidden rounded-xl border border-border/60">
            <img
              alt={`${user.name} cover`}
              className="h-36 w-full object-cover sm:h-48"
              src={getUserCoverUrl(user.id)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-[auto,1fr] sm:items-start">
            <Avatar
              alt={user.name}
              className="size-16 text-lg"
              fallback={user.name}
              src={getUserAvatarUrl(user.id, 180)}
            />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <Badge variant="secondary">@{user.username}</Badge>
                <Badge variant="outline">{albums.length} albums</Badge>
              </div>

              <BorderedBox className="bg-background/70 text-sm text-muted-foreground">
                "{user.company.catchPhrase}"
              </BorderedBox>

              <div className="grid gap-2 sm:grid-cols-2">
                <BorderedBox className="flex items-center gap-2 bg-background/80 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="truncate">{user.email}</span>
                </BorderedBox>

                <BorderedBox className="flex items-center gap-2 bg-background/80 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="truncate">{user.address.city}</span>
                </BorderedBox>

                <BorderedBox className="flex items-center gap-2 bg-background/80 text-sm sm:col-span-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="truncate">{user.website}</span>
                </BorderedBox>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <SectionHeading>Albums</SectionHeading>
            <p className="text-sm text-muted-foreground">
              Tap an album to see all photos.
            </p>
          </div>

          {albumsError && (
            <Alert variant="destructive">
              <AlertTitle>Failed to load albums</AlertTitle>
              <AlertDescription>{albumsError}</AlertDescription>
            </Alert>
          )}

          {!albumsError && albums.length === 0 && <p>No albums yet.</p>}

          {!albumsError && albums.length > 0 && (
            <TileGrid>
              {albums.map((album, index) => (
                <TileButton
                  key={album.id}
                  className="relative flex flex-col justify-between p-0"
                  onClick={() => navigate(`/albums/${album.id}`)}
                  title={album.title}
                >
                  <TileImage
                    alt={album.title}
                    className="absolute inset-0 h-full w-full group-hover:scale-105"
                    src={getAlbumCoverUrl(album.id)}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between bg-linear-to-t from-black/80 via-black/45 to-black/10 p-3">
                    <div className="space-y-2">
                      <Badge className="w-fit border-white/45 bg-black/45 text-white" variant="outline">
                        Album {index + 1}
                      </Badge>
                      <p className="line-clamp-3 text-sm leading-tight text-white">{album.title}</p>
                    </div>

                    <p className="text-xs text-white/90 transition-colors group-hover:text-white">
                      Open album
                    </p>
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
