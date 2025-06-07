import gameSettingConfig from "@/configs/game-setting";
import useGameSettingStore from "@/store/game-setting";
import { Link } from "react-router";

const Settings = () => {
  const gameSetting = useGameSettingStore((state) => state.settings);
  const configure = useGameSettingStore((state) => state.configure);

  const currentMoles = gameSetting.moles;
  const minMoles = gameSettingConfig.MIN_MOLES;
  const maxMoles = gameSettingConfig.getMaxMoles(
    gameSetting.rows,
    gameSetting.cols
  );

  return (
    <main>
      <h1>두더지 게임</h1>
      <section>
        <h2>설정</h2>
        <h3>구멍 칸수</h3>
        <div>
          <p>가로</p>
          <div>
            {gameSettingConfig.AVAIL_COLS.map((col) => (
              <label key={col}>
                <input
                  type="radio"
                  name="cols"
                  value={col}
                  onChange={(ev) => configure({ cols: +ev.target.value })}
                  checked={col === gameSetting.cols}
                />
                {col}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p>세로</p>
          <div>
            {gameSettingConfig.AVAIL_ROWS.map((row) => (
              <label key={row}>
                <input
                  type="radio"
                  name="rows"
                  value={row}
                  onChange={(ev) => configure({ rows: +ev.target.value })}
                  checked={row === gameSetting.rows}
                />
                {row}
              </label>
            ))}
          </div>
        </div>
        <h3>두더지 수</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => configure({ moles: maxMoles })}
            disabled={currentMoles >= maxMoles}
          >
            max
          </button>
          <button
            onClick={() => configure({ moles: currentMoles + 1 })}
            disabled={currentMoles >= maxMoles}
          >
            +
          </button>
          <p>{currentMoles}</p>
          <button
            onClick={() => configure({ moles: currentMoles - 1 })}
            disabled={currentMoles <= minMoles}
          >
            -
          </button>
          <button
            onClick={() => configure({ moles: minMoles })}
            disabled={currentMoles <= minMoles}
          >
            min
          </button>
        </div>
      </section>
      <nav>
        <Link to="/play">
          <button>시작</button>
        </Link>
      </nav>
    </main>
  );
};

export default Settings;
