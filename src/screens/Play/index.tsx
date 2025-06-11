import { useEffect } from "react";
import useMoleGame from "@/hooks/useMoleGame";
import useGameResultStore from "@/store/game-result";
import useGameSettingStore from "@/store/game-setting";

import { Link, useNavigate } from "react-router";

const Play = () => {
  const settings = useGameSettingStore((state) => state.settings);
  const { startGame, pauseGame, resumeGame, resetGame, gameState, hitHole } =
    useMoleGame({
      holes: settings.rows * settings.cols,
      moles: settings.moles,
    });
  const setGameResult = useGameResultStore((state) => state.setCurrentResult);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameState.status === "END") {
      setGameResult({ playedAt: Date.now(), score: gameState.score });
      navigate("/result");
    }
  }, [gameState.status, gameState.score, setGameResult, navigate]);

  return (
    <main
      style={{ display: "flex", flexDirection: "column", height: "100dvh" }}
    >
      <div>{gameState.score}</div>
      <div>{gameState.timeRemaining}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
          gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
          gap: "1rem",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {gameState.holeStatus.map((v, i) => (
          <div
            key={i}
            style={{
              color: "white",
              backgroundColor:
                v === null ? "lightyellow" : v.isHit ? "red" : "brown",
            }}
            onClick={() => hitHole(i)}
          >
            {v === null ? "" : `${v.isHit ? "hit !!!" : ""}`}
          </div>
        ))}
      </div>
      {gameState.status === "IDLE" && (
        <button onClick={startGame}>시작하기</button>
      )}
      {gameState.status === "PLAYING" && (
        <button onClick={pauseGame}>일시정지</button>
      )}
      {gameState.status === "PAUSED" && (
        <button onClick={resumeGame}>재개하기</button>
      )}
      <Link to="/">
        <button onClick={resetGame}>그만하기</button>
      </Link>
    </main>
  );
};

export default Play;
