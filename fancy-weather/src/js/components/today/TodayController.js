import Clock from '../../utils/Clock';

export default class TodayController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
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
    });
  }

  dateTickHandler(date_unix) {
    const date = new Date(date_unix);
    this.view.dateTime = {
      date: this.getCurrentLocalDate(date),
      time: this.getCurrentLocalTime(date),
    };
  }

  getDayOfWeek(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  getMonth(date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[date.getMonth()];
  }

  getCurrentLocalDate(date) {
    return `${this.getDayOfWeek(date)} ${date.getDate()} ${this.getMonth(
      date
    )}`;
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
