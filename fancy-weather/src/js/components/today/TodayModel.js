import {
  getCityNameByCoords,
  getCurrentWeatherState,
  getWetherIconBlob,
} from '../../utils/clientApi';

export default class TodayModel {
  constructor() {
    this.cityName = null;
  }

  async getCityName(coords) {
    const response = await getCityNameByCoords(coords);

    const { city } = response.results[0].components;
    const { country } = response.results[0].components;

    this.cityName = `${city}, ${country}`;
    return this.cityName;
  }

  async getCurrentState(coords = this.coords) {
    const state = await getCurrentWeatherState(coords);
    const iconBlob = await getWetherIconBlob(
      `https:${state.current.condition.icon}`
    );

    const stateObj = {
      local_time: new Date(state.location.localtime),
      feels_like_c: Math.round(state.current.feelslike_c),
      feels_like_f: Math.round(state.current.feelslike_f),
      humidity: state.current.humidity,
      temp_c: Math.round(state.current.temp_c),
      temp_f: Math.round(state.current.temp_f),
      wind_mps: (state.current.wind_kph / 3.6).toFixed(2),
      condition_code: state.current.condition.code,
      weather_icon: URL.createObjectURL(iconBlob),
      is_day: !!state.current.is_day,
    };

    return stateObj;
  }
}
