const axios = require('axios');
const chalk = require('chalk');

const helpers = require('../helpers');
const settings = require('./settings').getSettings();

exports.nextLaunch = function (argv) {
  const launchCount = argv.limit > 1 ? argv.limit : 1;

  const timezone = argv.timezone || settings.timezone;

  // Central validation with error outside time conversion method prevents error from being shown with every conversion e.g. when requesting info about n launches
  const isValidTimezone = helpers.isValidTimezone(timezone);
  if (!!timezone && !isValidTimezone) {
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

      const time = isValidTimezone ? helpers.convertTimezone(next.net, timezone) : next.net;
      const scheduleFlag = next.tbddate === 1 || next.tbdtime === 1 ? chalk` {bgYellow.black TBD}` : '';
      const schedule = chalk`{cyan Scheduled launch attempt:} ${time}${scheduleFlag}`;

      const hasVideoUrls = !!next.vidURLs && next.vidURLs.length > 0;
      const broadcasts = hasVideoUrls ? chalk`{cyan Broadcasts:} ${next.vidURLs.join(' ')}` : chalk`{cyan Broadcasts:} TBD / Unavailable`;

      const launchCore = `${title}\n${schedule}\n${broadcasts}`;
      let launchDetails = '';

      if (argv.details) {
        const rocket = chalk`{cyan Rocket:} ${next.rocket.name}`;

        const missionsList = !!next.missions && next.missions.length > 0 && next.missions.map((mission, index) => {
          const missionNo = `${++index})`;
          const missionType = `[${mission.typeName}]`;
          const missionDescription = mission.description;

          return chalk`{yellow ${missionNo} ${missionType}} ${missionDescription}`;
        });
        const missions = missionsList ? chalk`{cyan Missions:}\n${missionsList.join('\n')}` : chalk`{cyan Missions:} TBD / Unknown`;

        launchDetails = `\n${rocket}\n${missions}`;
      }

      const dataBreak = nextCount > 1 ? '\n' : '';
      helpers.printMessage(`${launchCore}${launchDetails}${dataBreak}`);
    }
  }).catch(function (error) {
    const errorData = error.response.data;
    const errorMessage = `${errorData.status}: ${errorData.msg}`;
    helpers.printError(errorMessage);
  });
};
