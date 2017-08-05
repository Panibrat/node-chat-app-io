var moment = require('moment'); //momentjs.com

moment.locale('uk');
//var date = moment();
var createdAt = 1234567890000;
var date = moment(createdAt);
date.add(1,'hour').subtract(22, 'years');
//console.log(date.format('MMMM YYYY hh:mm:ss dddd'));
console.log(date.format('ddd Do MMM, YYYY, hh:mm:ss a'));
console.log(date.format('LT:ss'));
console.log(date.format('h:mm:ss a'));

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
console.log(new Date().getTime());