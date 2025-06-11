import useGameResultStore from "@/store/game-result";
import { Link } from "react-router";

const Scoreboard = () => {
  const topScores = useGameResultStore((state) => state.topScores);

  // TODO: highlight
  // const currentResult = useGameResultStore(state => state.currentResult)

  return (
    <main>
      <h1>순위</h1>
      <ol>
        {topScores.map((result) => (
          <li key={result.playedAt}>
            {new Date(result.playedAt).toISOString()} - {result.score}점
          </li>
        ))}
      </ol>
      <div>
        <Link to="/play">
          <button>다시하기</button>
        </Link>
        <Link to="/">
          <button>처음으로</button>
        </Link>
      </div>
    </main>
  );
};

export default Scoreboard;
