const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = require('./router');
const users = {};
io.setMaxListeners(2000);
app.use(express.static('client'));
app.use('/', router);
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log('New user: ', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // <-- change "data" to "name"
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
});
server.listen(8800 || process.env.PORT, () => console.log('Server Started!!!'));
