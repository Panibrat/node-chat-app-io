const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const sockenIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = sockenIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    console.log('New User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected :(');
    });

    socket.on('createMessage', (message, callback) => {
        console.log(`new Message created: ${JSON.stringify(message)}`);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});