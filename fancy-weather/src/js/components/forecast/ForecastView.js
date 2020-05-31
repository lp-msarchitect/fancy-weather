import ViewComponent from '../ViewComponent';
import ForecastDay from './ForecastDay';

export default class ForecastView extends ViewComponent {
  constructor(global, daysCount = 3) {
    const html = `<div class="forecast main__forecast">
        
      </div>`;

    super(global, html);
    this.daysCount = daysCount;
    this.dayElements = [];
  }

  drawDays(days) {
    if (this.dayElements.length === 0) this.initDayElements();

    this.dayElements.forEach((dayElement, index) => {
      const currentDay = days[index];
      dayElement.redraw(currentDay);
    });

    this.days = days;
  }

  initDayElements() {
    for (let i = 0; i < this.daysCount; i += 1) {
      const dayElement = new ForecastDay(this.global);
      this.dayElements.push(dayElement);
      this.element.insertAdjacentElement('beforeend', dayElement.element);
    }
  }

  changeUnits(unit) {
    this.dayElements.forEach((dayElement, index) => {
      const currentDay = this.days[index];
      dayElement.redraw(currentDay, unit);
    });
  }
}
