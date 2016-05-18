const sawpte = require('./sawpte.js');

document.addEventListener('DOMContentLoaded', () => {
  sawpte.view.setEvents();
  sawpte.control.setEvents();
  sawpte.schedule.setEvents();
  sawpte.schedule.loadSchedule();
  sawpte.control.connect();
});

// setTimeout(() => {
//   ipc.send('asynchronous-message-saw', 'ping');
// }, 3000);
