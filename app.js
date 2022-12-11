const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const Game = require('./game/Game');

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app
  .use('/index', express.static('views/index.html'))
  .get('/', (req, res, next) => res.redirect('/index'))
  .use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));

const onChange = () => io.emit('gamestate', game.grid());
const game = new Game(onChange);
game.setListener(onChange);

io.on('connection', socket => {
  socket.on('a', () => game.a());
  socket.on('left', () => game.left());
  socket.on('right', () => game.right());
  socket.on('down', () => game.down());
  socket.on('up', () => game.up());
});
