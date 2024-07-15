import { HomePage } from './pages/home';
import { SettingPage } from './pages/setting-page';
import { GamePage } from './pages/game-page';
import { LayoutComponent } from './components/Layout';
import { createTag } from './utils/dom.helper';
import { TicTacToe } from './core/TicTacToe';
import { GamePlayer } from './core/GamePlayer';
import { GameBoard } from './core/GameBoard';

const GAME_BOARD_CONFIG = { cols: 3, rows: 3, match: 3 };

const nextStep = {
  [HomePage.name]: {
    element: SettingPage.name,
    attrs: {},
  },
  [SettingPage.name]: {
    element: GamePage.name,
    attrs: { ...GAME_BOARD_CONFIG },
  },
  [GamePage.name]: {
    element: HomePage.name,
    attrs: {},
  },
};

const initial = GamePage.name;

class App {
  #container;
  #action;
  #game;

  constructor(initial) {
    this.#game = new TicTacToe(new GamePlayer(), new GameBoard());
    this.#game.setConfig(GAME_BOARD_CONFIG);
    this.#action = this.action.bind(this);
    this.createContainer();
    this.render(initial, GAME_BOARD_CONFIG);
  }

  goTo(to, extra = {}) {
    // Unmount and remove action events
    if (this.step) {
      this.step.removeEventListener('action', this.#action);
      this.step.remove();
    }

    const newStep = nextStep[to];
    if (newStep) {
      this.render(newStep.element, { ...newStep.attrs, ...extra });
    } else {
      console.log(`${to} page does not exist`);
    }
  }

  render(element, attrs) {
    this.step = createTag(element, attrs);
    this.step.name = element;
    this.step.addEventListener('action', this.#action);
    this.#container.append(this.step);
  }

  action({ target, detail }) {
    // TODO: create action map
    if (detail.action === 'setVersusMatch') {
      this.#game.versusMatch = detail.params.type;
      this.goTo(target.localName);
    }

    if (detail.action === 'setPlayers') {
      this.#game.setPlayers(detail.params.xPlayer, detail.params.oPlayer);
      this.goTo(target.localName, { player: detail.params.xPlayer });
    }

    if (detail.action === 'reset') {
      this.#game.reset(this.step);
    }

    if (detail.action === 'move') {
      this.#game.move(detail.params.row, detail.params.col, this.step);
    }

    if (detail.action === 'new') {
      this.#game.reset(this.step);
      this.goTo(target.localName);
    }
  }

  createContainer() {
    this.#container = createTag('app-layout');
    document.querySelector('#app').append(this.#container);
  }
}

new App(initial);
