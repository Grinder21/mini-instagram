import { useEffect, useMemo, useReducer, type ReactNode } from "react";

import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  SettingsContext,
} from "./settingsContext";
import type {
  GridColumns,
  SettingsAction,
  SettingsContextValue,
  SettingsState,
  Theme,
} from "./types";

type SettingsProviderProps = {
  children: ReactNode;
};

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

function isGridColumns(value: unknown): value is GridColumns {
  return value === 3 || value === 4 || value === 5;
}

function readInitialState(): SettingsState {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!raw) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(raw) as Partial<SettingsState>;

    return {
      theme: isTheme(parsed.theme) ? parsed.theme : DEFAULT_SETTINGS.theme,
      grid: isGridColumns(parsed.grid) ? parsed.grid : DEFAULT_SETTINGS.grid,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function reducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case "setTheme":
      return {
        ...state,
        theme: action.payload,
      };

    case "setGrid":
      return {
        ...state,
        grid: action.payload,
      };

    default:
      return state;
  }
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [state, dispatch] = useReducer(reducer, undefined, readInitialState);

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    document.documentElement.style.colorScheme = state.theme;
    document.documentElement.style.setProperty(
      "--app-grid-columns",
      String(state.grid)
    );
  }, [state.grid, state.theme]);

  const value = useMemo<SettingsContextValue>(() => {
    return {
      theme: state.theme,
      grid: state.grid,
      setTheme: (theme) => dispatch({ type: "setTheme", payload: theme }),
      setGrid: (grid) => dispatch({ type: "setGrid", payload: grid }),
    };
  }, [state.grid, state.theme]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
