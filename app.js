const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app
  .use('/index', express.static('views/index.html'))
  .get('/', (req, res, next) => res.redirect('/index'))
  .use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));

const clients = [];
let num = 0;

setInterval(() => {
  ++num;
  clients.forEach(client => client.emit('hello', num));
}, 5000);

io.on('connection', socket => {
  clients.push(socket);
  socket.on('disconnect', () => {
    const index = clients.indexOf(socket);
    clients[index] = clients[clients.length - 1];
    clients.pop();
  });
});
