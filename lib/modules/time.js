const moment = require('moment-timezone');

exports.convertTimezone = function (time, timezone) {
  let newTime = moment.tz(new Date(time), timezone).format();
  return newTime;
};
