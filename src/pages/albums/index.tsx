import { AlbumPageView } from "../../widgets/album-page/ui/AlbumPageView";

export default function AlbumPage() {
  return <AlbumPageView />;
}

// props: здесь я забираю albumId из URL, чтобы передать его в AlbumPageView
