import { Routes, Route } from "react-router-dom";
import IndexPage from "@/pages/index/ui/IndexPage";
import LoginPage from "@/pages/login/ui/LoginPage";
import UserPage from "@/pages/user/ui/UserPage";
import AlbumPage from "@/pages/albums/ui/AlbumPage";
import PhotoPage from "@/pages/photos/ui/PhotoPage";
import SettingsPage from "@/pages/settings/ui/SettingsPage";
import NotFoundPage from "@/pages/notfound/ui/NotFoundPage";
import { PrivateRoute } from "../providers/router/PrivateRoute";
import ForbiddenPage from "@/pages/forbidden/ui/ForbiddenPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/photos/:id" element={<PhotoPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// todo: Сделать index, главную страницу. Если залогинен - сразу редирект на пользователя, если нет - /login.
