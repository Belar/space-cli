const axios = require('axios');
const chalk = require('chalk');

const helpers = require('../helpers');
const settings = require('./settings').getSettings();

exports.nextLaunch = function (argv) {
  const launchCount = argv.limit > 1 ? argv.limit : 1;

  // Empty time zone option is a true flag, type condition checks if a value has been submitted
  const argvHasValidTimezone = argv.timezone && typeof argv.timezone === 'string' && helpers.isValidTimezone(argv.timezone);
  const timezone = (argvHasValidTimezone && argv.timezone) || settings.timezone;

  if (argv.timezone && !argvHasValidTimezone) {
    helpers.printError('Unrecognized timezone. Time will be shown in UTC');
  }

  axios.get('https://launchlibrary.net/1.4/launch/', {
    params: {
      next: launchCount
    }
  }).then((response) => {
    const nextCount = response.data.launches.length;

    for (let i = 0; i < nextCount; i++) {
      const next = response.data.launches[i];
      const title = chalk`{yellow Next launch} ${next.id} ${next.name}`;
      let schedule = chalk`{cyan Scheduled launch attempt:} ${next.net}`;

      if (timezone) {
        const convertedTime = helpers.convertTimezone(next.net, timezone);
        schedule = chalk`{cyan Scheduled launch attempt:} ${convertedTime}`;
      }

      if (next.tbddate === 1 || next.tbdtime === 1) {
        schedule += chalk` {bgYellow.black TBD}`;
      }

      const vidCount = next.vidURLs.length;
      let broadcasts = vidCount < 1 ? chalk`{cyan Broadcasts:} TBD / Unavailable` : chalk`{cyan Broadcasts:}`;

      if (vidCount >= 1) {
        for (let i = 0; i < vidCount; i++) {
          broadcasts += ` ${next.vidURLs[i]}`;
        }
      }

      const dataBreak = nextCount > 1 ? '\n' : '';

      if (argv.details) {
        const rocket = chalk`{cyan Rocket:} ${next.rocket.name}`;

        const missionCount = next.missions.length;
        let missions = missionCount < 1 ? chalk`{cyan Missions:} TBD / Unknown` : chalk`{cyan Missions:}`;

        if (missionCount >= 1) {
          for (let i = 0; i < missionCount; i++) {
            const missionNo = `${i + +1})`;
            const missionType = `[${next.missions[i].typeName}]`;
            const missionDescription = next.missions[i].description;

            missions += '\n' + chalk.yellow(missionNo + ' ' + missionType) + ' ' + missionDescription;
          }
        }

        helpers.printMessage(`${title}\n${schedule}\n${broadcasts}\n${rocket}\n${missions}${dataBreak}`);
      } else {
        helpers.printMessage(`${title}\n${schedule}\n${broadcasts}${dataBreak}`);
      }
    }
  }).catch(function (error) {
    const errorData = error.response.data;
    const errorMessage = `${errorData.status}: ${errorData.msg}`;
    helpers.printError(errorMessage);
  });
};
