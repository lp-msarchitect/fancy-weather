import ViewComponent from '../ViewComponent';

export default class GeoDataView extends ViewComponent {
  constructor(global) {
    const html = `
      <section class="geo main__geo">
        <div class="geo__map"></div>
        <span class="geo__coordinates" id="latitude">Latitude: 53°54'</span>
        <span class="geo__coordinates"  id="longitude">Longitude: 27°34'</span>
      </section>
    `;
    super(global, html);
  }

  set coords(value) {
    this.element.querySelector(
      '#latitude'
    ).innerHTML = `Latitude: ${value.latitude}`;
    this.element.querySelector(
      '#longitude'
    ).innerHTML = `Longitude: ${value.longitude}`;
  }

  getMapElement() {
    return this.element.querySelector('.geo__map');
  }
}
