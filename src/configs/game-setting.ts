const AVAIL_ROWS = [2, 3, 4, 5, 6];
const AVAIL_COLS = [2, 3, 4, 5, 6];
const MIN_MOLES = 1;

const getMaxMoles = (rows: number, cols: number) => {
  return Math.ceil((rows * cols) / 2) - 1;
};

const gameSettingConfig = {
  AVAIL_ROWS,
  AVAIL_COLS,
  MIN_MOLES,
  getMaxMoles,
};

export default gameSettingConfig;
