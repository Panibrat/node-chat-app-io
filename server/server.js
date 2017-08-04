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
    console.log('New User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected :(');
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});