import { create } from "zustand";
import { persist } from "zustand/middleware";
import gameSettingConfig from "@/configs/game-setting";

const STORAGE_KEY = "game-setting";

interface Settings {
  rows: number;
  cols: number;
  moles: number;
}

interface GameSettingState {
  settings: Settings;
  configure: (s: Partial<Settings>) => void;
}

const useGameSettingStore = create<GameSettingState>()(
  persist(
    (set) => ({
      settings: {
        rows: gameSettingConfig.AVAIL_ROWS[0],
        cols: gameSettingConfig.AVAIL_COLS[0],
        moles: gameSettingConfig.MIN_MOLES,
      },
      configure: (settings) =>
        set((state) => {
          const nextSettings = { ...state.settings, ...settings };

          if (settings.cols || settings.rows) {
            const { rows, cols, moles } = nextSettings;
            const maxMoles = gameSettingConfig.getMaxMoles(rows, cols);

            if (moles > maxMoles) {
              nextSettings.moles = maxMoles;
            }
          }

          return { settings: nextSettings };
        }),
    }),
    { name: STORAGE_KEY }
  )
);

export default useGameSettingStore;
