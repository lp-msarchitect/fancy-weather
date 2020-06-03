import SearchEngine from './SearchEngine';

export default class VoiceSearch {
  constructor(lang) {
    this.engine = new SearchEngine(lang);
  }

  on() {
    this.engine.start();
  }

  off() {
    this.engine.stop();
  }

  isActive() {
    return this.engine.isActive;
  }

  subscribe(handler) {
    this.engine.addListener(handler);
  }

  unsubscribe(handler) {
    this.engine.removeListener(handler);
  }
}
