import gameSettingConfig from "@/configs/game-setting";
import useGameSettingStore from "@/store/game-setting";

import { Link } from "react-router";

import "./settings.scss";

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
    <main className="settings">
      <h1 className="title">두더지 게임</h1>
      <section className="area" aria-label="게임 설정">
        <h2 className="sub-title">설정</h2>
        <p className="desc">구멍 수</p>
        <div
          className="hole-setting-buttons"
          role="radiogroup"
          aria-labelledby="hole-columns"
        >
          <label id="hole-columns">가로</label>
          <div className="button-container">
            {gameSettingConfig.AVAIL_COLS.map((col) => {
              const selected = col === gameSetting.cols;

              return (
                <button
                  key={col}
                  onClick={() => configure({ cols: col })}
                  className={selected ? "selected" : ""}
                  role="radio"
                  aria-checked={selected}
                  aria-label={`가로 ${col}개 구멍`}
                >
                  {col}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className="hole-setting-buttons"
          role="radiogroup"
          aria-labelledby="hole-rows"
        >
          <label id="hole-rows">세로</label>
          <div className="button-container">
            {gameSettingConfig.AVAIL_ROWS.map((row) => {
              const selected = row === gameSetting.rows;

              return (
                <button
                  key={row}
                  className={selected ? "selected" : ""}
                  onClick={() => configure({ rows: row })}
                  role="radio"
                  aria-checked={selected}
                  aria-label={`세로 ${row}개 구멍`}
                >
                  {row}
                </button>
              );
            })}
          </div>
        </div>
        <p className="desc mole" id="mole-count-label">
          두더지 수
        </p>
        <div
          className="mole-settings"
          role="group"
          aria-labelledby="mole-count-label"
        >
          <button
            onClick={() => configure({ moles: minMoles })}
            disabled={currentMoles <= minMoles}
            aria-label="최소 두더지 수로 설정"
          >
            min
          </button>
          <button
            className="plus-minus"
            onClick={() => configure({ moles: currentMoles - 1 })}
            disabled={currentMoles <= minMoles}
            aria-label="두더지 수 1 감소"
          >
            -
          </button>
          <output
            className="num"
            aria-label={`현재 두더지 수 ${currentMoles}마리`}
          >
            {`${currentMoles}`.padStart(2, "0")}
          </output>
          <button
            className="plus-minus"
            onClick={() => configure({ moles: currentMoles + 1 })}
            disabled={currentMoles >= maxMoles}
            aria-label="두더지 수 1 증가"
          >
            +
          </button>
          <button
            onClick={() => configure({ moles: maxMoles })}
            disabled={currentMoles >= maxMoles}
            aria-label="최대 두더지 수로 설정"
          >
            max
          </button>
        </div>
      </section>
      <nav>
        <Link className="play-button" to="/play" aria-label="게임 시작하기">
          시작
        </Link>
        <Link className="scoreboard-link" to="/scoreboard">
          순위
        </Link>
      </nav>
    </main>
  );
};

export default Settings;
