// const electron      = require('electron');
// const ipc           = electron.ipcRenderer;
const SAWPTEElement = require('./element.js');

class SAWPTE {

  static updateView() {
    let event = new CustomEvent('updateView');
    SAWPTE.dispatch(event);
  }

  static addEventListener(eventName, fn) {
    SAWPTE.element.addEventListener(eventName, fn);
  }

  static dispatch(event) {
    SAWPTE.element.dispatchEvent(event);
  }

  constructor(child) {
    if (!SAWPTE.element) {
      SAWPTE.element = document.createElement('sawpte');
    }
  }

  store(child) {
    SAWPTE.addEventListener("updateView", () => child.update());
  }

  $(selector) {
    return new SAWPTEElement(selector);
  }

  on(eventName, fn) {
    SAWPTE.addEventListener(eventName, fn);
  }

  initElements() {}
  setEvents() {}
  update() {}
}

module.exports = SAWPTE;

// setTimeout(() => {
//   ipc.send('asynchronous-message-saw', 'ping');
// }, 3000);
