import ymaps from 'ymaps';

export default class Ymap {
  constructor(mapElement) {
    this.mapElement = mapElement;
  }

  async init(mapElement = this.mapElement) {
    try {
      const maps = await ymaps.load();

      this.map = new maps.Map(mapElement, {
        center: [-8.369326, 115.166023],
        zoom: 8,
      });
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }

  goTo(coords, isSlow = true) {
    if (isSlow) {
      this.map.panTo([coords.latitude, coords.longitude], { delay: 1500 });
    } else {
      this.map.setCenter([coords.latitude, coords.longitude]);
    }
  }
}
