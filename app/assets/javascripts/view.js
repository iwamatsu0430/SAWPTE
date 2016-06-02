const SAWPTE = require('./sawpte.js');

class SAWPTEView extends SAWPTE {

  static setTime(seconds) {
    let event = new CustomEvent('updateTime', { detail: { seconds: seconds } });
    SAWPTE.dispatch(event);
  }

  constructor() {
    super();
    this.store(this);

    this.$switchControl = this.$('.sawpte-view-switch-control');
    this.$control = this.$('.sawpte-control');
    this.$time = this.$('.sawpte-view-time');
    this.$title = this.$('.sawpte-view-title');
    this.$presenter = this.$('.sawpte-view-presenter');

    this.isShow = false;
    this.seconds = 100;
    this.title = "";
    this.presenter = "";

    this.setEvents();
  }

  setEvents() {
    this.$switchControl.on('click', e => {
      e.preventDefault();
      this.switchControl();
    });
    this.on('updateTime', e => {
      this.updateTime(e.detail.seconds);
    });
  }

  update() {
    (this.isShow) ? this.$control.addClass('show') : this.$control.removeClass('show');
    this.$time.setHtml(this.calcTime(this.seconds));
    this.$title.setHtml(this.title ? this.title : 'Title');
    this.$presenter.setHtml(this.presenter ? this.presenter : 'Presenter');
  }

  calcTime(seconds) {
    const fillZero = (num) => ("0" + num).slice(-2);
    return (seconds >= 0) ? `${fillZero(Math.floor(seconds / 60))}:${fillZero(seconds % 60)}` : '00:00';
  }

  switchControl() {
    this.isShow = !this.isShow;
    SAWPTEView.setTime(this.seconds - 1);
    SAWPTE.updateView();
  }

  updateTime(seconds) {
    this.seconds = seconds;
    SAWPTE.updateView();
  }
}

module.exports = SAWPTEView
