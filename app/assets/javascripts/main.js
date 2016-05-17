const electron  = require('electron');
const ipc       = electron.ipcRenderer;

setTimeout(() => {
  ipc.send('asynchronous-message-saw', 'ping');
}, 3000);
