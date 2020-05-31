import ForecastView from './ForecastView';
import ForecastModel from './ForecastModel';

export default class Forecast {
  constructor(global) {
    this.view = new ForecastView(global);
    this.model = new ForecastModel(3);
  }

  get element() {
    return this.view.element;
  }

  set coords(value) {
    this.model.coords = value;
    this.model.getForecastDays(value).then((days) => {
      this.view.drawDays(days);
    });
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
