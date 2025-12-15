import { PhotoPageView } from "../../widgets/photo-page/ui/PhotoPageView";

export default function PhotoPage() {
  return <PhotoPageView />;
}

// props: здесь я забираю photoId из URL, делаю запрос /photos/:id, следом запрос /comments?postId=:id и передаю данные в PhotoPageView
