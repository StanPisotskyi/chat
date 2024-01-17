const moment = require('moment');

let generateMessage = (from, text, isAuthor = false) => {
    return {
        from,
        text,
        isAuthor,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
};

module.exports = { generateMessage };