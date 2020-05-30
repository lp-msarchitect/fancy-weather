import Dispatcher from '../../utils/Dispather';
import ControlsView from './ControlsView';

export default class Controls {
  constructor(global) {
    this.dispatcher = new Dispatcher();
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

  dispose() {}
}
