const User = require('./user');

class Storage {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = new User(id, name, room);

        this.users.push(user);

        return user;
    }

    getUsersByRoom(room) {
        const users = this.users.filter((user) => user.getRoom() === room);

        return users.map((user) => user.getName());
    }

    getUserById(id) {
        return this.users.filter((user) => user.getId() === id)[0];
    }

    removeUserById(id) {
        const user = this.getUserById(id);

        if (user) {
            this.users = this.users.filter((user) => user.getId() !== id);
        }

        return user;
    }
}

module.exports = Storage;