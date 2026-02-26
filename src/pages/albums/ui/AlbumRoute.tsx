import { Navigate, useParams } from "react-router-dom";

import AlbumPage from "./AlbumPage";

export default function AlbumRoute() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  return <AlbumPage id={id} />;
}
