import ViewComponent from '../ViewComponent';

export default class ForecastDay extends ViewComponent {
  constructor(global) {
    const html = `<div class="forecast__day day">
            <span class="day__weekday"></span>
            <span class="day__temperature"></span>
        </div>`;
    super(global, html);
  }

  redraw(dayState) {
    console.log('draw day state: ', dayState);
    this.element.querySelector('.day__weekday').innerHTML = dayState.weekDay;
    this.element.querySelector('.day__temperature').innerHTML = `${Math.round(
      dayState.avgTempC
    )}°`;
    this.element.querySelector(
      '.day__temperature'
    ).style.backgroundImage = `url(${dayState.icon})`;
  }
}
