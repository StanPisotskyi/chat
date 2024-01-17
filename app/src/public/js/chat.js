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

    ioConnection.on('updateUsersList', (list) => {
        let dataToInsert = '';

        list.forEach((name) => dataToInsert += `<li>${name}</li>`);

        $('#usersWrapper').empty().html(dataToInsert);
    });

    ioConnection.on('newMessage', (message) => {
        const { from, text, createdAt, isAuthor } = message;

        const cssClass = isAuthor ? 'own-message' : 'message';

        const li = `<li class="${cssClass}"><div class="align-center"><b>Time:</b> ${createdAt}</div><div class="align-center"><b>Author</b>: ${from}</div><div class="align-center">${text}</div></li>`;

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