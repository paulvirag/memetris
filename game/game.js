const ROWS = 20;
const COLS = 10;

const pieces = [
  [
    [1, 1],
    [1, 1],
  ], // square
  [[2], [2], [2], [2]], // line
  [
    [0, 3, 3],
    [3, 3],
  ], // S
  [
    [4, 4],
    [0, 4, 4],
  ], // Z
  [[5], [5], [5, 5]], // L
  [
    [0, 6],
    [0, 6],
    [6, 6],
  ], // J
  [
    [7, 7, 7],
    [0, 7],
  ], // T
];

const colors = [
  'transparent',
  '#fffc43',
  '#00e0fc',
  '#ff0d15',
  '#51ab37',
  '#ff8128',
  '#ff4daf',
  '#9f1687',
];

class Game {
  constructor() {
    this.newGame();
  }

  newGame() {
    this._grid = Array(ROWS)
      .fill(0)
      .map(_ => Array(COLS).fill(0));
  }

  randomPiece() {
    const piece = pieces[Math.floor(Math.random() * pieces.length)];
    const x = Math.floor(Math.random() * (COLS - 3));
    const y = Math.floor(Math.random() * (ROWS - 4));

    piece.forEach((_, i) =>
      piece[i].forEach((v, j) => {
        if (v !== 0) {
          this._grid[y + i][x + j] = v;
        }
      })
    );
  }

  grid() {
    return this._grid;
  }
}

module.exports = Game;
