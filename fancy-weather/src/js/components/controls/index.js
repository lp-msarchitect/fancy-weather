import ControlsView from './ControlsView';

export default class Controls {
  constructor(global, dispatcher) {
    this.dispatcher = dispatcher;
    this.view = new ControlsView(global);
    this.view.addEventListeners();
    this.view.setDispatcher(this.dispatcher);
  }

  get element() {
    return this.view.element;
  }

  subscribe(handler) {
    this.dispatcher.subscribe(handler);
  }

  unsubscribe(handler) {
    this.dispatcher.unsubscribe(handler);
  }

  dispose() {
    // TODO implement dispose function
  }
}
