import { Navigate, useNavigate } from "react-router-dom";

import { useGetUser } from "@/features/getUser/api/useGetUser";
import { useGetUserAlbums } from "@/features/getUserAlbums/api/useGetUserAlbums";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import { BorderedBox, SectionHeading, TileButton, TileGrid } from "@/shared/ui/Blocks";
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
    <Card>
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>

      <CardContent>
        <BorderedBox>{user.name}</BorderedBox>

        <SectionHeading>Albums</SectionHeading>

        {albumsError && (
          <Alert variant="destructive">
            <AlertTitle>Failed to load albums</AlertTitle>
            <AlertDescription>{albumsError}</AlertDescription>
          </Alert>
        )}

        {!albumsError && albums.length === 0 && <p>No albums yet.</p>}

        {!albumsError && albums.length > 0 && (
          <TileGrid>
            {albums.map((album) => (
              <TileButton
                key={album.id}
                onClick={() => navigate(`/albums/${album.id}`)}
                title={album.title}
              >
                {album.title}
              </TileButton>
            ))}
          </TileGrid>
        )}
      </CardContent>
    </Card>
  );
}
