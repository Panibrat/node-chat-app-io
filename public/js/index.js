var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server :(');
});

socket.on('newMessage', (message) => {
    console.log('New Message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

/*socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi!'
}, (dataFromServer) => {
    console.log('Got it!', dataFromServer);
});*/

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'Anonimus',
        text: $('[name=message]').val()
    }, (dataFromServer) => {
        console.log('Got it!', dataFromServer);
    });
    $('[name=message]').val = '2';

});