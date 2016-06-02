const io = require('socket.io')(process.env.PORT || 3000);
const Color = {
  black:    '\u001b[30m',
  red:      '\u001b[31m',
  green:    '\u001b[32m',
  yellow:   '\u001b[33m',
  blue:     '\u001b[34m',
  magenta:  '\u001b[35m',
  cyan:     '\u001b[36m',
  white:    '\u001b[37m',
  reset:    '\u001b[0m'
}

class Logger {

  static getFormattedDate(date) {
    const fillZero = (num, digit = 2) => ("0" + num).slice(-1 * digit);
    return `${fillZero(date.getHours())}:${fillZero(date.getMinutes())}:${fillZero(date.getSeconds())}.${fillZero(date.getMilliseconds(), 3)}`;
  }

  static format(color, date, msg) {
    let formattedDate = Logger.getFormattedDate(date);
    return `${color}[${formattedDate}]\t${msg}${Color.reset}`;
  }

  static info(msg, color = Color.white) {
    let output = Logger.format(color, new Date(), msg);
    console.info(output);
  }

  static error(msg, color = Color.white) {
    let output = Logger.format(color, new Date(), msg);
    console.error(output);
  }

  static log(msg, color = Color.white) {
    let output = Logger.format(color, new Date(), msg);
    console.log(output);
  }
}

class SAWPTEServer {

  constructor() {
    Logger.log('hello!');
  }

  start() {
    Logger.log('start SAWPTE server');
    io.on('connection', socket => {
      this.showClientInfo(socket);
      this.initEvents(socket);
    });
  }

  showClientInfo(socket) {
    let clientInfo = JSON.parse(JSON.stringify(socket.handshake));
    var msg = `connected by ${clientInfo.address}`;
    Logger.log(msg, Color.green);
    io.emit('system', {msg: msg});
  }

  initEvents(socket) {
    socket.on('start', data => {
      // startTimer(data.minutes * 60, data.title, data.presenter);
    });

    socket.on('pause', data => {
      // startTimer(tmpSeconds, data.title, data.presenter);
    });

    socket.on('reset', data => {
      // this.isStarted = false
    });

    socket.on('disconnect', function() {
      // var msg = 'disconnected by ' + clientInfo.address;
      // logger(msg, red);
      // io.emit('system', {msg: msg});
    });
  }
}

module.export = SAWPTEServer
