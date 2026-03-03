import { createContext } from "react";

import type { SettingsContextValue, SettingsState } from "./types";

export const SETTINGS_STORAGE_KEY = "app:settings";

export const DEFAULT_SETTINGS: SettingsState = {
  theme: "light",
  grid: 3,
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);
