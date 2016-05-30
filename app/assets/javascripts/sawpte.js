const electron      = require('electron');
const ipc           = electron.ipcRenderer;
const SAWPTEElement = require('./element.js');

let element = document.createElement('sawpte');
let dispatch = () => {
  let event = document.createEvent('HTMLEvents');
  event.initEvent('dispatch', true, false);
  element.dispatchEvent(event);
};

class SAWPTE {
  constructor() {
    this.initElements();
    this.setEvents();
  }
  store(child) {
    element.addEventListener("dispatch", () => child.dispatch());
  }
  $(selector) {
    return new SAWPTEElement(selector);
  }
  update() {
    dispatch();
  }
  initElements() {}
  setEvents() {}
  dispatch() {}
}

class SAWPTEView extends SAWPTE {
  constructor() {
    super();
    super.store(this);
    this.isShow = false;
    this.time = -1;
    this.title = "";
    this.presenter = "";
  }
  initElements() {
    this.$switchControl = this.$('.sawpte-view-switch-control');
    this.$control = this.$('.sawpte-control');
    this.$time = this.$('.sawpte-view-time');
    this.$title = this.$('.sawpte-view-title');
    this.$presenter = this.$('.sawpte-view-presenter');
  }
  setEvents() {
    this.$switchControl.on('click', e => {
      e.preventDefault();
      this.isShow = !this.isShow;
      this.update();
    });
  }
  dispatch() {
    if (this.isShow) {
      this.$control.addClass('show');
    } else {
      this.$control.removeClass('show');
    }
    this.$time.dom.innerHTML = this.calcTime(this.time);
    this.$title.dom.innerHTML = this.title ? this.title : 'Title';
    this.$presenter.dom.innerHTML = this.presenter ? this.presenter : 'Presenter';
  }
  calcTime(time) {
    const fillZero = (num) => ("0" + num).slice(-2);
    return (time >= 0) ? `${fillZero(Math.floor(time / 60))}:${fillZero(time % 60)}` : '00:00';
  }
}

class SAWPTEControl extends SAWPTE {
  constructor() {
    super();
    super.store(this);
  }
  setEvents() {
  }
  hide() {
  }
  connect() {
  }
}

class SAWPTESchedule extends SAWPTE {
  constructor() {
    super();
    super.store(this);
  }
  setEvents() {
  }
  loadSchedule() {
  }
}

new SAWPTEView();
new SAWPTEControl();
new SAWPTESchedule();

dispatch();
