const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const Game = require('./game/game');

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app
  .use('/index', express.static('views/index.html'))
  .get('/', (req, res, next) => res.redirect('/index'))
  .use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));

const game = new Game();

setInterval(() => {
  game.randomPiece();
  io.emit('gamestate', game.grid());
}, 5000);
