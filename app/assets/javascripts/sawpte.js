const electron      = require('electron');
const ipc           = electron.ipcRenderer;
const SAWPTEElement = require('./element.js');

class SAWPTE {

  static updateView() {
    let event = new CustomEvent('updateView');
    SAWPTE.dispatch(event);
  }

  static connectServer(target) {
    ipc.send('asynchronous-message-connect-server', target);
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
    return SAWPTEElement.querySelectorAll(selector);
  }

  on(eventName, fn) {
    SAWPTE.addEventListener(eventName, fn);
  }

  initElements() {}
  setEvents() {}
  update() {}
}

module.exports = SAWPTE;
