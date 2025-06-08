import { MoleGame } from "@/services/MoleGame";
import {
  useMemo,
  useSyncExternalStore,
  useRef,
  useCallback,
  useEffect,
} from "react";

function useMoleGame({ holes, moles }: { holes: number; moles: number }) {
  const game = useMemo(() => new MoleGame(holes, moles), [holes, moles]);
  const getState = useCallback(() => game.getState(), [game]);
  const subscribe = useCallback(
    (listener: () => void) => game.subscribe(listener),
    [game]
  );

  const gameState = useSyncExternalStore(subscribe, getState);

  const animationIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  const startLoop = useCallback(() => {
    if (isPlayingRef.current) {
      return;
    }

    isPlayingRef.current = true;
    lastTimeRef.current = performance.now();

    const gameLoop = (currentTime: number) => {
      if (!isPlayingRef.current) {
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current!;
      lastTimeRef.current = currentTime;

      game.update(deltaTime);

      if (game.status === "PLAYING") {
        animationIdRef.current = requestAnimationFrame(gameLoop);
      }
    };

    animationIdRef.current = requestAnimationFrame(gameLoop);
  }, [game]);

  const stopLoop = useCallback(() => {
    isPlayingRef.current = false;

    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    game.start();
    startLoop();
  }, [game, startLoop]);

  const pauseGame = useCallback(() => {
    game.pause();
    stopLoop();
  }, [game, stopLoop]);

  const resumeGame = useCallback(() => {
    game.resume();
    startLoop();
  }, [game, startLoop]);

  const restartGame = useCallback(() => {
    stopLoop();
    game.reset();
    game.start();
    startLoop();
  }, [game, startLoop, stopLoop]);

  const hitHole = useCallback(
    (holeIndex: number) => {
      if (game.status !== "PLAYING") {
        return;
      }

      return game.hit(holeIndex);
    },
    [game]
  );

  useEffect(() => {
    return () => stopLoop();
  }, [stopLoop]);

  return { startGame, pauseGame, resumeGame, restartGame, hitHole, gameState };
}

export default useMoleGame;
