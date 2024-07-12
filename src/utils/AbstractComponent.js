export class AbstractComponent extends HTMLElement {
  constructor(styles, mode = 'open') {
    super();
    this.attachShadow({ mode });
    this.#buildStyles(styles);
  }

  #buildStyles(styles) {
    var sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);

    this.shadowRoot.adoptedStyleSheets.push(sheet);
  }
}
