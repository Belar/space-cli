const moment = require('moment-timezone');
const chalk = require('chalk');

exports.printMessage = function (message) {
  console.log(message);
};

exports.printError = function (message) {
  const errorOutput = chalk`{bgRed Error} ${message}`;

  console.log(errorOutput);
};

exports.isValidTimezone = function (timezone) {
  return moment.tz.zone(timezone);
};

exports.convertTimezone = function (time, timezone) {
  const newTime = moment.tz(new Date(time), timezone).format('MMMM D, YYYY HH:mm:ss z');
  return newTime;
};