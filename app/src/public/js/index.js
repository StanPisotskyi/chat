(() => {
    let ioConnection = io();

    ioConnection.on('connect', () => {
        console.log('Connected to server');
    });

    ioConnection.on('disconnect', () => {
        console.log('Disconnected...');
    });

    ioConnection.on('newMessage', (message) => {
        const { from, text, createdAt } = message;

        const li = `<li><div><b>Time:</b> ${createdAt}</div><div><b>Author</b>: ${from}</div><div>${text}</div></li>`;

        $('#messagesWrapper').prepend(li);
    });

    $('#messageForm').on('submit', (e) => {
        e.preventDefault();

        const text = $('#message').val();

        ioConnection.emit('createMessage', {from: 'John', text: text}, (responseMessage) => {
            console.log('Response:', responseMessage)
        });
    });
})();