import Today from './components/today';
import Forecast from './components/forecast';
import GeoData from './components/geoData';
import Controls from './components/controls';
import { getCurrentPosition } from './utils/geoUtils';
import Dispatcher from './utils/Dispather';
import ErrorHandler from './utils/ErrorHandler';
import BackgroundChanger from './components/BackgroundChanger';

const main = document.querySelector('.main');

const dispatcher = new Dispatcher();
const controls = new Controls(document, dispatcher);

const today = new Today(document, dispatcher);
const forecast = new Forecast(document);
const geoData = new GeoData(document);
const errorHandler = new ErrorHandler(controls.element.querySelector('.error'));
const backgroundChanger = new BackgroundChanger(main);

controls.subscribe(today.update.bind(today));
controls.subscribe(forecast.update.bind(forecast));
controls.subscribe(geoData.update.bind(geoData));
controls.subscribe(errorHandler.update.bind(errorHandler));
dispatcher.subscribe(backgroundChanger.update.bind(backgroundChanger));

getCurrentPosition()
  .then((coords) => {
    today.coords = coords;
    forecast.coords = coords;
    geoData.initMap(coords);
  })
  .then(() => {
    main.insertAdjacentElement('beforeend', controls.element);
    main.insertAdjacentElement('beforeend', today.element);
    main.insertAdjacentElement('beforeend', forecast.element);
    main.insertAdjacentElement('beforeend', geoData.element);
  });
