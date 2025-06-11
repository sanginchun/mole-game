import useGameResultStore from "@/store/game-result";
import { Link } from "react-router";

import "./result.scss";

const Result = () => {
  const currentResult = useGameResultStore((state) => state.currentResult);
  const topScores = useGameResultStore((state) => state.topScores);

  const hasResult = currentResult !== null;
  const isNewRecord =
    hasResult &&
    topScores.map((v) => v.playedAt).includes(currentResult.playedAt);

  return (
    <main className="result">
      <section aria-label="게임 결과">
        <h1 className="title">최종 점수</h1>
        {hasResult ? (
          <>
            {isNewRecord && <span className="new-record">신기록 달성 !!</span>}
            <p>{currentResult.score} 점</p>
          </>
        ) : (
          <p>플레이 기록 없음</p>
        )}
      </section>
      <nav>
        <Link className="link-button play" to="/play">
          {hasResult ? "다시하기" : "게임하기"}
        </Link>
        <Link className="link-button" to="/">
          처음으로
        </Link>
        <Link className="link-button" to="/scoreboard">
          순위
        </Link>
      </nav>
    </main>
  );
};

export default Result;
