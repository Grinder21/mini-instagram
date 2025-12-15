import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "../../widgets/layouts/AppLayout";
import LoginPage from "../../pages/login";
import UserPage from "../../pages/user";
import AlbumPage from "../../pages/albums";
import PhotoPage from "../../pages/photos";
import SettingsPage from "../../pages/settings";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route element={<AppLayout />}>
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/photos/:id" element={<PhotoPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
