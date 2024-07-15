import { MARK_TYPE } from '../utils/types';

export class GamePlayer {
  static TURN_TYPE = {
    [MARK_TYPE.EX]: MARK_TYPE.ZERO,
    [MARK_TYPE.ZERO]: MARK_TYPE.EX,
  };

  #currentPlayerMark = MARK_TYPE.EX;
  #playerNames = {
    [MARK_TYPE.EX]: 'Player X',
    [MARK_TYPE.ZERO]: 'Player 0',
  };
  constructor() {}

  setPlayers(x, o) {
    this.#playerNames = {
      [MARK_TYPE.EX]: x ?? 'Player X',
      [MARK_TYPE.ZERO]: o ?? 'Player 0',
    };
  }

  get currentPlayerName() {
    return this.#playerNames[this.#currentPlayerMark];
  }

  get currentPlayerMark() {
    return this.#currentPlayerMark;
  }

  togglePlayer() {
    this.#currentPlayerMark = GamePlayer.TURN_TYPE[this.#currentPlayerMark];
    return this.#currentPlayerMark;
  }
}
