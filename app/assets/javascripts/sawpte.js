const electron = require('electron');
const ipc      = electron.ipcRenderer;

class SAWPTEElement {
  constructor(selector) {
    this.selector = selector;
    this.dom = document.querySelector(selector);
    if (!this.dom) {
      console.error(`Failed create DOM object. selector="${selector}"`);
    }
  }
  on(eventName, func) {
    if (this.dom) {
      this.dom.addEventListener(eventName, func);
    } else {
      console.error(`Failed add "${eventName}" event to ${this.selector} object.`);
    }
  }
}

class SAWPTE {
  setEvents() {}
  $(selector) {
    return new SAWPTEElement(selector);
  }
}

class SAWPTEView extends SAWPTE {
  setEvents() {
    this.$('.sawpte-view-switch-control').on('click', e => {
      e.preventDefault();
      // show control
    });
  }
}

class SAWPTEControl extends SAWPTE {
  setEvents() {
  }
  connect() {
  }
}

class SAWPTESchedule extends SAWPTE {
  setEvents() {
  }
  loadSchedule() {
  }
}

module.exports = {
  view: new SAWPTEView(),
  control: new SAWPTEControl(),
  schedule: new SAWPTESchedule()
};
