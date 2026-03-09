import { ArrowLeft, Grid3X3, MoonStar, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import {
  type GridColumns,
  type Theme,
  useSettings,
} from "@/entities/settings";
import { Badge } from "@/shared/ui/Badge";
import { BorderedBox, SectionHeading } from "@/shared/ui/Blocks";
import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";

const themeLabels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
};

const themeIcons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: MoonStar,
};

const themeOptions: Theme[] = ["light", "dark"];
const gridOptions: GridColumns[] = [3, 4, 5];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { grid, setGrid, setTheme, theme } = useSettings();

  return (
    <Card className="max-w-4xl">
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-3xl">Settings</CardTitle>
          <CardDescription>
            Tune the global theme and gallery grid density. Changes apply immediately.
          </CardDescription>
        </div>

        <Button
          onClick={() => navigate(user ? `/user/${user.id}` : "/")}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </Button>
      </CardHeader>

      <CardContent className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <SectionHeading className="text-xl">Theme</SectionHeading>
            <Badge variant="secondary">{themeLabels[theme]}</Badge>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {themeOptions.map((option) => {
              const Icon = themeIcons[option];

              return (
                <Button
                  key={option}
                  className="h-auto justify-start gap-3 px-4 py-3"
                  onClick={() => setTheme(option)}
                  variant={theme === option ? "default" : "outline"}
                >
                  <Icon className="h-4 w-4" />
                  <span>{themeLabels[option]}</span>
                </Button>
              );
            })}
          </div>

          <BorderedBox className="text-sm">
            Current theme: <span className="font-semibold">{themeLabels[theme]}</span>
          </BorderedBox>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <SectionHeading className="text-xl">Grid</SectionHeading>
            <Badge variant="outline">{grid} columns</Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {gridOptions.map((option) => (
              <Button
                key={option}
                className="h-auto px-3 py-3"
                onClick={() => setGrid(option)}
                variant={grid === option ? "default" : "outline"}
              >
                <Grid3X3 className="h-4 w-4" />
                {option}
              </Button>
            ))}
          </div>

          <BorderedBox className="space-y-3">
            <p className="text-sm">
              Current grid: <span className="font-semibold">{grid}</span> columns in a
              row
            </p>

            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: grid * 2 }, (_, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-border/60"
                >
                  <img
                    alt={`Grid preview ${index + 1}`}
                    className="h-16 w-full object-cover"
                    src={`https://picsum.photos/seed/grid-preview-${index + 1}/320/160`}
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <span className="absolute left-2 top-2 rounded bg-black/45 px-1.5 py-0.5 text-[10px] text-white">
                    Tile {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </BorderedBox>
        </section>
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={() => navigate(user ? `/user/${user.id}` : "/")}
          variant="outline"
        >
          Save and go back
        </Button>
      </CardFooter>
    </Card>
  );
}
