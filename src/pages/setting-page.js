import { AbstractComponent } from '../utils/AbstractComponent.js';
import { Input } from '../components/Input';

export class SettingPage extends AbstractComponent {
  static name = 'app-setting-page';

  static get template() {
    return `
      <template>
       <section>
          <header class="header">
            <h1>Add your name:</h1>
          </header>
          <form class="container">
            <input-component required placeholder="Enter X player name" id="x-player" name="x-player-name" label="X Player" minlength="3"></input-component>
            <input-component required placeholder="Enter O player name" id="o-player"  name="o-player-name" label="O Player" minlength="3"></input-component>
            <button id="setting-submit" class="btn">
              Start
            </button>
          </form>
        </section>

      </template>
    `;
  }

  static get style() {
    return /*css*/ `
       .container {
        display: grid;
        gap: 1rem;
      }

      .btn {
        margin-top: 1rem;
        width: 100%;
        height: 2.5rem;
      }
    `;
  }

  constructor() {
    super(SettingPage.style);
    this.actionHandler = this.#action.bind(this);
  }

  connectedCallback() {
    this._buildTemplate(SettingPage.template);
    this.#setActions();
  }

  #setActions() {
    this.shadowRoot.querySelector('form').addEventListener('submit', this.actionHandler);
  }

  #action({ target }) {
    const params = Object.fromEntries(new FormData(target));
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
        detail: { action: 'goto', params },
      })
    );
  }
}

customElements.define(SettingPage.name, SettingPage);
