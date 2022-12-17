const DEFAULT_POOL = ['t1-left', 't1-right', 't1-down', 't1-a', 't2-left', 't2-right', 't2-down', 't2-a'];
const EXPIRE_INTERVAL_MS = 3000;

class Controller {
  constructor() {
    this._pool = [...DEFAULT_POOL];
    this._clients = new Map();
    this._queue = [];
    setInterval(() => this._expireClients(), EXPIRE_INTERVAL_MS);
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
    return DEFAULT_POOL.filter(x => !this._pool.includes(x));
  }

  _assign(socket) {
    const button = this._pool[Math.floor(Math.random() * this._pool.length)];

    this._pool = this._pool.filter(x => x != button);
    this._clients.set(button, socket);

    socket.emit('assign', button);
    this._onChange?.();
  }

  _unassign(button) {
    this._clients.delete(button);
    this._pool.push(button);
    this._onChange?.();
  }

  _expireClients() {
    const expired = [...this._clients.values()].filter(
      socket => !socket.connected
    );
    expired.forEach(socket => this.disconnect(socket));
  }
}

module.exports = Controller;
