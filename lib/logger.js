const electron  = require('electron');
const ColorCode = {
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

  static format(color, msg) {
    let formattedDate = Logger.getFormattedDate(new Date());
    if (electron.app) {
      return `${color}[${formattedDate}]\t${msg}${ColorCode.reset}`;
    } else {
      return `[${formattedDate}]\t${msg}`;
    }
  }

  static info(msg, color = ColorCode.white) {
    console.info(Logger.format(color, msg));
  }

  static error(msg, color = ColorCode.white) {
    console.error(Logger.format(color, msg));
  }

  static log(msg, color = ColorCode.white) {
    console.log(Logger.format(color, msg));
  }
}

module.exports = {
  colorCode: ColorCode,
  logger: Logger
}
