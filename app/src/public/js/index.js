(() => {
    $('#joinForm').on('submit', (e) => {
        e.preventDefault();

        const joinChat = JSON.stringify({
            name: $('#name').val(),
            room: $('#room').val()
        });

        localStorage.setItem('joinChat', joinChat);

        window.location.href = window.location.origin + '/chat.html';
    });
})();