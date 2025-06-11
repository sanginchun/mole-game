import useGameResultStore from "@/store/game-result";
import { Link } from "react-router";

import "./scoreboard.scss";

const Scoreboard = () => {
  const currentResult = useGameResultStore((state) => state.currentResult);
  const topScores = useGameResultStore((state) => state.topScores);
  const resetScores = useGameResultStore((state) => state.resetScores);

  const hasResult = currentResult !== null;

  return (
    <main className="scoreboard">
      <section aria-label="상위 10개 기록">
        <h1 className="title">순위</h1>
        {topScores.length > 0 ? (
          <ol>
            {topScores.map((result, index) => {
              const isCurrent =
                hasResult && currentResult.playedAt === result.playedAt;
              const rank = `${index + 1}위`;

              return (
                <li
                  className={isCurrent ? "current" : ""}
                  key={result.playedAt}
                  aria-label={isCurrent ? "현재 기록" : ""}
                >
                  <span className="rank" aria-label="순위">
                    {rank} {":"}
                    <span className="score" aria-label="점수">
                      {result.score} 점
                    </span>
                  </span>
                  <span className="datetime" aria-label="날짜">
                    {new Date(result.playedAt).toLocaleDateString()}{" "}
                    {new Date(result.playedAt).toLocaleTimeString()}
                  </span>
                </li>
              );
            })}
          </ol>
        ) : (
          <p>플레이 기록이 없습니다.</p>
        )}
      </section>
      <nav>
        <Link className="link-button play-button" to="/play">
          {hasResult ? "다시하기" : "게임하기"}
        </Link>
        <Link className="link-button" to="/">
          처음으로
        </Link>
        <button
          onClick={resetScores}
          disabled={topScores.length === 0}
          className="reset-button"
        >
          순위 초기화
        </button>
      </nav>
    </main>
  );
};

export default Scoreboard;
