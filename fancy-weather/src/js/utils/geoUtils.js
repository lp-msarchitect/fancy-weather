import { getIpInfoPosition } from './clientApi';

export async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (res) =>
      resolve({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      });

    const error = async () => {
      try {
        const res = await getIpInfoPosition();
        const coords = res.loc.split(',');
        resolve({ latitude: coords[0], longitude: coords[1] });
      } catch (error) {
        reject(error);
      }
    };

    navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  });
}

export function ConvertDDToDMS(dd) {
  const deg = dd | 0;
  const frac = Math.abs(dd - deg);
  const min = (frac * 60) | 0;
  const sec = (frac * 3600 - min * 60) | 0;
  return `${deg}° ${min}' ${sec}"`;
}
