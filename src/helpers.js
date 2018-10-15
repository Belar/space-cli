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
  const isValidTimezone = exports.isValidTimezone(timezone);

  if (!isValidTimezone) {
    exports.printError('Unrecognized timezone. Time will be shown in UTC');
    return time;
  }

  return moment.tz(new Date(time), timezone).format('MMMM D, YYYY HH:mm:ss z');
};
