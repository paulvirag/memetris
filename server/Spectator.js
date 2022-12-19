class Spectator {
  constructor(games) {
    this._clients = new Map(games.map(game => [game.name(), []]));
  }

  connect(socket, name) {
    this._clients.get(name)?.push(socket);
  }

  disconnect(socket) {
    [...this._clients.keys()].forEach(name =>
      this._clients.set(
        name,
        this._clients.get(name).filter(x => x !== socket)
      )
    );
  }

  update(game) {
    this._clients
      .get(game.name())
      .forEach(x => x.emit(`${game.name()}-gamestate`, game.state()));
  }
}

module.exports = Spectator;
