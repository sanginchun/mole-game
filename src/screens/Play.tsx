import useMoleGame from "@/hooks/useMoleGame";
import useGameSettingStore from "@/store/game-setting";
import { Link } from "react-router";

const Play = () => {
  const settings = useGameSettingStore((state) => state.settings);
  const { startGame, pauseGame, resumeGame, resetGame, gameState, hitHole } =
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
        시작하기
      </button>
      {gameState.status === "PLAYING" && (
        <>
          <button onClick={pauseGame}>일시정지</button>
          <Link to="/">
            <button onClick={resetGame}>그만하기</button>
          </Link>
        </>
      )}
      {gameState.status === "PAUSED" && (
        <button onClick={resumeGame}>재개하기</button>
      )}
    </main>
  );
};

export default Play;
