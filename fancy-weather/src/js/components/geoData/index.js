import GeoDataView from './geoDataView';
import Ymap from './Ymap';

export default class GeoData {
  constructor(global) {
    this.view = new GeoDataView(global);
    this.ymap = new Ymap(this.view.getMapElement());
  }

  async initMap(coords) {
    await this.ymap.init();
    this.goTo(coords);
  }

  get element() {
    return this.view.element;
  }

  goTo(coords) {
    this.ymap.goTo(coords, false);
    this.view.coords = coords;
  }

  update(event) {
    if (event.name === 'search') {
      this.goTo(event.value);
    }
  }
}
