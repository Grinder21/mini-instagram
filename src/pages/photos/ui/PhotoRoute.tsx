import { Navigate, useParams } from "react-router-dom";

import PhotoPage from "./PhotoPage";

export default function PhotoRoute() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  return <PhotoPage id={id} />;
}
