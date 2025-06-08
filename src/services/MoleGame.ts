import { produce } from "immer";
import pickRandomFromArray from "@/utils/pickRandomFromArray";
import calcSecondsRemaining from "@/utils/calcSecondsRemaining";

interface Mole {
  isHit: boolean;
  isVisible: boolean;
}

type GameStatus = "IDLE" | "PLAYING" | "PAUSED" | "END";
type HoleStatus = Array<Mole | null>;

export class MoleGame {
  private GAME_DURATION = 60_000;
  private SPAWN_INTERVAL = 2_000;
  private VISIBLE_DURATION = 1_000;
  private INITIAL_SPAWN = 1_000;

  status: GameStatus;
  private score: number;
  private gameTime: number;
  private lastSpawnTime: number | null;
  private nextSpawnTime: number | null;

  private holeStatus: HoleStatus;
  private moles: number;

  private listeners: Array<() => void>;
  private cachedState: {
    status: GameStatus;
    score: number;
    timeRemaining: number;
    holeStatus: HoleStatus;
  } | null = null;

  constructor(holes: number, moles: number) {
    this.status = "IDLE";
    this.score = 0;
    this.gameTime = 0;
    this.lastSpawnTime = null;
    this.nextSpawnTime = null;

    this.holeStatus = Array.from({ length: holes }, () => null);
    this.moles = moles;

    this.listeners = [];
  }

  start() {
    if (this.status !== "IDLE") {
      console.error("Game is not IDLE");
      return;
    }

    this.status = "PLAYING";
    this.nextSpawnTime = this.INITIAL_SPAWN;
    this.notify();
  }

  reset() {
    this.status = "IDLE";
    this.score = 0;
    this.gameTime = 0;
    this.lastSpawnTime = null;
    this.nextSpawnTime = null;
    this.clearHoles();
    this.notify();
  }

  pause() {
    if (this.status !== "PLAYING") {
      console.error("Game is not PLAYING");
      return;
    }

    this.status = "PAUSED";
    this.notify();
  }

  resume() {
    if (this.status !== "PAUSED") {
      console.error("Game is not PAUSED");
      return;
    }

    this.status = "PLAYING";
    this.notify();
  }

  private end() {
    this.status = "END";
  }

  update(deltaTime: number) {
    if (this.status !== "PLAYING") {
      return;
    }

    this.gameTime += deltaTime;

    const prevRemainSeconds = calcSecondsRemaining(
      this.GAME_DURATION - this.gameTime - deltaTime
    );
    const currentRemainSeconds = calcSecondsRemaining(
      this.GAME_DURATION - this.gameTime
    );

    let hasChanged = false;

    if (prevRemainSeconds !== currentRemainSeconds) {
      hasChanged = true;
    }

    if (this.gameTime >= this.GAME_DURATION) {
      this.end();
      hasChanged = true;
    }

    if (this.lastSpawnTime !== null) {
      if (this.gameTime >= this.lastSpawnTime + this.VISIBLE_DURATION) {
        this.clearHoles();

        this.lastSpawnTime = null;

        hasChanged = true;
      }
    }

    if (this.nextSpawnTime !== null) {
      if (this.gameTime >= this.nextSpawnTime) {
        this.spawn();

        this.lastSpawnTime = this.gameTime;
        this.nextSpawnTime = this.gameTime + this.SPAWN_INTERVAL;

        hasChanged = true;
      }
    }

    if (hasChanged) {
      this.notify();
    }
  }

  private clearHoles() {
    this.holeStatus = this.holeStatus.map(() => null);
  }

  private spawn() {
    const pickedHoleIndices = pickRandomFromArray(
      this.holeStatus.map((_, index) => index),
      this.moles
    );

    this.holeStatus = produce(this.holeStatus, (draft) => {
      pickedHoleIndices.forEach((holeIndex) => {
        draft[holeIndex] = { isVisible: true, isHit: false };
      });
    });
  }

  hit(holeIndex: number): boolean {
    const mole = this.holeStatus[holeIndex];

    if (mole === null || !mole.isVisible || mole.isHit) {
      return false;
    }

    this.holeStatus = produce(this.holeStatus, (draft) => {
      draft[holeIndex]!.isHit = true;
    });

    this.score++;
    this.notify();

    return true;
  }

  private notify() {
    this.cachedState = null;
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getState() {
    if (this.cachedState) {
      return this.cachedState;
    }

    this.cachedState = {
      status: this.status,
      score: this.score,
      timeRemaining: Math.max(
        0,
        calcSecondsRemaining(this.GAME_DURATION - this.gameTime)
      ),
      holeStatus: this.holeStatus,
    };

    return this.cachedState;
  }
}
