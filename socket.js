const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:8100',
        methods: ['GET', 'POST'],
    },
    transports: ['websocket', 'polling']
});

console.log('SOCKET server is running');

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${socket.id} joined room ${userId}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

module.exports = io;
