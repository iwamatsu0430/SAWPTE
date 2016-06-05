const SAWPTE          = require('./sawpte.js');
const SAWPTEView      = require('./view.js');
const SAWPTEControl   = require('./control.js');

// class SAWPTESchedule extends SAWPTE {
//   constructor() {
//     super();
//     this.store(this);
//   }
//   loadSchedule() {
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  new SAWPTEView();
  new SAWPTEControl();
  // new SAWPTESchedule();
  SAWPTE.updateView();
});
