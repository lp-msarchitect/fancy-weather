import { getWeatherForecast3, getWetherIconBlob } from '../../utils/clientApi';
import { getDayOfWeek } from '../../utils/dateUtils';

export default class ForecastModel {
  constructor(daysCount = 3) {
    this.daysCount = daysCount;
    this.days = [];
  }

  async getForecastDays(coords) {
    let forecast = await getWeatherForecast3(coords);
    forecast = forecast.forecast.forecastday;
    forecast = forecast.map(async (day) => {
      const dayObj = {};
      const dayDate = new Date(day.date);
      dayObj.date = dayDate;
      dayObj.weekDay = getDayOfWeek(dayDate, false);
      dayObj.avgTempC = day.day.avgtemp_c;
      dayObj.avgTempF = day.day.avgtemp_f;
      dayObj.icon = URL.createObjectURL(
        await getWetherIconBlob(`https:${day.day.condition.icon}`)
      );
      return dayObj;
    });
    this.days = await Promise.all(forecast);
    return this.days;
  }
}
