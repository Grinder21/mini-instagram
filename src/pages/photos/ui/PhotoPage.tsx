import { ArrowLeft, MessageCircleMore } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

import { useGetAlbum } from "@/features/getAlbum/api/useGetAlbum";
import { useGetPhoto } from "@/features/getPhoto/api/useGetPhoto";
import { useGetPhotoComments } from "@/features/getPhotoComments/api/useGetPhotoComments";
import { getCommentDateMeta } from "@/shared/lib/commentMeta";
import { getCommentAvatarUrl, getPhotoFallbackUrl } from "@/shared/lib/imageSeeds";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/Alert";
import { Badge } from "@/shared/ui/Badge";
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
    mappedFromPostId,
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
    <Card className="max-w-5xl">
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-3xl">Photo #{photo.id}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Single photo view with comments and quick navigation.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button onClick={() => navigate(`/albums/${album.id}`)} variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to album
          </Button>
          <Button onClick={() => navigate(`/user/${album.userId}`)} variant="ghost">
            Profile
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <MediaFrame>
          <MediaImage
            alt={photo.title}
            onError={(event) => {
              const fallback = getPhotoFallbackUrl(photo.id);

              if (event.currentTarget.src !== fallback) {
                event.currentTarget.src = fallback;
              }
            }}
            src={photo.url}
          />
        </MediaFrame>

        <section className="space-y-2">
          <SectionHeading>Title</SectionHeading>
          <BorderedBox>{photo.title}</BorderedBox>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <SectionHeading className="flex items-center gap-2">
              <MessageCircleMore className="h-5 w-5 text-primary" />
              Comments
            </SectionHeading>
            <div className="flex items-center gap-2">
              {mappedFromPostId && (
                <Badge variant="secondary">Source thread #{mappedFromPostId}</Badge>
              )}
              <Badge variant="outline">{comments.length}</Badge>
            </div>
          </div>

          {commentsError && (
            <Alert variant="destructive">
              <AlertTitle>Failed to load comments</AlertTitle>
              <AlertDescription>{commentsError}</AlertDescription>
            </Alert>
          )}

          {!commentsError && comments.length === 0 && <p>No comments yet.</p>}

          {!commentsError && comments.length > 0 && (
            <CommentsList>
              {comments.map((comment) => {
                const { iso, label } = getCommentDateMeta(comment.id, photo.id);

                return (
                  <CommentItem
                    key={comment.id}
                    avatarSrc={getCommentAvatarUrl(comment.email)}
                    body={comment.body}
                    dateTimeIso={iso}
                    dateTimeLabel={label}
                    email={comment.email}
                    name={comment.name}
                  />
                );
              })}
            </CommentsList>
          )}
        </section>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button fullWidth onClick={() => navigate(`/albums/${album.id}`)} variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to album
          </Button>
          <Button fullWidth onClick={() => navigate(`/user/${album.userId}`)} variant="ghost">
            Go to user page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
