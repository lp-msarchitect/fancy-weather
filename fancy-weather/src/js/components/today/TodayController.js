import Clock from '../../utils/Clock';
import { getDayOfWeek, getMonth, getSeason } from '../../utils/dateUtils';
import ControlEvent from '../../utils/ControlEvent';

export default class TodayController {
  constructor(view, model, dispatcher) {
    this.view = view;
    this.model = model;
    this.dispatcher = dispatcher;
    this.clock = new Clock();
  }

  set coords(value) {
    this.model.getCityName(value).then((city) => {
      this.view.city = city;
    });

    this.model.getCurrentState(value).then((state) => {
      this.view.weatherState = state;
      this.clock.date = +state.local_time;
      this.dateTickHandler(+state.local_time);
      this.clock.subscribe(this.dateTickHandler.bind(this));
      const season = getSeason(new Date(+state.local_time));
      const imgQuery = `${state.is_day ? 'day' : 'night'} ${season}`;
      this.dispatcher.broadcast(new ControlEvent('changeimg', imgQuery));
    });
  }

  dateTickHandler(date_unix) {
    const date = new Date(date_unix);
    this.view.dateTime = {
      date: this.getCurrentLocalDate(date),
      time: this.getCurrentLocalTime(date),
    };
  }

  getCurrentLocalDate(date) {
    return `${getDayOfWeek(date)} ${date.getDate()} ${getMonth(date)}`;
  }

  getCurrentLocalTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${minutes}:${seconds}`;
  }
}
