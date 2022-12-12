class Controller {
  constructor() {
    this._pool = ['left', 'right', 'down', 'a'];
    this._clients = new Map();
    this._queue = [];
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

  _assign(socket) {
    const button = this._pool[Math.floor(Math.random() * this._pool.length)];

    this._pool = this._pool.filter(x => x != button);
    this._clients.set(button, socket);

    socket.emit('assign', button);
  }

  _unassign(button) {
    this._clients.delete(button);
    this._pool.push(button);
  }
}

module.exports = Controller;
