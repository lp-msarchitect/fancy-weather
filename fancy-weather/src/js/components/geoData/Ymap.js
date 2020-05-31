import ymaps from 'ymaps';

export default class Ymap {
  constructor(mapElement) {
    this.mapElement = mapElement;
  }

  async init(mapElement = this.mapElement) {
    try {
      this.ymaps = await ymaps.load();

      this.map = new this.ymaps.Map(mapElement, {
        center: [0, 0],
        zoom: 8,
      });

      this.mapMark = new this.ymaps.Placemark(this.map.getCenter());
      this.map.geoObjects.add(this.mapMark);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }

  goTo(coords) {
    this.map.setCenter([coords.latitude, coords.longitude]);
    this.mapMark.geometry.setCoordinates(this.map.getCenter());
  }
}
