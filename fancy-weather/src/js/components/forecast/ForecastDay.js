import ViewComponent from '../ViewComponent';

export default class ForecastDay extends ViewComponent {
  constructor(global) {
    const html = `<div class="forecast__day day">
            <span class="day__weekday"></span>
            <span class="day__temperature"></span>
        </div>`;
    super(global, html);
  }

  redraw(dayState, unit = 'c') {
    let temp = Math.round(dayState.avgTempC);
    if (unit === 'f') {
      temp = Math.round(dayState.avgTempF);
    }
    this.element.querySelector('.day__weekday').innerHTML = dayState.weekDay;
    this.element.querySelector('.day__temperature').innerHTML = `${temp}°`;
    this.element.querySelector(
      '.day__temperature'
    ).style.backgroundImage = `url(${dayState.icon})`;
  }
}
