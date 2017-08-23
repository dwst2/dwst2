
import utils from '../utils.js';

export default class Spam {

  constructor(dwst) {
    this._dwst = dwst;
  }

  commands() {
    return ['spam'];
  }

  usage() {
    return [
      '/spam <times> [command line...]',
    ];
  }

  examples() {
    return [
      '/spam 10',
      '/spam 6 /binary [random(10)]',
    ];
  }

  info() {
    return 'run a command multiple times';
  }

  run(timesStr, ...commandParts) {
    const times = utils.parseNum(timesStr);
    const spam = (limit, i = 0) => {
      if (i === limit) {
        return;
      }
      if (commandParts.length < 1) {
        this._dwst.controller.run('send', String(i));
      } else {
        this._dwst.controller.silent(commandParts.join(' '));
      }
      const nextspam = () => {
        spam(limit, i + 1);
      };
      if (this._dwst.connection !== null && this._dwst.connection.isOpen()) {
        setTimeout(nextspam, 0);
      } else {
        this._dwst.terminal.log('spam failed, no connection', 'error');
      }
    };
    spam(times);
  }
}

