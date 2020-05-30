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
