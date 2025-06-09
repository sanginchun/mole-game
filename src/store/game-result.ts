import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TOP_N } from "@/configs/game-score";

const STORAGE_KEY = "game-result";

interface GameResult {
  playedAt: number;
  score: number;
}

interface GameResultState {
  currentResult: GameResult | null;
  setCurrentResult: (s: GameResult) => void;
  topScores: Array<GameResult>;
  resetScores: () => void;
}

const useGameResultStore = create<GameResultState>()(
  persist(
    (set) => ({
      currentResult: null,
      setCurrentResult: (result) =>
        set((state) => {
          const scorePosition = state.topScores.findIndex(
            (r) => r.score <= result.score
          );
          const nextTopScores = [...state.topScores];

          if (scorePosition === -1) {
            nextTopScores.push(result);
          } else {
            nextTopScores.splice(scorePosition, 0, result);
          }

          return {
            ...state,
            topScores: nextTopScores.slice(0, TOP_N),
            currentResult: result,
          };
        }),
      topScores: [],
      resetScores: () => set((state) => ({ ...state, topScores: [] })),
    }),
    {
      name: STORAGE_KEY,
    }
  )
);

export default useGameResultStore;
