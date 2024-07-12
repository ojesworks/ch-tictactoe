import { AbstractComponent } from '../utils/AbstractComponent.js';
import { createTag } from '../utils/dom.helper.js';

export class HomePage extends AbstractComponent {
  static name = 'home-page';
  static get style() {
    return /*css*/ `
      .container {
        display: grid;
        height: 100%;
        grid-template-rows: auto 1fr auto;
      }   

      .btn {
        font-size: 1.25rem;
        width: 100%;
        padding: .5rem 1rem;
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
    this.#build();
  }

  #build() {
    const container = createTag('section', { class: 'container' });
    container.append(this.#getHeader());
    container.append(this.#getBody());
    this.shadowRoot.appendChild(container);
  }

  #getHeader() {
    const header = createTag('header', { class: 'header' });
    const title = createTag('h1');
    title.textContent = 'Tic Tac Toe';
    header.append(title);

    return header;
  }

  #getBody() {
    const body = createTag('div', { class: 'actions' });
    const comingSoon = createTag('small');
    comingSoon.textContent = 'Coming Soon';

    const buttonCPU = createTag('button', { id: 'versus-cpu', disabled: true, class: 'btn' });
    buttonCPU.textContent = '1 VS AI';
    buttonCPU.append(comingSoon);

    const button = createTag('button', { id: 'versus-people', class: 'btn' });
    button.textContent = '1 VS 1';
    button.addEventListener('click', () => {
      console.log('go to 1 vs 1');
      this.dispatchEvent(
        new CustomEvent('change_page', {
          bubbles: true,
          composed: true,
          detail: { selection: '1-vs-1' },
        })
      );
    });

    body.append(buttonCPU);
    body.append(button);

    return body;
  }
}

customElements.define(HomePage.name, HomePage);
