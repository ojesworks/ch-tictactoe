import { getItem } from './storage';

export class TicTacToe {
  static name = 'tic-tac-toe';
  static ZERO = 'zero-player';
  static EX = 'ex-player';

  #currentPlayerMark = TicTacToe.EX;

  constructor({ cols, rows, match }) {
    this.match = match;
    this.rows = rows;
    this.cols = cols;
    this.board = this.#createBoard(cols, rows);

    this.playerNames = {
      [TicTacToe.EX]: getItem(TicTacToe.EX) ?? 'Player X',
      [TicTacToe.ZERO]: getItem(TicTacToe.ZERO) ?? 'Player 0',
    };
  }

  registerMove(row, col) {
    if (this.board[row][col] === '') {
      const player = this.#currentPlayerMark;
      this.board[row][col] = player;
      const state = this.checkWin(player, +row, +col);
      this.#togglePlayer();
      return {
        player: this.currentPlayerName,
        winner: state ? player : null,
        state,
      };
    }
    return {
      player: this.currentPlayerMark,
      state: ' ',
    };
  }

  get currentPlayerName() {
    return this.playerNames[this.#currentPlayerMark];
  }

  get currentPlayerMark() {
    return this.#currentPlayerMark;
  }

  checkWin(player, row, col) {
    const params = { player, col, row };
    // TODO: Refactor theses validator to a Chain of Responsibility
    if (this.#rowCheck(params)) return 'Win by Row';
    if (this.#colCheck(params)) return 'Win by Column';
    if (this.#dialLeftCheck(params)) return 'win by diagonal Left';
    if (this.#dialRightCheck(params)) return 'win diagonal Right';
    if (this.board.every((row) => row.every((col) => col !== ''))) {
      return 'Tie';
    }
    return null;
  }

  reset() {
    this.board = this.#createBoard(this.cols, this.rows);
  }

  #createBoard(cols, rows) {
    return new Array(rows).fill(1).map(() => new Array(cols).fill(''));
  }

  #togglePlayer() {
    let player = TicTacToe.EX;
    if (this.#currentPlayerMark === TicTacToe.EX) player = TicTacToe.ZERO;
    if (this.#currentPlayerMark === TicTacToe.ZERO) player = TicTacToe.EX;
    this.#currentPlayerMark = player;
    return player;
  }

  #rowCheck({ player, row, col }) {
    let left = true;
    let right = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += player === (this.board[row][col] ?? '');
        } else {
          if (left) {
            left = player === (this.board[row][col - current] ?? '');
            count += left;
          }

          if (right) {
            right = player === (this.board[row][col + current] ?? '');
            count += right;
          }
        }
        return count;
      }, 0) === this.match
    );
  }

  #colCheck({ player, row, col }) {
    let left = true;
    let right = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += player === (this.board[row][col] ?? '');
        } else {
          if (left) {
            left = player === (this.board[row - current]?.[col] ?? '');
            count += left;
          }

          if (right) {
            right = player === (this.board[row + current]?.[col] ?? '');
            count += right;
          }
        }

        return count;
      }, 0) === this.match
    );
  }

  #dialLeftCheck({ player, row, col }) {
    let left = true;
    let right = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += player === (this.board[row][col] ?? '');
        } else {
          if (left) {
            left = player === (this.board[row - current]?.[col - current] ?? '');
            count += left;
          }

          if (right) {
            right = player === (this.board[row + current]?.[col + current] ?? '');
            count += right;
          }
        }
        return count;
      }, 0) === this.match
    );
  }

  #dialRightCheck({ player, row, col }) {
    let left = true;
    let right = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += player === (this.board[row][col] ?? '');
        } else {
          if (left) {
            left = player === (this.board[row - current]?.[col + current] ?? '');
            count += left;
          }

          if (right) {
            right = player === (this.board[row + current]?.[col - current] ?? '');
            count += right;
          }
        }

        return count;
      }, 0) === this.match
    );
  }
}
