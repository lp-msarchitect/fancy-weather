import ViewComponent from '../ViewComponent';
import ControlEvent from '../../utils/ControlEvent';
import { getCoordsByCityName } from '../../utils/clientApi';
import VoiceSearch from '../VoiceSearch';

export default class ControlsView extends ViewComponent {
  constructor(global) {
    const html = ` <section class="controls main__controls">
        <div>
          <button class="button button--refresh" id="change-img-button">
            <span class="visibility-hidden">Refresh image</span>
          </button>
          <div class="dropdown">
            <button class="button dropdown__button" data-role="indicator">EN</button>
            <ul class="list dropdown__options">
              <li class="dropdown__item" data-lang="en">EN</li>
              <li class="dropdown__item" data-lang="ru">RU</li>
              <li class="dropdown__item" data-lang="by">BY</li>
            </ul>
          </div>
          <label for="toggler" class="toggler">
            <input class="toggler__checkbox" type="checkbox" id="toggler" />
            <span class="toggler__slider"></span>
            <span class="toggler__value">°F</span>
            <span class="toggler__value">°C</span>
          </label>
        </div>
        <div class="error">
          
        </div>
        <div class="search">
          <div class="search__input-container">
            <input
              class="search__input"
              type="text"
              placeholder="Search city or ZIP"
            />
          </div>
          <div class="search__controls">
            <button
              class="search__controls-item search__controls-item--mic"
              id="voice-search"
            ></button>
            <button class="search__button button" id="start-search">Search</button>
          </div>
        </div>
      </section>`;

    super(global, html);
    this.voiceSearch = new VoiceSearch();
    this.voiceSearch.subscribe(this.onVoiceSearch.bind(this));
  }

  setDispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }

  addEventListeners() {
    const togglerTempElement = this.element.querySelector('.toggler');
    const langSelectorElement = this.element.querySelector('.dropdown');
    const changeImgButton = this.element.querySelector('#change-img-button');
    const startSearchButton = this.element.querySelector('#start-search');
    const inputSearch = this.element.querySelector('.search__input');
    const voiceSearch = this.element.querySelector('#voice-search');

    changeImgButton.addEventListener('click', this.changeImgHandler.bind(this));
    langSelectorElement.addEventListener(
      'click',
      this.langSelectorHandler.bind(this)
    );

    togglerTempElement.addEventListener(
      'click',
      this.togglerTempHandler.bind(this)
    );

    startSearchButton.addEventListener(
      'click',
      this.startSearchHandler.bind(this)
    );

    inputSearch.addEventListener('keydown', this.startSearchHandler.bind(this));

    voiceSearch.addEventListener('click', this.startVoiceSearch.bind(this));
  }

  removeEventListeners() {}

  startVoiceSearch(e) {
    if (this.voiceSearch.isActive()) {
      e.target.classList.remove('search__controls-item--mic-on');
      e.target.classList.add('search__controls-item--mic');
      this.voiceSearch.off();
    } else {
      e.target.classList.remove('search__controls-item--mic');
      e.target.classList.add('search__controls-item--mic-on');
      this.voiceSearch.on();
    }
  }

  onVoiceSearch(data) {
    this.element.querySelector('.search__input').value = data;
    this.startSearchHandler(data);
  }

  changeImgHandler(e) {
    this.dispatcher.broadcast(new ControlEvent('changeimg'));
  }

  langSelectorHandler(e) {
    const { lang } = e.target.dataset;
    if (lang) {
      e.currentTarget.querySelector('[data-role="indicator"]').innerText =
        e.target.innerText;
      this.dispatcher.broadcast(new ControlEvent('changelang', lang));
    }
  }

  togglerTempHandler(e) {
    e.preventDefault();
    const checkElement = e.currentTarget.querySelector('.toggler__checkbox');
    checkElement.checked = !checkElement.checked;
    const temp = checkElement.checked ? 'f' : 'c';
    if (temp) this.dispatcher.broadcast(new ControlEvent('changeunits', temp));
  }

  async startSearchHandler(e) {
    try {
      if (e.type === 'keydown' && e.keyCode !== 13) {
        return;
      }
      const searchValue = this.element.querySelector('.search__input').value;
      if (searchValue) {
        const response = await getCoordsByCityName(searchValue);

        if (response.results.length === 0) {
          throw new Error(`No results found for ${searchValue}`);
        }

        const position = {};
        position.latitude = response.results[0].geometry.lat;
        position.longitude = response.results[0].geometry.lng;
        this.dispatcher.broadcast(new ControlEvent('search', position));
      }
    } catch (error) {
      this.dispatcher.broadcast(new ControlEvent('error', error.message));
    }
  }
}
