import TodayView from './TodayView';
import TodayModel from './TodayModel';

export default class Today {
  constructor(global) {
    this.view = new TodayView(global);
    this.model = new TodayModel();
  }

  get element() {
    return this.view.element;
  }

  set coords(value) {
    this.model.coords = value;
    this.model.getCityName().then((city) => {
      this.view.city = city;
    });

    this.model.getCurrentState().then((state) => {
      console.log('weather satate: ', state);
      this.view.weatherState = state;
    });
  }
}
