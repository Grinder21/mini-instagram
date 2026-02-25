import { Navigate, useParams } from "react-router-dom";

import UserPage from "./UserPage";

export default function UserRoute() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  return <UserPage id={id} />;
}
