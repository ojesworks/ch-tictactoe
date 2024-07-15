export class GameBoard {
  #rows;
  #cols;

  constructor() {}

  get rows() {
    return this.#rows;
  }
  get cols() {
    return this.#cols;
  }

  setRowAndCols({ cols, rows }) {
    this.#rows = rows;
    this.#cols = cols;
    this.reset();
  }

  canMove(row, col) {
    return this.board[row][col] === '';
  }

  registerMove(row, col, mark) {
    if (this.canMove(row, col)) {
      this.board[row][col] = mark;
      return true;
    }
    return false;
  }

  checkWin(visitor, { col, row, match, mark }) {
    return visitor.checkWin(this.board, { col: +col, row: +row, match: +match, mark });
  }

  reset() {
    this.board = this.createBoard(this.cols, this.rows);
    return this;
  }

  createBoard(cols, rows) {
    return new Array(rows).fill(1).map(() => new Array(cols).fill(''));
  }
}
