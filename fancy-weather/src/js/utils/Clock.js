export default class Clock {
  constructor(date = 0) {
    this.date = date;
    this.startTick = Date.now();
    this.init();
    this.subscribers = [];
  }

  init() {
    this.timerId = setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    const delta = Date.now() - this.startTick;

    this.startTick = Date.now();
    this.date += delta;

    this.broadcast(this.date);
  }

  destroy() {
    this.subscribers = [];
    clearInterval(this.timerId);
  }

  subscribe(handler) {
    if (this.subscribers.indexOf(handler) === -1) {
      this.subscribers.push(handler);
    }
  }

  unsubscribe(handler) {
    const handlerIndex = this.subscribers.indexOf(handler);
    if (handlerIndex !== -1) {
      this.subscribers.splice(handlerIndex, 1);
    }
  }

  broadcast(data) {
    this.subscribers.forEach((handler) => {
      handler(data);
    });
  }
}
