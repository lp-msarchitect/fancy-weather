import ViewComponent from '../ViewComponent';
import { ConvertDDToDMS } from '../../utils/geoUtils';

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
    let latDMS = ConvertDDToDMS(Math.abs(value.latitude));
    latDMS = value.latitude < 0 ? `${latDMS} S` : `${latDMS} N`;
    let lonDMS = ConvertDDToDMS(Math.abs(value.longitude));
    lonDMS = value.longitude < 0 ? `${lonDMS} W` : `${lonDMS} E`;
    this.element.querySelector('#latitude').innerHTML = `Latitude: ${latDMS}`;
    this.element.querySelector('#longitude').innerHTML = `Longitude: ${lonDMS}`;
  }

  getMapElement() {
    return this.element.querySelector('.geo__map');
  }
}
