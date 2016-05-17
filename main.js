const electron      = require('electron');
const app           = electron.app;
const ipc           = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let createWindow = () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
}

ipc.on('asynchronous-message-saw', (event, args) => {
  console.log(`${args} pong`);
});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
app.on('saw', () => {
  console.log('hello!!!');
})
