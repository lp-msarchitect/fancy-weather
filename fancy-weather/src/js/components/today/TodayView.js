import ViewComponent from '../ViewComponent';

export default class TodayView extends ViewComponent {
  constructor(global) {
    const html = `<section class="today main__today">
        <p class="today__city-title">Minsk, Belarus</p>
        <p class="today__date-time">
          <span>Mon 28 October</span><span>17:23</span>
        </p>
        <p class="today__temperature today__temperature--cloudy">10</p>
        <span class="today__grad">°</span>
        <div class="today__summary">
          <p>overcast</p>
          <p id="fells-like">fells like: 7°</p>
          <p id="wind">wind: 2 m/s</p>
          <p id="humidity">humidity: 83%</p>
        </div>
      </section>`;
    super(global, html);
  }

  set city(value) {
    this.element.querySelector('.today__city-title').innerHTML = value;
  }

  set weatherState(wetherObj) {
    this.element.querySelector('.today__temperature').innerHTML =
      wetherObj.temp_c;
    this.element.querySelector(
      '#fells-like'
    ).innerHTML = `fells like: ${wetherObj.feels_like_c}°`;
    this.element.querySelector(
      '#wind'
    ).innerHTML = `wind: ${wetherObj.wind_mps} m/s`;
    this.element.querySelector(
      '#humidity'
    ).innerHTML = `humidity: ${wetherObj.humidity}%`;
    // this.element.querySelector('.today__city-title').innerHTML = wetherObj;
    // this.element.querySelector('.today__city-title').innerHTML = wetherObj;
  }
}
