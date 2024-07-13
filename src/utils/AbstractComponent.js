export class AbstractComponent extends HTMLElement {
  constructor(styles, mode = { mode: 'open' }) {
    super();
    if (mode) {
      this.attachShadow(mode);
      this.#buildStyles(styles);
    }
  }

  _buildTemplate(template) {
    this.template = new DOMParser().parseFromString(template, 'text/html').querySelector('template');
    this.shadowRoot.appendChild(this.template.content);
  }

  #buildStyles(styles) {
    var sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);

    this.shadowRoot.adoptedStyleSheets.push(sheet);
  }
}
