const KEYS = {
  ymapsKey: '9bbb91ee-7d99-427e-b0ce-c301dbad09a5',
  weatherApiKey: 'da6962b372e64afbb47133333202705',
  ipinfoKey: 'd5e7bd62571e27',
  unsplashKey: 'O2Vk-5MjQubBj3oK8P3RtBY4Q0xdWrpEe_MlUKt5ffc',
};

export async function getIpInfoPosition() {
  const geo = await fetch(`https://ipinfo.io/json?token=${KEYS.ipinfoKey}`);
  return await geo.json();
}

export async function getGeoObjectByCoords(coords) {
  if (!coords) return new Error('invalid coordinates');
  const data = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?&geocode=${coords.longitude},${coords.latitude}&lang=en_US&apikey=${KEYS.ymapsKey}&kind=locality&format=json&results=1`
  );

  return data.json();
}

export async function getGeoObjectByCityName(name) {
  const data = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?lang=en_US&apikey=${KEYS.ymapsKey}&kind=locality&format=json&geocode=${name}`
  );
  return await data.json();
}

export async function getWeather(coords) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${KEYS.weatherApiKey}&q=${coords.latitude},${coords.longitude}&days=3`
  );

  return await data.json();
}

export async function getCurrentWeatherState(coords) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${KEYS.weatherApiKey}&q=${coords.latitude},${coords.longitude}`
  );

  return await data.json();
}

export async function getWeatherForecast3(coords) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${KEYS.weatherApiKey}&q=${coords.latitude},${coords.longitude}&days=3`
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
    `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${query}&client_id=${KEYS.unsplashKey}`
  );
  const json = await data.json();
  const url = json.urls.regular;
  const photoData = await fetch(url);
  return await photoData.blob();
}
