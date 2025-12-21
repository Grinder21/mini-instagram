import { Routes, Route } from "react-router-dom";
import LoginPage from "@pages/login/ui/LoginPage";
import UserPage from "@pages/user/ui/UserPage";
import AlbumPage from "@pages/albums/ui/AlbumPage";
import PhotoPage from "@pages/photos/ui/PhotoPage";
import SettingsPage from "@pages/settings/ui/SettingsPage";
import NotFoundPage from "@/pages/notfound/ui/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/albums/:id" element={<AlbumPage />} />
      <Route path="/photos/:id" element={<PhotoPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
