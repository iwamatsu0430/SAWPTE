const electron      = require('electron');
const app           = electron.app;
const ipc           = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const SAWPTEServer  = require('./lib/server.js');
const logger        = require('./lib/logger.js');
const Logger        = logger.logger;
const ColorCode     = logger.colorCode;

class Main {

  constructor() {
    this.initWindowEvents();
    this.initIpcEvents();
    this.startLocalServer();
  }

  initWindowEvents() {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });
    app.on('activate', () => {
      if (this.mainWindow === null) {
        createWindow();
      }
    });
  }

  initIpcEvents() {
    ipc.on('asynchronous-message-connect-server', (event, args) => {
      Logger.log(`connect to ${args}!`);
    });
  }

  createWindow() {
    if (!this.mainWindow) {
      this.mainWindow = new BrowserWindow({width: 800, height: 600});
      this.mainWindow.loadURL(`file://${__dirname}/app/index.html`);
      this.mainWindow.webContents.openDevTools();
      this.mainWindow.on('closed', () => {
        this.mainWindow = null;
        app.quit();
      });
    }
  }

  startLocalServer() {
    if (!this.localServer) {
      this.localServer = new SAWPTEServer();
      this.localServer.start();
    }
  }
}

new Main();
