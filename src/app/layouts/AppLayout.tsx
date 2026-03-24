import {
  Camera,
  Grid3X3,
  LogOut,
  Settings2,
  UserRound,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import { useSettings } from "@/entities/settings";
import { getUserAvatarUrl } from "@/shared/lib/imageSeeds";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";

const pageNames: Array<{ pattern: RegExp; title: string }> = [
  { pattern: /^\/login$/, title: "Sign in" },
  { pattern: /^\/user\/\d+$/, title: "Profile" },
  { pattern: /^\/users\/\d+$/, title: "Profile" },
  { pattern: /^\/albums\/\d+$/, title: "Album" },
  { pattern: /^\/photos\/\d+$/, title: "Photo" },
  { pattern: /^\/settings$/, title: "Settings" },
  { pattern: /^\/forbidden$/, title: "Access denied" },
  { pattern: /^\/404$/, title: "Not found" },
];

function resolvePageTitle(pathname: string) {
  const matched = pageNames.find(({ pattern }) => pattern.test(pathname));

  return matched?.title ?? "Mini Instagram";
}

export function AppLayout() {
  const { logout, status, user } = useAuth();
  const { grid, theme } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = status === "authenticated" && Boolean(user);
  const pageTitle = resolvePageTitle(location.pathname);
  const isProfilePage =
    Boolean(user) &&
    (location.pathname === `/user/${user?.id}` ||
      location.pathname === `/users/${user?.id}`);
  const isSettingsPage = location.pathname === "/settings";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(190_95%_92%/.45),transparent_40%),radial-gradient(circle_at_20%_20%,hsl(20_100%_92%/.4),transparent_38%)] dark:bg-[radial-gradient(circle_at_top_right,hsl(190_95%_30%/.22),transparent_42%),radial-gradient(circle_at_18%_24%,hsl(24_95%_35%/.18),transparent_45%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-border/60 bg-card/85 p-4 shadow-lg shadow-black/5 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Camera className="h-5 w-5" />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Mini Instagram
                </p>
                <p className="text-lg font-semibold leading-none">{pageTitle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {isAuthenticated && user && (
                <>
                  <div className="hidden items-center gap-2 rounded-xl border border-border/60 bg-background/80 px-2 py-1.5 sm:flex">
                    <Avatar
                      alt={user.name}
                      className="size-8 text-[10px]"
                      fallback={user.name}
                      src={getUserAvatarUrl(user.id, 96)}
                    />
                    <span className="max-w-32 truncate text-sm font-medium">{user.name}</span>
                  </div>

                  <Badge className="hidden sm:inline-flex" variant="secondary">
                    Theme: {theme}
                  </Badge>
                  <Badge className="hidden sm:inline-flex" variant="outline">
                    <Grid3X3 className="mr-1 h-3.5 w-3.5" />
                    Grid {grid}
                  </Badge>

                  {!isProfilePage && (
                    <Button
                      onClick={() => navigate(`/user/${user.id}`)}
                      size="sm"
                      variant="ghost"
                    >
                      <UserRound className="h-4 w-4" />
                      Profile
                    </Button>
                  )}
                  {!isSettingsPage && (
                    <Button onClick={() => navigate("/settings")} size="sm" variant="ghost">
                      <Settings2 className="h-4 w-4" />
                      Settings
                    </Button>
                  )}
                  <Button onClick={handleLogout} size="sm" variant="outline">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}

              {!isAuthenticated && location.pathname !== "/login" && (
                <Button onClick={() => navigate("/login")} size="sm" variant="outline">
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
