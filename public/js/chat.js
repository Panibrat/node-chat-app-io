var socket = io();

function scrollBottom(){
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect', () => {
    console.log('Connected to server');
    var params = $.deparam(window.location.search);
    socket.emit('join', params, (err) => {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server :(');
});

socket.on('updateUserList', (users) => {
    //console.log(`Users list: ${users}`);
    var ol = $('<ol></ol>');

    users.forEach((user) => {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);

});

socket.on('newMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollBottom();
});

socket.on('newLocationMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollBottom();

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