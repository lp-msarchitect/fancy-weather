export default class Dispatcher {
  constructor() {
    this.subscribers = [];
  }

  subscribe(handler) {
    if (this.subscribers.indexOf(handler) === -1) {
      this.subscribers.push(handler);
    }
  }

  unsubscribe(handler) {
    handlerIndex = this.subscribers.indexOf(handler);
    if (handlerIndex !== -1) this.subscribers.splice(handlerIndex, 1);
  }

  unsubscribeAll() {
    this.subscribers = [];
  }

  broadcast(data) {
    this.subscribers.forEach((handler) => {
      if (typeof handler === 'function') handler(data);
    });
  }
}
