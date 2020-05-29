import GeoDataView from './geoDataView';
import Ymap from './Ymap';

export default class GeoData {
  constructor(global) {
    this.view = new GeoDataView(global);
    this.ymap = new Ymap(this.view.getMapElement());
  }

  async initMap() {
    await this.ymap.init();
    return this;
  }

  get element() {
    return this.view.element;
  }

  goTo(coords) {
    this.ymap.goTo(coords);
    this.view.coords = coords;
  }
}
