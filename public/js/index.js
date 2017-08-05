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
    //locationButton.text('Send location');
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'Anonimus',
        text: messageTextBox.val()
    }, (dataFromServer) => {
        console.log('Got it!', dataFromServer);
        messageTextBox.val('');
    });

});

var locationButton = $('#send-location');
locationButton.on('click', () =>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your f***ing browser!');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        //locationButton.text('Sending ......');

    }, (err) => {
        locationButton.removeAttr('disabled').text('Send location');
        alert("Unable to fetch location", err);
    })
});