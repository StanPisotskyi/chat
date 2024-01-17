const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils/message')
const app = express();
const publicPath = path.join(__dirname, '/../public');
const port = 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('Client connected!');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat!'));

    socket.on('createMessage', (message, callback) => {
        console.log('Create message:', message);

        const { from, text } = message;

        socket.broadcast.emit('newMessage', generateMessage(from, text));
        callback('This is a server');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected...');
    });
});

server.listen(port, function () {
    console.log(`Chat server: ${port}!`);
});