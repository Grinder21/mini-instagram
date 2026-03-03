import { useNavigate } from "react-router-dom";

import { useAuth } from "@/entities/auth";
import {
  type GridColumns,
  type Theme,
  useSettings,
} from "@/entities/settings";
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

const themeOptions: Theme[] = ["light", "dark"];
const gridOptions: GridColumns[] = [3, 4, 5];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { grid, setGrid, setTheme, theme } = useSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Configure global theme and default grid size for tiles.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-3">
          <SectionHeading className="text-xl">Theme</SectionHeading>

          <div className="grid grid-cols-2 gap-2">
            {themeOptions.map((option) => (
              <Button
                key={option}
                fullWidth
                onClick={() => setTheme(option)}
                variant={theme === option ? "default" : "outline"}
              >
                {themeLabels[option]}
              </Button>
            ))}
          </div>

          <BorderedBox>Current theme: {themeLabels[theme]}</BorderedBox>
        </section>

        <section className="space-y-3">
          <SectionHeading className="text-xl">Grid</SectionHeading>

          <div className="grid grid-cols-3 gap-2">
            {gridOptions.map((option) => (
              <Button
                key={option}
                fullWidth
                onClick={() => setGrid(option)}
                variant={grid === option ? "default" : "outline"}
              >
                {option} columns
              </Button>
            ))}
          </div>

          <BorderedBox>Current grid: {grid} columns in a row</BorderedBox>
        </section>
      </CardContent>

      <CardFooter>
        <Button
          fullWidth
          onClick={() => navigate(user ? `/user/${user.id}` : "/")}
          variant="outline"
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
}
