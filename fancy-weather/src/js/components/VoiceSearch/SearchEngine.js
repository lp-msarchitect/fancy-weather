export default class SearchEngine {
  constructor(lang = 'en-US') {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = lang;
    this.recognition.interimResults = false;
    this.isActive = false;
  }

  start() {
    console.log('Start recognition');
    this.isActive = true;
    this.recognition.start();
  }

  stop() {
    console.log('stop recognition');

    this.isActive = false;
    this.recognition.stop();
  }

  addListener(handler) {
    this.handler = handler;
    this.recognition.addEventListener('result', (e) => {
      const transcription = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)[0];
      this.handler(transcription);
    });

    this.recognition.addEventListener('end', (e) => {
      if (this.isActive) {
        this.recognition.start();
      }
    });
  }

  removeListener(handler) {
    if (this.handler === handler) {
      this.handler = null;
      this.recognition.removeEventListener('result', handler);
    }
  }
}
