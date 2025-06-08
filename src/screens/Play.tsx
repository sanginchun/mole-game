import useMoleGame from "@/hooks/useMoleGame";
import useGameSettingStore from "@/store/game-setting";

const Play = () => {
  const settings = useGameSettingStore((state) => state.settings);
  const { startGame, pauseGame, resumeGame, restartGame, gameState, hitHole } =
    useMoleGame({
      holes: settings.rows * settings.cols,
      moles: settings.moles,
    });

  return (
    <main>
      <div>{gameState.score}</div>
      <div>{gameState.timeRemaining}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
          gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
          gap: "1rem",
          height: "80%",
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
      <button onClick={startGame} disabled={gameState.status !== "IDLE"}>
        Start
      </button>
      <button onClick={pauseGame} disabled={gameState.status !== "PLAYING"}>
        Pause
      </button>
      <button onClick={resumeGame} disabled={gameState.status !== "PAUSED"}>
        Resume
      </button>
      <button onClick={restartGame} disabled={gameState.status !== "PAUSED"}>
        Restart
      </button>
    </main>
  );
};

export default Play;
