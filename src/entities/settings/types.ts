export type Theme = "light" | "dark";

export type GridColumns = 3 | 4 | 5;

export type SettingsState = {
  theme: Theme;
  grid: GridColumns;
};

export type SettingsAction =
  | {
      type: "setTheme";
      payload: Theme;
    }
  | {
      type: "setGrid";
      payload: GridColumns;
    };

export type SettingsContextValue = SettingsState & {
  setTheme: (theme: Theme) => void;
  setGrid: (grid: GridColumns) => void;
};
