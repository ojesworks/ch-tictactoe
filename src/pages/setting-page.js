import { AbstractComponent } from '../utils/AbstractComponent.js';
import { Input } from '../components/Input';
import { createTag } from '../utils/dom.helper.js';

export class SettingPage extends AbstractComponent {
  static name = 'setting-page';
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
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.#getContainer());
  }

  #getContainer() {
    this.formContainer = createTag('form', { class: 'container' });
    this.formContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const settings = Object.fromEntries(new FormData(this.formContainer));
      this.dispatchEvent(
        new CustomEvent('change_page', {
          bubbles: true,
          composed: true,
          detail: { settings },
        })
      );
    });

    const xPlayer = createTag('input-component', {
      required: true,
      placeholder: 'Enter your name',
      name: 'x-player-name',
      label: 'X Player',
      minlength: 3,
    });

    const oPlayer = createTag('input-component', {
      required: true,
      placeholder: 'Enter your name',
      name: 'o-player-name',
      label: 'O Player',
      minlength: 3,
    });

    const submit = createTag('button', { id: 'setting-submit', class: 'btn' });
    submit.textContent = 'Continue';

    this.formContainer.append(xPlayer);
    this.formContainer.append(oPlayer);
    this.formContainer.append(submit);

    return this.formContainer;
  }
}

customElements.define(SettingPage.name, SettingPage);
