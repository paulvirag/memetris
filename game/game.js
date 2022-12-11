const { ROWS, COLS } = require('../xplat/constants');
const pieces = require('./pieces');

const START_INTERVAL_MS = 900;
const INTERVAL_CHANGE = 0.9;
const LINES_PER_LEVEL = 10;

const copy = piece => piece.map(row => [...row]);
const rotate = piece =>
  piece.map((row, i) => row.map((v, j) => piece[j][piece.length - i - 1]));

function place(grid, piece) {
  const { row, col, ori } = piece;

  let { shape } = piece;
  for (let i = 0; i < ori; ++i) {
    shape = rotate(shape);
  }

  for (let i = 0; i < shape.length; ++i) {
    for (let j = 0; j < shape[i].length; ++j) {
      if (shape[i][j] !== 0) {
        if (
          row + i < 0 ||
          col + j < 0 ||
          row + i >= ROWS ||
          col + j >= COLS ||
          grid[row + i][col + j] !== 0
        ) {
          return false;
        }
        grid[row + i][col + j] = shape[i][j];
      }
    }
  }

  return true;
}

class Game {
  constructor() {
    this.newGame();
  }

  newGame() {
    this._grid = Array(ROWS)
      .fill(0)
      .map(_ => Array(COLS).fill(0));
    this._gameState = {
      currentIntervalMs: START_INTERVAL_MS,
      level: 1,
      lines: 0,
      score: 0,
    };

    this._spawnPiece();
  }

  gravityDown() {
    const newPiece = {
      ...this._piece,
      row: this._piece.row + 1,
    };

    const canPlace = place(copy(this._grid), newPiece);
    if (canPlace) {
      this._piece = newPiece;
    } else {
      this._landPiece();
    }

    return canPlace;
  }

  grid() {
    const grid = copy(this._grid);
    place(grid, this._piece);
    return grid;
  }

  _spawnPiece() {
    const shape = copy(pieces[Math.floor(Math.random() * pieces.length)]);
    const row = -1 * shape.findIndex(row => Math.max(...row) > 0);
    const col = Math.floor((COLS - shape[0].length) / 2);

    const piece = {
      shape,
      row,
      col,
      ori: 0,
    };

    if (!place(copy(this._grid), piece)) {
      this.newGame();
      return;
    }

    this._piece = {
      ...piece,
      interval: setInterval(
        () => this.gravityDown(),
        this._gameState.currentIntervalMs
      ),
    };
  }

  _landPiece() {
    place(this._grid, this._piece);
    clearInterval(this._piece.interval);
    this._piece = null;

    this._spawnPiece();
  }
}

module.exports = Game;
