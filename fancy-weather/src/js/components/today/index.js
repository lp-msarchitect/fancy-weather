import TodayView from './TodayView';
import TodayModel from './TodayModel';
import TodayController from './TodayController';

export default class Today {
  constructor(global) {
    this.view = new TodayView(global);
    this.model = new TodayModel();
    this.controller = new TodayController(this.view, this.model);
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
  }
}
