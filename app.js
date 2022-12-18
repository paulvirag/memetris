require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const Game = require('./game/Game');
const Controller = require('./game/Controller');

const PORT = process.env.PORT || 5001;
const GAMES = Number(process.env.GAMES || 1);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app
  .use('/play', express.static('views/index.html'))
  .use('/spectate', express.static('views/index.html'))
  .get('/', (req, res, next) => res.redirect('/play'))
  .use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));

const clientConfig = {
  debugControls: process.env.DEBUG_CONTROLS === 'true',
  showAds: process.env.SHOW_ADS === 'true',
  games: GAMES,
};

const onChange = () =>
  io.emit('gamestate', {
    game1: game1?.state(),
    game2: game2?.state(),
    controller: controller?.state(),
  });

const game1 = new Game();
game1.setListener(onChange);

const game2 = new Game();
game2.setListener(onChange);

game1.setNewGameListener(() => game2.restart());
game2.setNewGameListener(() => game1.restart());

game1.setGarbageListener(c => game2.garbage(c));
game2.setGarbageListener(c => game1.garbage(c));

const controller = new Controller(GAMES);
controller.setListener(onChange);

io.on('connection', socket => {
  socket.on('requestbutton', () => controller.connect(socket));
  socket.on('disconnect', () => controller.disconnect(socket));

  socket.on('requestconfig', () => socket.emit('config', clientConfig));

  Array(GAMES)
    .fill(0)
    .map((_, i) => {
      const game = i === 0 ? game1 : game2;
      const gameIndex = i + 1;

      socket.on(`t${gameIndex}-a`, () => game.a());
      socket.on(`t${gameIndex}-left`, () => game.left());
      socket.on(`t${gameIndex}-right`, () => game.right());
      socket.on(`t${gameIndex}-down`, () => game.down());
      socket.on(`t${gameIndex}-up`, () => game.up());
    });
});
