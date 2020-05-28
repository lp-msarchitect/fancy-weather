import {
  getGeoObjectByCoords,
  getCurrentWeatherState,
} from '../../utils/clientApi';

export default class TodayModel {
  constructor(coords) {
    this.coords = coords || null;
    this.cityName = null;
  }

  async getCityName(coords = this.coords) {
    const geoObj = await getGeoObjectByCoords(coords);
    const city =
      geoObj.response.GeoObjectCollection.featureMember[0].GeoObject.name;
    const { length } = geoObj.response.GeoObjectCollection.featureMember;
    const country =
      geoObj.response.GeoObjectCollection.featureMember[length - 1].GeoObject
        .name;

    this.cityName = `${city}, ${country}`;
    return this.cityName;
  }

  async getCurrentState(coords = this.coords) {
    const state = await getCurrentWeatherState(coords);
    const stateObj = {
      local_time: state.location.localtime_epoch,
      feels_like_c: state.current.feelslike_c,
      feels_like_f: state.current.feelslike_f,
      humidity: state.current.humidity,
      temp_c: state.current.temp_c,
      temp_f: state.current.temp_f,
      wind_mps: (state.current.wind_kph / 3.6).toFixed(2),
      condition_code: state.current.condition.code,
      is_day: !!state.current.is_day,
    };

    return stateObj;
  }
}
