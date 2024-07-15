import { AbstractComponent } from '../utils/AbstractComponent.js';
import { createTag } from '../utils/dom.helper.js';

export class GamePage extends AbstractComponent {
  static name = 'app-game-page';

  static get template() {
    return `
      <template>
        <section class="container">
          <header class="header">
            <h1 class="player-turn"></h1>
          </header>
          <div class="body"></div>
          <footer class="actions">
            <button id="new-match"   data-action="new" class="btn">New game</button>
            <button id="reset-match" data-action="reset" class="btn">Reset match</button>
          </footer>
        </section>
      </template>
    `;
  }

  static get style() {
    return /*css*/ `
      .container {
        display: grid;
        height: 100%;
        grid-template-rows: auto 1fr auto;
      }   

      .btn {
        margin-top: 4rem;
        font-size: 1.25rem;
        width: 100%;
        padding: .5rem 1rem;
      }

      .box {
        position: relative;
        border: 1px solid #e9e9e9;
      }

      .box__check {
        width: 100%;
        height: 100%;
        appearance: none; -webkit-appearance: none;
      }

      .box:has(.box__check[checked])::after{
        content:  var(--_text, 'X');
        place-content: center;
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--_box-color, cyan);
        color: var(--_text-color, black);
        top: 0;
        left: 0;
        font-size: min(10wv, 40px);
      }

      .box.zero-player {
        --_box-color: red;
        --_text-color: white;
        --_text: '0';
      }

      .header {
        text-align: center;
      }

      .board {
        display: grid;
        margin: auto;
        min-height: 300px;
        min-width: 300px;
        max-width: 400px;
        max-height: 400px;
        aspect-ratio: 1;
      }

      .actions {
        display: flex;
        gap: 3rem;
      }
    `;
  }

  constructor() {
    super(GamePage.style);
    this.actionHandler = this.#action.bind(this);
  }

  connectedCallback() {
    this._buildTemplate(GamePage.template);
    this.#initialize();
  }

  addMark({ row, col, mark }) {
    const target = this.$board.querySelector(`.box__check[data-col="${col}"][data-row="${row}"]`);
    target.setAttribute('disabled', '');
    target.setAttribute('checked', '');
    target.value = mark;
    target.parentNode.classList.add(mark);
  }

  set player(player) {
    this.$currentPlayer.textContent = `${player} turn`;
  }

  setWinState(state, winner) {
    this.$body.querySelectorAll('[type="checkbox"]').forEach((node) => node.setAttribute('disabled', ''));
    this.$currentPlayer.textContent = state !== 'Tie' ? `${winner} WINS!!!!!` : "It's a tie";
    this.$body.querySelector('.board').style.opacity = '.5';
  }

  reset(player) {
    if (this.$board) {
      this.$currentPlayer.textContent = `${player} turn`;
      this.$board.remove();
      this.#createBoxes();
    }
  }

  #initialize() {
    this.cols = +this.getAttribute('cols') ?? 3;
    this.rows = +this.getAttribute('rows') ?? 3;
    this.$currentPlayer = this.shadowRoot.querySelector('.player-turn');
    this.$body = this.shadowRoot.querySelector('.body');
    this.#setActions();
    this.#createBoxes();
    this.player = this.getAttribute('player') ?? 'x player';
  }

  #createBoxes() {
    this.$body.append(this.#getBoxes());
  }

  calculateSize(x, y, size) {
    return x < y ? size : (y / x) * 400;
  }

  #getBoxes() {
    const totalBoxes = this.cols * this.rows;
    this.$board = createTag('div', { class: 'board' });
    this.$board.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    this.$board.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    this.$board.style.width = `${this.calculateSize(this.rows, this.cols)}px`;
    this.$board.style.height = `${this.calculateSize(this.cols, this.rows)}px`;

    const box = new Array(totalBoxes).fill(true).map((_, index) => {
      const currentCol = index % this.cols;
      const currentRow = Math.floor(index / this.cols);
      const $checker = createTag('input', {
        type: 'checkbox',
        id: `check-${index}`,
        class: 'box__check',
        name: `check-${index}`,
        ariaLabel: `cols-${currentCol + 1} row-${currentRow + 1}`,
        dataCol: currentCol,
        dataRow: currentRow,
      });

      $checker.addEventListener('change', (evt) => {
        this.#handleCheckerChange(evt.target);
      });
      const $cont = createTag('div', { class: 'box' });
      $cont.append($checker);
      return $cont;
    });

    this.$board.append(...box);
    return this.$board;
  }

  #setActions() {
    this.shadowRoot.querySelectorAll('.btn').forEach(($button) => {
      $button.addEventListener('click', this.actionHandler);
    });
  }

  #action({ target }) {
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
        detail: {
          action: target.dataset.action,
          params: {},
        },
      })
    );
  }

  #handleCheckerChange(target) {
    // can move
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
        detail: {
          action: 'move',
          params: {
            row: target.dataset.row,
            col: target.dataset.col,
          },
        },
      })
    );
  }
}

customElements.define(GamePage.name, GamePage);
