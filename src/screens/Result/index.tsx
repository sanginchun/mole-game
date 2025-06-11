import useGameResultStore from "@/store/game-result";
import { Link } from "react-router";

const Result = () => {
  const currentResult = useGameResultStore((state) => state.currentResult);

  return (
    <main>
      <h1>최종 점수</h1>
      {currentResult === null ? (
        <p>기록 없음</p>
      ) : (
        <p>{currentResult.score} 점</p>
      )}
      <div>
        <Link to="/play">
          <button>다시하기</button>
        </Link>
        <Link to="/">
          <button>처음으로</button>
        </Link>
        <Link to="/scoreboard">
          <button>순위</button>
        </Link>
      </div>
    </main>
  );
};

export default Result;
