import { createTag } from '../utils/dom.helper';
import { AbstractComponent } from '../utils/AbstractComponent';

export class Input extends AbstractComponent {
  static formAssociated = true;

  static name = 'input-component';

  static get template() {
    return `<template><template>`;
  }

  static get style() {
    return /*css*/ `
      .input {
        height: 40px;
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
    const container = createTag('div', { class: 'container' });

    const label = createTag('label', { class: 'label', htmlFor: this.name });
    label.textContent = this.label;

    const attrs = this.getAttributeNames().reduce((temp, name) => ({ ...temp, [name]: this.getAttribute(name) }), {});

    this.input = createTag('input', {
      ...attrs,
      id: `${attrs.name}-input`,
      class: 'input',
    });

    container.appendChild(label);
    container.appendChild(this.input);
    this.shadowRoot.appendChild(container);
  }

  #internals() {
    this._internals.setFormValue(this.value);
    this._internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
    this.input.addEventListener('input', () => this.#handleInput());
  }

  #handleInput() {
    this._internals.setValidity(this.input.validity, this.input.validationMessage, this.input);
    this._internals.setFormValue(this.input.value);
  }
}

customElements.define(Input.name, Input);
