import { AbstractComponent } from '../utils/AbstractComponent.js';
import { createTag } from '../utils/dom.helper.js';

export class HomePage extends AbstractComponent {
  static name = 'app-home-page';

  static get template() {
    return `
      <template>
        <section>
          <header class="header">
            <h1>Choose match:</h1>
          </header>
          <div class="actions">
            <button id="versus-cpu" disabled="true" class="btn" data-type="cpu">
              1 VS AI
              <small>
                Coming Soon
              </small>
            </button>
            <button id="versus-people" class="btn"  data-type="1-vs-1">
              1 VS 1
            </button>
          </div>
        </section>
      <template>`;
  }

  static get style() {
    return /*css*/ `
      .actions {
        display: grid;
        height: 100%;
        grid-template-columns: 1fr 1fr;
        gap: 1.24rem;
      }   

      .btn {
        font-size: 1.25rem;
        height: 100px;
        padding: .5rem 1rem;
      }

      .btn > small {
        font-size: 0.75rem;
        padding: .25rem;
        color: white;
        background: #515151;
        border-radius: 4px;
      }

      .btn:disabled {
        opacity: 0.7;
      }

      .actions {
        display: grid;
        gap: .5rem;
      }

      .header {
        text-align: center;
      }
    `;
  }

  constructor() {
    super(HomePage.style);
    this.actionHandler = this.#action.bind(this);
  }

  connectedCallback() {
    this._buildTemplate(HomePage.template);
    this.#setActions();
  }

  #setActions() {
    this.shadowRoot.querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('click', this.actionHandler);
    });
  }

  #action({ target }) {
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
        detail: {
          action: 'goto',
          params: { type: target.dataset.type },
        },
      })
    );
  }
}

customElements.define(HomePage.name, HomePage);
