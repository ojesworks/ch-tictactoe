export class TicTacToe {
  static name = 'tic-tac-toe';
  static ZERO = 'zero-player';
  static EX = 'ex-player';

  static TURN_TYPE = {
    [TicTacToe.EX]: TicTacToe.ZERO,
    [TicTacToe.ZERO]: TicTacToe.EX,
  };

  #match;
  #rows;
  #cols;
  #versusMatch;
  #currentPlayerMark = TicTacToe.EX;
  #playerNames = {
    [TicTacToe.EX]: 'Player X',
    [TicTacToe.ZERO]: 'Player 0',
  };
  constructor() {}

  setPlayers(x, o) {
    this.#playerNames = {
      [TicTacToe.EX]: x ?? 'Player X',
      [TicTacToe.ZERO]: o ?? 'Player 0',
    };
  }

  get match() {
    return this.#match;
  }
  get rows() {
    return this.#rows;
  }
  get cols() {
    return this.#cols;
  }

  set versusMatch(value) {
    this.#versusMatch = value;
  }

  get versusMatch() {
    this.#versusMatch;
  }

  get currentPlayerName() {
    return this.#playerNames[this.#currentPlayerMark];
  }

  get currentPlayerMark() {
    return this.#currentPlayerMark;
  }

  togglePlayer() {
    this.#currentPlayerMark = TicTacToe.TURN_TYPE[this.#currentPlayerMark];
    return this.#currentPlayerMark;
  }

  setBoard({ cols, rows, match }) {
    this.#match = match;
    this.#rows = rows;
    this.#cols = cols;
    return this.reset();
  }

  canMove(row, col) {
    return this.board[row][col] === '';
  }

  registerMove(row, col) {
    if (this.canMove(row, col)) {
      this.board[row][col] = this.currentPlayerMark;
      return true;
    }
    return false;
  }

  checkWin(visitor, { col, row }) {
    return visitor.checkWin(this.board, { col: +col, row: +row, match: this.match, player: this.currentPlayerMark });
  }

  reset() {
    this.board = this.createBoard(this.cols, this.rows);
    return this;
  }

  createBoard(cols, rows) {
    return new Array(rows).fill(1).map(() => new Array(cols).fill(''));
  }
}
