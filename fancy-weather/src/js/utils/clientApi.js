const KEYS = {
  ymapsKey: '9bbb91ee-7d99-427e-b0ce-c301dbad09a5',
  weatherApiKey: 'da6962b372e64afbb47133333202705',
};

export async function getGeoObjectByCoords(coords) {
  if (!coords) return new Error('invalid coordinates');
  const data = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?lang=en_US&apikey=${KEYS.ymapsKey}&format=json&geocode=${coords.longitude},${coords.latitude}`
  );

  return data.json();
}

export async function getCurrentWeatherState(coords) {
  const data = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${KEYS.weatherApiKey}&q=${coords.latitude},${coords.longitude}`
  );

  return await data.json();
}

export async function getWetherIconBlob(url) {
  const data = await fetch(url);
  return await data.blob();
}
