var moment = require('moment');

let temp = moment().format('YYYYMMDD');
console.log(temp);
var curDate = moment(moment().format('YYYYMMDD'));

var yesterday = moment(curDate).subtract(1, 'days');
var daybeforeyesterday = moment(curDate).subtract(2, 'days');
var lastWeek = moment(curDate).subtract(7, 'days');
var last30days = moment(curDate).subtract(30, 'days');
console.log('yesterday:', yesterday);
console.log('daybeforeyesterday:', daybeforeyesterday);
console.log('lastWeek:', lastWeek);
console.log('last30days:', last30days);