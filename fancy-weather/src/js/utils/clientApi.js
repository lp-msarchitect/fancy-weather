const KEYS = {
  ymapsKey: '9bbb91ee-7d99-427e-b0ce-c301dbad09a5',
};

export async function getGeoObjectByCoords(coords) {
  if (!coords) return new Error('invalid coordinates');
  const data = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?lang=en_US&apikey=${KEYS.ymapsKey}&format=json&geocode=${coords.longitude},${coords.latitude}`
  );

  return data.json();
}
