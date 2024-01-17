const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils/message');
const { isValidString } = require('./utils/helper');
const Storage = require('./utils/storage');
const storage = new Storage();
const app = express();
const publicPath = path.join(__dirname, '/../public');
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('join', (joinChat, callback) => {
        const { name, room } = joinChat;

        if (!isValidString(name) || !isValidString(room)) {
            return callback('Both fields are required!');
        }

        socket.join(room);
        storage.removeUserById(socket.id);
        storage.addUser(socket.id, name, room);

        io.to(room).emit('updateUsersList', storage.getUsersByRoom(room));
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the room: ${room}!`));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} joined the room: ${room}!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        const { from, text } = message;

        if (!isValidString(from)) {
            return callback('User is unknown.');
        }

        if (!isValidString(text)) {
            return callback('Text is empty.');
        }

        const user = storage.getUserById(socket.id);

        socket.emit('newMessage', generateMessage(from, text, true));
        socket.broadcast.to(user.getRoom()).emit('newMessage', generateMessage(from, text));
        callback();
    });

    socket.on('disconnect', () => {
        const user = storage.removeUserById(socket.id);

        if (!user) {
            return;
        }

        io.to(user.getRoom()).emit('updateUsersList', storage.getUsersByRoom(user.getRoom()));
    });
});

server.listen(port, function () {
    console.log(`Chat server: ${port}!`);
});