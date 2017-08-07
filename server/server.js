const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const sockenIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = sockenIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    //socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    console.log('New User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected :(');
        var userToDelete = users.removeUser(socket.id);
        if(userToDelete) {
            var room = userToDelete.room;
            io.to(room).emit('updateUserList', users.getUserList(room));
            io.to(room).emit('newMessage', generateMessage('Admin', `${userToDelete.name} left room`));
        }
    });

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required!');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', `${params.name}!!! Welcome to room ${params.room}`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
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