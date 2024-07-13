import { createTag } from '../utils/dom.helper';
import { AbstractComponent } from '../utils/AbstractComponent';

export class Input extends AbstractComponent {
  static formAssociated = true;

  static name = 'input-component';

  static get template() {
    return `
      <template>
        <div class="container">
          <label class="label" html-for="input"></label>
          <input id="input" class="input">
        </div>
      </template>
    `;
  }

  static get style() {
    return /*css*/ `
      .input {
        height: 40px;
        padding: .25rem
      }
      .label {
        font-size: 1.25rem;
      }

      .container {
        display: grid;
        gap: .5rem
      }
      
    `;
  }
  static get observedAttributes() {
    return ['required', 'value'];
  }

  constructor() {
    super(Input.style, {
      mode: 'open',
      delegatesFocus: true,
    });
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    this._buildTemplate(Input.template);
    this.#build();
    this.#internals();
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  #build() {
    this.label = this.shadowRoot.querySelector('label');
    this.label.textContent = this.getAttribute('label');
    this.label.htmlFor = this.getAttribute('id');

    this.input = this.shadowRoot.querySelector('input');
    this.getAttributeNames().forEach((name) => this.input.setAttribute(name, this.getAttribute(name)));
  }

  #internals() {
    this._internals.setFormValue(this.input.value);
    this._internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
    this.input.addEventListener('input', () => this.#handleInput());
  }

  #handleInput() {
    this._internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
    this._internals.setFormValue(this.input.value);
  }
}

customElements.define(Input.name, Input);
