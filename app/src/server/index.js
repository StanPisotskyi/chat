const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils/message');
const { isValidString } = require('./utils/helper');
const app = express();
const publicPath = path.join(__dirname, '/../public');
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Client connected!');

    socket.on('join', (joinChat, callback) => {
        console.log('Join chat:', joinChat);

        const { name, room } = joinChat;

        if (!isValidString(name) || !isValidString(room)) {
            callback('Both fields are required!');
        }

        socket.join(room);

        socket.emit('newMessage', generateMessage('Admin', `Welcome to the room: ${room}!`));

        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `New user joined the room: ${room}!`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('Create message:', message);

        const { from, text } = message;

        if (!isValidString(from)) {
            callback('User is unknown.');
        }

        if (!isValidString(text)) {
            callback('Text is empty.');
        }

        socket.broadcast.emit('newMessage', generateMessage(from, text));
        callback();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected...');
    });
});

server.listen(port, function () {
    console.log(`Chat server: ${port}!`);
});