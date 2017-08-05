var moment = require('moment');

var generateMessage = (from, text) => {
    var date = moment();
    return {
        from,
        text,
        //createdAt: new Date().getTime()
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
};
module.exports = {generateMessage, generateLocationMessage};