const KEYS = {
  ymapsKey: '9bbb91ee-7d99-427e-b0ce-c301dbad09a5',
  weatherApiKey: 'da6962b372e64afbb47133333202705',
  ipinfoKey: 'd5e7bd62571e27',
  unsplashKey: 'O2Vk-5MjQubBj3oK8P3RtBY4Q0xdWrpEe_MlUKt5ffc',
  opencagedataKey: 'ef73d4407cce4c5ba76e665fdfa17fe0',
};

export async function getIpInfoPosition() {
  const geo = await fetch(`https://ipinfo.io/json?token=${KEYS.ipinfoKey}`);
  return await geo.json();
}

export async function getCityNameByCoords(coords) {
  if (!coords) return new Error('invalid coordinates');
  const data = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&language=en&key=${KEYS.opencagedataKey}`
  );

  return data.json();
}

export async function getCoordsByCityName(name) {
  const data = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${name}&language=en&key=${KEYS.opencagedataKey}`
  );
  return await data.json();
}

export async function getCurrentWeatherState(coords) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${KEYS.weatherApiKey}&q=${coords.latitude},${coords.longitude}`
  );

  return await data.json();
}

export async function getWeatherForecast3(coords) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${KEYS.weatherApiKey}&q=${coords.latitude},${coords.longitude}&days=3`
  );

  return await data.json();
}

export async function getWetherIconBlob(url) {
  const data = await fetch(url);
  return await data.blob();
}

export async function getPhotoBlob(query) {
  console.info('Background image query: ', query);
  const data = await fetch(
    `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather${query}&client_id=${KEYS.unsplashKey}`
  );
  const json = await data.json();
  const url = json.urls.regular;
  const photoData = await fetch(url);
  return await photoData.blob();
}
