const BUTTONS = ['left', 'right', 'down', 'a'];
class Controller {
  constructor(games) {
    this._defaultPool = games.flatMap(game =>
      BUTTONS.map(button => `${game.name()}-${button}`)
    );
    this._pool = [...this._defaultPool];
    this._clients = new Map();
    this._queue = [];
  }

  setListener(onChange) {
    this._onChange = onChange;
  }

  connect(socket) {
    if (this._pool.length) {
      this._assign(socket);
    } else {
      this._queue.push(socket);
    }
  }

  disconnect(socket) {
    this._queue = this._queue.filter(x => x !== socket);

    const button = [...this._clients.keys()].filter(
      button => this._clients.get(button) === socket
    )[0];
    if (button == null) {
      return;
    }

    this._unassign(button);

    if (this._queue.length) {
      const newSocket = this._queue.shift();
      this._assign(newSocket);
    }
  }

  state() {
    return this._defaultPool.filter(x => !this._pool.includes(x));
  }

  _assign(socket) {
    const button = this._pool[Math.floor(Math.random() * this._pool.length)];

    this._pool = this._pool.filter(x => x != button);
    this._clients.set(button, socket);

    socket.emit('assignbutton', button);
    this._onChange?.();
  }

  _unassign(button) {
    this._clients.delete(button);
    this._pool.push(button);
    this._onChange?.();
  }
}

module.exports = Controller;
