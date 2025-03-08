import { create } from "zustand";
import { themes } from "../themes";
import type { Theme } from "../types/theme";

type State = {
  theme: Theme;
};

type Action = {
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<State & Action>((set) => ({
  theme: themes.light,
  setTheme: (theme: Theme) => set(() => ({ theme })),
}));
