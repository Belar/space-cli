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
  // Empty time zone option is a true flag, type condition checks if a value has been submitted
  const isPossibleTimezone = typeof timezone === 'string';

  return isPossibleTimezone && moment.tz.zone(timezone);
};

exports.convertTimezone = function (time, timezone) {
  return moment.tz(new Date(time), timezone).format('MMMM D, YYYY HH:mm:ss z');
};
