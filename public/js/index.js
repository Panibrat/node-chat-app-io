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

socket.on('newLocationMessage', (message) => {

    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
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
    /*var text = $('[name=message]').val();
    text = '';*/

});

var locationButton = $('#send-location');
locationButton.on('click', () =>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your f***ing browser!');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, (err) => {
        alert("Unable to fetch location", err);
    })
});