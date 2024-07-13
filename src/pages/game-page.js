import { AbstractComponent } from '../utils/AbstractComponent.js';
import { createTag } from '../utils/dom.helper.js';
import { TicTacToe } from '../utils/game.js';

export class GamePage extends AbstractComponent {
  static name = 'app-game-page';

  static get template() {
    return `<template><template>`;
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
      }
    `;
  }

  constructor() {
    super(GamePage.style);
  }

  connectedCallback() {
    this.container = createTag('section', { class: 'container' });
    this.container.append(this.#getHeader());
    this.container.append(this.#getBody());
    this.cols = +this.getAttribute('cols') ?? 3;
    this.rows = +this.getAttribute('rows') ?? 3;
    this.matchCheck = +this.getAttribute('match') ?? 3;
    this.controller = new TicTacToe({ cols: this.cols, rows: this.rows, match: this.matchCheck });
    this.shadowRoot.appendChild(this.container);
  }

  #getHeader() {
    const header = createTag('header', { class: 'header' });
    this.$currentPlayer = createTag('h1');
    this.$currentPlayer.textContent = '';
    header.append(this.$currentPlayer);

    return header;
  }

  #getBody() {
    const boxes = this.#getBoxes();

    const button = createTag('button', { id: 'reset-match', class: 'btn' });
    button.textContent = 'Reset match';
    button.addEventListener('click', () => {
      this.controller.reset();
      this.body.remove();
      this.container.append(this.#getBody());
      this.$currentPlayer.textContent = `${this.controller.currentPlayerName} turn`;
    });

    this.body = createTag('div', { class: 'body' });
    this.body.append(boxes);
    this.body.append(button);

    return this.body;
  }

  #getBoxes() {
    const cols = this.getAttribute('cols') ?? 3;
    const rows = this.getAttribute('rows') ?? 3;
    const boxes = createTag('div', { class: 'board' });
    const totalBoxes = cols * rows;
    boxes.style.gridTemplateColumns = `repeat(${cols}, minmax(min(30px, 10vw), 1fr)`;
    boxes.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    boxes.style.height = `${rows * 70}px`;

    const box = new Array(totalBoxes).fill(true).map((_, index) => {
      const currentCol = index % cols;
      const currentRow = Math.floor(index / cols);
      const checker = createTag('input', {
        type: 'checkbox',
        id: `check-${index}`,
        class: 'box__check',
        name: `check-${index}`,
        ariaLabel: `cols-${currentCol + 1} row-${currentRow + 1}`,
        dataCol: currentCol,
        dataRow: currentRow,
      });

      checker.addEventListener('change', (evt) => {
        this.#handleCheckerChange(evt.target);
      });
      const cont = createTag('div', { class: 'box' });
      cont.append(checker);
      return cont;
    });

    boxes.append(...box);
    return boxes;
  }

  #handleCheckerChange(target) {
    target.setAttribute('disabled', '');
    target.setAttribute('checked', '');
    target.value = this.controller.currentPlayerMark;
    target.parentNode.classList.add(this.controller.currentPlayerMark);

    const { player, state, winner } = this.controller.registerMove(target.dataset.row, target.dataset.col);
    this.$currentPlayer.textContent = `${player} turn`;

    if (state) {
      this.body.querySelectorAll('[type="checkbox"]').forEach((node) => node.setAttribute('disabled', ''));
      this.$currentPlayer.textContent = state !== 'Tie' ? `${winner} WINS!!!!!` : "It's a tie";
      this.body.querySelector('.board').style.opacity = '.5';
    }
  }
}

customElements.define(GamePage.name, GamePage);
