import { HomePage } from './pages/home';
import { SettingPage } from './pages/setting-page';
import { GamePage } from './pages/game-page';
import { LayoutComponent } from './components/Layout';
import { createTag } from './utils/dom.helper';

// document.querySelector('#app').innerHTML = '<home-page></home-page>';
// document.querySelector('home-page').addEventListener('change_page', console.log);

// document.querySelector('#app').innerHTML = '<setting-page></setting-page>';
// document.querySelector('setting-page').addEventListener('change_page', console.log);

// document.querySelector('#app').innerHTML = '<game-page cols="3" rows="3" match="3" ></game-page>';
// document.querySelector('game-page').addEventListener('change_page', console.log);

const nextStep = {
  [HomePage.name]: {
    element: SettingPage.name,
    attrs: {},
  },
  [SettingPage.name]: {
    element: GamePage.name,
    attrs: { cols: 3, rows: 3, match: 3 },
  },
  [GamePage.name]: {
    element: HomePage.name,
    attrs: {},
  },
};

const initial = HomePage.name;

class App {
  #container;
  #action;

  constructor(initial) {
    this.#action = this.action.bind(this);
    this.createContainer();
    this.render(initial);
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
    this.step.addEventListener('action', this.#action);
    this.#container.append(this.step);
  }

  action({ target, detail }) {
    if (detail.action === 'goto') {
      this.goTo(target.localName, detail.params ?? {});
    }
  }

  createContainer() {
    this.#container = createTag('app-layout');
    document.querySelector('#app').append(this.#container);
  }
}

new App(initial);
