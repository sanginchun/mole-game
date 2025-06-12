import { useEffect } from "react";
import useMoleGame from "@/hooks/useMoleGame";
import useGameResultStore from "@/store/game-result";
import useGameSettingStore from "@/store/game-setting";

import { Link, useNavigate } from "react-router";

import "./play.scss";

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
    document.addEventListener("visibilitychange", pauseOnHidden);

    function pauseOnHidden() {
      if (document.hidden) {
        pauseGame();
      }
    }

    return () => {
      document.removeEventListener("visibilitychange", pauseOnHidden);
    };
  }, [pauseGame]);

  useEffect(() => {
    if (gameState.status === "END") {
      setGameResult({ playedAt: Date.now(), score: gameState.score });
      navigate("/result");
    }
  }, [gameState.status, gameState.score, setGameResult, navigate]);

  return (
    <main className="play">
      <section className="game-status" aria-label="게임 현황">
        <div>
          <h2>점수</h2>
          <output htmlFor="game-area" aria-live="polite">
            {gameState.score}
          </output>
        </div>
        <div>
          <h2>남은 시간</h2>
          <output htmlFor="game-area" aria-live="polite">
            {gameState.timeRemaining}
          </output>
        </div>
      </section>
      <section id="game-area" aria-label="게임 영역">
        <div
          className={`game-grid grid-${settings.cols}-${settings.rows}`}
          aria-label="게임판"
          role="grid"
        >
          {gameState.holeStatus.map((v, i) => {
            const hasMole = v !== null;
            const moleIsHit = hasMole && v.isHit;

            return (
              <div
                key={i}
                className="grid-cell"
                aria-label="구멍"
                role="gridcell"
              >
                <div className="hole" />
                <button
                  className={`mole-button ${hasMole ? "" : "hide"} ${moleIsHit ? "hit" : ""}`}
                  onClick={() => hitHole(i)}
                  disabled={
                    !hasMole || gameState.status !== "PLAYING" || moleIsHit
                  }
                  aria-label={`${hasMole ? "두더지 있음" : "두더지 없음"}`}
                />
              </div>
            );
          })}
        </div>
        <div className={`overlay ${gameState.status.toLowerCase()}`}>
          <p>
            {`아래 ${gameState.status === "IDLE" ? "시작하기" : "재개하기"} 버튼을 누르면\n게임이 ${gameState.status === "IDLE" ? "시작" : "재개"}됩니다.`}
          </p>
        </div>
      </section>
      <section className="game-control" aria-label="게임 조작">
        {gameState.status === "IDLE" && (
          <button onClick={startGame}>시작하기</button>
        )}
        {gameState.status === "PLAYING" && (
          <button onClick={pauseGame}>일시정지</button>
        )}
        {gameState.status === "PAUSED" && (
          <button onClick={resumeGame}>재개하기</button>
        )}
        <Link to="/" onClick={resetGame}>
          그만하기
        </Link>
      </section>
    </main>
  );
};

export default Play;
