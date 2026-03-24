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
import { Card, CardContent } from "@/shared/ui/Card";
import { SpinnerLoader } from "@/shared/ui/Loader";
import { PageHeader } from "@/shared/ui/PageHeader";

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
    (photo && isAlbumLoading)
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
      <PageHeader
        actions={
          <Button onClick={() => navigate(`/albums/${album.id}`)} variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Back to album
          </Button>
        }
        description="Single photo view with comments."
        title={`Photo #${photo.id}`}
      />

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
            <Badge variant="outline">
              {isCommentsLoading ? "Loading..." : comments.length}
            </Badge>
          </div>

          {commentsError && (
            <Alert variant="destructive">
              <AlertTitle>Failed to load comments</AlertTitle>
              <AlertDescription>{commentsError}</AlertDescription>
            </Alert>
          )}

          {!commentsError && isCommentsLoading && <SpinnerLoader />}

          {!commentsError && !isCommentsLoading && comments.length === 0 && (
            <p>No comments yet.</p>
          )}

          {!commentsError && !isCommentsLoading && comments.length > 0 && (
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
      </CardContent>
    </Card>
  );
}
