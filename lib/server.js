const io        = require('socket.io')(process.env.PORT || 3000);
const logger    = require('./logger.js');
const Logger    = logger.logger;
const ColorCode = logger.colorCode;

class SAWPTEServer {

  constructor() {
    this.tasks = [];
  }

  start() {
    Logger.log('start SAWPTE server', ColorCode.green);
    io.on('connection', socket => {
      this.showClientInfo(socket);
      this.initEvents(socket);
    });
  }

  showClientInfo(socket) {
    let clientInfo = JSON.parse(JSON.stringify(socket.handshake));
    var msg = `connected by ${clientInfo.address}`;
    Logger.log(msg, ColorCode.green);
    io.emit('system', {msg: msg});
  }

  initEvents(socket) {
    socket.on('start', data => {
      if (this.isAvailableId(data.id) && ths.isAvailableSeconds(data.seconds)) {
        this.tasks.push({
          id: data.id,
          initialSeconds: data.seconds,
          presenter: data.presenter,
          title: data.title
        });
        this.timer(data.id, data.seconds, true);
      }
    });

    socket.on('pause', data => {
      let result = this.findTask(data.id);
      if (result.index != -1) {
        this.tasks.splice(result.index, 1);
      }
    });

    socket.on('reset', data => {
    });

    socket.on('disconnect', darta => {
    });
  }

  timer(id, seconds, isAlive) {
    let result = this.findTask(id);
    Logger.log(`[${id}] ${seconds}s\t[${result.task.presenter}] ${result.task.title}`);
    io.emit('timer', {
      id: id,
      seconds: seconds,
      initialSeconds: result.task.initialSeconds,
      title: result.task.title,
      presenter: result.task.presenter
    });
    if (seconds > 0 && isAlive && result.index != -1) {
      var nextIsAlive = (seconds - 1 > 0) ? true : false;
      setTimeout(function() {
        this.timer(id, seconds - 1, nextIsAlive);
      }, 1000);
    } else {
      this.tasks.splice(result.index, 1);
      io.emit('timerOver', {
        id: id
      });
    }
  }

  findTask(id) {
    let index = -1;
    let task = tasks.find((o, i) => {
      if (o.id == id) {
        index = i;
        return true;
      }
    });
    return {
      index: index,
      task: task
    };
  }

  isAvailableId(str) {
    let result = this.findTask(str);
    return (this.isNotUndefined(str) && result.index === -1);
  }

  isAvailableSeconds(seconds) {
    return (this.isNotUndefined(seconds) && typeof(seconds) == "number" && seconds > 0);
  }

  isNotUndefined(param) {
    return param !== undefined;
  }
}

module.exports = SAWPTEServer
