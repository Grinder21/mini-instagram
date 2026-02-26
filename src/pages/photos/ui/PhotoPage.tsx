import { Navigate, useNavigate } from "react-router-dom";

import { useGetAlbum } from "@/features/getAlbum/api/useGetAlbum";
import { useGetPhoto } from "@/features/getPhoto/api/useGetPhoto";
import { useGetPhotoComments } from "@/features/getPhotoComments/api/useGetPhotoComments";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import {
  BorderedBox,
  CommentItem,
  CommentsList,
  MediaFrame,
  MediaImage,
  SectionHeading,
} from "@/shared/ui/Blocks";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { SpinnerLoader } from "@/shared/ui/Loader";

type PhotoPageProps = {
  id: string;
};

export default function PhotoPage({ id }: PhotoPageProps) {
  const navigate = useNavigate();

  const { photo, isLoading: isPhotoLoading, error: photoError } = useGetPhoto(id);
  const {
    album,
    isLoading: isAlbumLoading,
    error: albumError,
  } = useGetAlbum(photo ? String(photo.albumId) : undefined, Boolean(photo));

  const {
    comments,
    isLoading: isCommentsLoading,
    error: commentsError,
  } = useGetPhotoComments(id, Boolean(photo && album));

  if (
    isPhotoLoading ||
    (photo && isAlbumLoading) ||
    (photo && album && isCommentsLoading)
  ) {
    return <SpinnerLoader />;
  }

  if (photoError === "Forbidden" || albumError === "Forbidden") {
    return <Navigate to="/forbidden" replace />;
  }

  if (photoError || albumError || !photo || !album) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo</CardTitle>
      </CardHeader>

      <CardContent>
        <MediaFrame>
          <MediaImage alt={photo.title} src={photo.url} />
        </MediaFrame>

        <SectionHeading>Title</SectionHeading>
        <BorderedBox>{photo.title}</BorderedBox>

        <SectionHeading>Comments</SectionHeading>

        {commentsError && (
          <Alert variant="destructive">
            <AlertTitle>Failed to load comments</AlertTitle>
            <AlertDescription>{commentsError}</AlertDescription>
          </Alert>
        )}

        {!commentsError && comments.length === 0 && <p>No comments yet.</p>}

        {!commentsError && comments.length > 0 && (
          <CommentsList>
            {comments.map((comment) => (
              <CommentItem key={comment.id} body={comment.body} email={comment.email} />
            ))}
          </CommentsList>
        )}

        <Button fullWidth onClick={() => navigate(`/albums/${album.id}`)} variant="outline">
          Back to album
        </Button>
      </CardContent>
    </Card>
  );
}
