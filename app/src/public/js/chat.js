(() => {
    const joinChat = JSON.parse(localStorage.getItem('joinChat'));
    const { name } = joinChat;

    let ioConnection = io();

    ioConnection.on('connect', () => {
        console.log('Connected to server');

        ioConnection.emit('join', joinChat, (err) => {
            if (!err) {
                return;
            }

            alert(err);

            window.location.href = window.location.origin;
        });
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

        ioConnection.emit('createMessage', {from: name, text: text}, (err) => {
            if (!err) {
                return;
            }

            alert(err);
        });
    });
})();