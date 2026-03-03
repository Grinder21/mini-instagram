import { Navigate, Route, Routes } from "react-router-dom";

import { AuthGuard } from "@/app/providers/router/guards/AuthGuard";
import { GuestGuard } from "@/app/providers/router/guards/GuestGuard";
import { OwnerGuard } from "@/app/providers/router/guards/OwnerGuard";
import AlbumPage from "@/pages/albums";
import ForbiddenPage from "@/pages/forbidden";
import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/notfound";
import PhotoPage from "@/pages/photos";
import SettingsPage from "@/pages/settings";
import UserPage from "@/pages/user";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />

      <Route element={<GuestGuard />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/photos/:id" element={<PhotoPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        <Route element={<OwnerGuard />}>
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
