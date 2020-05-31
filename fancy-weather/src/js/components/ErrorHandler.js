export default class ErrorHandler {
  constructor(element = null) {
    this.element = element;
  }

  draw(errorText) {
    this.element.innerHTML = errorText;
  }

  clear() {
    this.element.innerHTML = '';
  }

  update(event) {
    if (event.name === 'error') {
      this.draw(event.value);
    } else {
      this.clear();
    }
  }
}
