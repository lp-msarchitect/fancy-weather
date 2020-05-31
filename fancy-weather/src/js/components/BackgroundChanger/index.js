import { getPhotoBlob } from '../../utils/clientApi';

export default class BackgroundChanger {
  constructor(element) {
    this.element = element || null;
    this.curetQuery = '';
  }

  change(query = this.curetQuery) {
    getPhotoBlob(query).then((photoBlob) => {
      this.element.style.backgroundImage = `url(${URL.createObjectURL(
        photoBlob
      )})`;
    });
    this.curetQuery = query;
  }

  update(msg) {
    if (msg.name === 'changeimg') {
      this.change(msg.value);
    }
  }
}
