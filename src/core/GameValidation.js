export class GameValidation {
  checkWin(board, params) {
    this.board = board;
    this.match = params.match;

    // TODO: Refactor theses validator to a Chain of Responsibility
    if (this.#rowCheck(params)) return 'Win by Row';
    if (this.#colCheck(params)) return 'Win by Column';
    if (this.#dialRightCheck(params)) return 'win by diagonal';
    if (this.#dialLeftCheck(params)) return 'win diagonal';
    if (this.board.every((row) => row.every((col) => col !== ''))) {
      return 'Tie';
    }

    return null;
  }

  #rowCheck({ mark, row, col }) {
    let desc = true;
    let asc = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += mark === (this.board[row][col] ?? '');
        } else {
          if (desc) {
            desc = mark === (this.board[row][col - current] ?? '');
            count += desc;
          }

          if (asc) {
            asc = mark === (this.board[row][col + current] ?? '');
            count += asc;
          }
        }
        return count;
      }, 0) === this.match
    );
  }

  #colCheck({ mark, row, col }) {
    let desc = true;
    let asc = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += mark === (this.board[row][col] ?? '');
        } else {
          if (desc) {
            desc = mark === (this.board[row - current]?.[col] ?? '');
            count += desc;
          }

          if (asc) {
            asc = mark === (this.board[row + current]?.[col] ?? '');
            count += asc;
          }
        }

        return count;
      }, 0) === this.match
    );
  }

  #dialRightCheck({ mark, row, col }) {
    let desc = true;
    let asc = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += mark === (this.board[row][col] ?? '');
        } else {
          if (desc) {
            desc = mark === (this.board[row - current]?.[col - current] ?? '');
            count += desc;
          }

          if (asc) {
            asc = mark === (this.board[row + current]?.[col + current] ?? '');
            count += asc;
          }
        }
        return count;
      }, 0) === this.match
    );
  }

  #dialLeftCheck({ mark, row, col }) {
    let desc = true;
    let asc = true;
    return (
      new Array(this.match).fill(1).reduce((count, _, current) => {
        if (!current) {
          count += mark === (this.board[row][col] ?? '');
        } else {
          if (desc) {
            desc = mark === (this.board[row - current]?.[col + current] ?? '');
            count += desc;
          }

          if (asc) {
            asc = mark === (this.board[row + current]?.[col - current] ?? '');
            count += asc;
          }
        }

        return count;
      }, 0) === this.match
    );
  }
}

export const ticTacToeValidator = new GameValidation();
