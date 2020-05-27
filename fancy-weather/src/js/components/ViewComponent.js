export default class ViewComponent {
  constructor(global, html = '') {
    this.global = global;
    this.html = html;
    this.htmlElement = null;
  }

  get element() {
    return this.htmlElement || this.createElement();
  }

  createElement() {
    const tmpElement = this.global.createElement('div');
    tmpElement.innerHTML = this.html;
    this.htmlElement = tmpElement.firstElementChild;
    return this.htmlElement;
  }
}
