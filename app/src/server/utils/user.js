class User {
    constructor(id, name, room) {
        this.id = id;
        this.name = name;
        this.room = room;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getRoom() {
        return this.room;
    }
}

module.exports = User;