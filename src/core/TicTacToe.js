import { ticTacToeValidator } from './GameValidation';

export class TicTacToe {
  #playerController;
  #board;
  #match;

  constructor(playerController, boardController) {
    this.#playerController = playerController;
    this.#board = boardController;
  }

  set versusMatch(value) {
    // TODO: Create match controller by versusType.
  }

  getRowsAndCols() {
    return { cols: this.#board.cols, rows: this.#board.rows };
  }

  setConfig({ match, ...value }) {
    this.#match = match;
    this.#board.setRowAndCols(value);
  }

  setPlayers(value) {
    this.#playerController.setPlayers(value.xPlayer, value.oPlayer);
  }

  reset(view) {
    this.#board.reset();
    view.player = this.#playerController.togglePlayer();
    view.reset?.(this.#playerController.currentPlayerName);
  }

  move(row, col, view) {
    const mark = this.#playerController.currentPlayerMark;
    if (this.#board.registerMove(row, col, mark)) {
      view?.addMark({ row, col, mark });
      // Verify if it is game over
      const gameState = this.#board.checkWin(ticTacToeValidator, { row, col, match: this.#match, mark });
      if (gameState) {
        view.setWinState(gameState, this.#playerController.currentPlayerName);
      } else {
        view.player = this.#playerController.togglePlayer();
      }
    }
  }
}
