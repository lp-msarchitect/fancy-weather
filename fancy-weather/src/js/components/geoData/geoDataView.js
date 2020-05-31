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
    const latDMS = ConvertDDToDMS(value.latitude);
    const lonDMS = ConvertDDToDMS(value.longitude);
    this.element.querySelector('#latitude').innerHTML = `Latitude: ${latDMS}`;
    this.element.querySelector('#longitude').innerHTML = `Longitude: ${lonDMS}`;
  }

  getMapElement() {
    return this.element.querySelector('.geo__map');
  }
}
