const SAWPTE      = require('./sawpte.js');
const SAWPTEView  = require('./view.js');

// class SAWPTEControl extends SAWPTE {
//   constructor() {
//     super();
//     this.store(this);
//   }
//   hide() {
//   }
//   connect() {
//   }
// }
//
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
  // new SAWPTEControl();
  // new SAWPTESchedule();
  SAWPTE.updateView();
});
