import { AbstractComponent } from '../utils/AbstractComponent';
import { createTag } from '../utils/dom.helper';

export class LayoutComponent extends AbstractComponent {
  static name = 'app-layout';
  static get template() {
    return /*template*/ `
    <template>
      <article>
      <header>
      <h1>Tic tac toe</h1>
      <p>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.</p>
      </header>
        <div class="container">
          <slot></slot>
        </div>
      </article>
      </template>
`;
  }

  static get style() {
    return /*css*/ `
    :host {
      place-align: center;
    }

      h1 {
        color: white;
        font-size: 2rem;
        font-family: arial
        font-weight: 400;
        text-align: center;
      }

      .container {
        max-width: 840px;
        padding: 0.25rem;
        margin: auto;
        border-radius: .25rem;
        background: white;
      }
    `;
  }

  constructor() {
    super(LayoutComponent.style);
  }

  connectedCallback() {
    this._buildTemplate(LayoutComponent.template);
  }
}

customElements.define(LayoutComponent.name, LayoutComponent);
