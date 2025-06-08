import { produce } from "immer";
import pickRandomFromArray from "@/utils/pickRandomFromArray";

interface Mole {
  isHit: boolean;
  isVisible: boolean;
}

export class MoleGame {
  private GAME_DURATION = 60_000;
  private SPAWN_INTERVAL = 2_000;
  private VISIBLE_DURATION = 1_000;
  private INITIAL_SPAWN = 1_000;

  status: "IDLE" | "PLAYING" | "PAUSED" | "END";
  score: number;
  gameTime: number;
  lastSpawnTime: number | null;
  nextSpawnTime: number | null;

  holeStatus: Array<Mole | null>;
  moles: number;

  constructor(holes: number, moles: number) {
    this.status = "IDLE";
    this.score = 0;
    this.gameTime = 0;
    this.lastSpawnTime = null;
    this.nextSpawnTime = null;

    this.holeStatus = Array.from({ length: holes }, () => null);
    this.moles = moles;
  }

  start() {
    if (this.status !== "IDLE") {
      console.error("Game is not IDLE");
      return;
    }

    this.status = "PLAYING";
    this.nextSpawnTime = this.INITIAL_SPAWN;
  }

  reset() {
    this.status = "IDLE";
    this.score = 0;
    this.gameTime = 0;
    this.lastSpawnTime = null;
    this.nextSpawnTime = null;
    this.clearHoles();
  }

  pause() {
    if (this.status !== "PLAYING") {
      console.error("Game is not PLAYING");
      return;
    }

    this.status = "PAUSED";
  }

  resume() {
    if (this.status !== "PAUSED") {
      console.error("Game is not PAUSED");
      return;
    }

    this.status = "PLAYING";
  }

  private end() {
    this.status = "END";
  }

  update(deltaTime: number) {
    if (this.status !== "PLAYING") {
      return;
    }

    this.gameTime += deltaTime;

    if (this.gameTime >= this.GAME_DURATION) {
      this.end();
      return;
    }

    if (this.lastSpawnTime !== null) {
      if (this.gameTime >= this.lastSpawnTime + this.VISIBLE_DURATION) {
        this.clearHoles();

        this.lastSpawnTime = null;
      }
    }

    if (this.nextSpawnTime !== null) {
      if (this.gameTime >= this.nextSpawnTime) {
        this.spawn();

        this.lastSpawnTime = this.gameTime;
        this.nextSpawnTime = this.gameTime + this.SPAWN_INTERVAL;
      }
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

    return true;
  }
}
