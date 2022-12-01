const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const pdfjs = require('pdfjs');
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });
});

server.listen(8000, () => {
  console.log('server connected');
});
