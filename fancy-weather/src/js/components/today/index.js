import TodayView from './TodayView';
import TodayModel from './TodayModel';
import TodayController from './TodayController';

export default class Today {
  constructor(global, dispatcher) {
    this.dispatcher = dispatcher;
    this.view = new TodayView(global);
    this.model = new TodayModel();
    this.controller = new TodayController(
      this.view,
      this.model,
      this.dispatcher
    );
  }

  get element() {
    return this.view.element;
  }

  set coords(value) {
    this.controller.coords = value;
  }

  update(event) {
    if (event.name === 'search') {
      this.coords = event.value;
    }

    if (event.name === 'changeunits') {
      this.view.changeUnits(event.value);
    }
  }
}
