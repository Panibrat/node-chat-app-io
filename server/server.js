const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const sockenIO = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = sockenIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });


    console.log('New User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected :(');
    });



    socket.on('createMessage', (message) => {
        console.log(`new Message created: ${JSON.stringify(message)}`);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        /*socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });*/
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});