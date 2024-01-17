const moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
};

module.exports = { generateMessage };