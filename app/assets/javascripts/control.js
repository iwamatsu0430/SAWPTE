const SAWPTE    = require('./sawpte.js');
const logger    = require('../../../lib/logger.js');
const Logger    = logger.logger;
const ColorCode = logger.colorCode;
const ConnectTo = {
  local: "local",
  global: "global"
}

class SAWPTEControl extends SAWPTE {
  constructor() {
    super();
    this.store(this);

    // presentation
    this.$status = this.$('.sawpte-control-status')[0];

    // connect
    let connectTos = this.$('#sawpte-control-connect > input[name="sawpte-control-connect-radio"]');
    this.$connectToRadioLocal = connectTos.filter(r => r.dom.value === ConnectTo.local)[0];
    this.$connectToRadioGlobal = connectTos.filter(r => r.dom.value === ConnectTo.global)[0];
    this.$connectToServer = this.$('#sawpte-control-connect > .sawpte-control-connect-server')[0];
    this.$connectUpdateButton = this.$('#sawpte-control-connect > .sawpte-control-connect-update')[0];

    this.connectTo = ConnectTo.local; // TODO: load loacl strage settings
    this.connectToServer = "http://localhost:9000/"; // TODO: load loacl strage settings

    this.setEvents();
  }

  setEvents() {
    // presentation

    // connect
    this.$connectToRadioLocal.on('change', e => {
      this.connectTo = ConnectTo.local;
      SAWPTE.updateView();
    });
    this.$connectToRadioGlobal.on('change', e => {
      this.connectTo = ConnectTo.global;
      SAWPTE.updateView();
    });
    this.$connectToServer.on('change', e => {
      this.connectToServer = e.target.value;
    })
    this.$connectUpdateButton.on('click', e => {
      e.preventDefault();
      Logger.log(this.connectToServer);
    });
  }

  update() {
    // presentation

    // connect
    this.$connectToServer.setValue(this.connectToServer);
    if (this.connectTo === ConnectTo.local) {
      this.$connectToRadioLocal.dom.checked = true;
      this.$connectToRadioGlobal.dom.checked = false;
      this.$connectToServer.dom.disabled = true;
    } else {
      this.$connectToRadioLocal.dom.checked = false;
      this.$connectToRadioGlobal.dom.checked = true;
      this.$connectToServer.dom.disabled = false;
    }
  }
}

module.exports = SAWPTEControl
