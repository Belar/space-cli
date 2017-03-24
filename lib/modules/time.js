const moment = require('moment-timezone');

exports.convertTimezone = function (time, timezone, callback) {
  if (moment.tz.zone(timezone)) {
    let newTime = moment.tz(new Date(time), timezone).format();
    return callback(null, newTime);
  }
  return callback('Unrecognised time zone.');
};
