const axios = require('axios');
const chalk = require('chalk');

const helpers = require('../helpers');

exports.nextLaunch = function (argv) {
  let launchCount = argv.limit > 1 ? argv.limit : 1;

  axios.get('https://launchlibrary.net/1.2/launch/next/' + launchCount).then((response) => {
    let nextCount = response.data.launches.length;
    let timezone = argv.timezone;
    let timezoneError = false;

    for (let i = 0; i < nextCount; i++) {
      let next = response.data.launches[i];
      let title = chalk.yellow('Next launch:') + ' ' + next.id + ' ' + next.name;
      let schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + next.net;

      if (timezone && timezone.length > 0 && !timezoneError) {
        helpers.convertTimezone(next.net, timezone, function (error, data) {
          if (!error) {
            schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + data;
            return;
          }
          timezoneError = true;
          return helpers.printMessage(chalk.red(error));
        });
      }

      if (next.tbddate === 1 || next.tbdtime === 1) {
        schedule += ' ' + chalk.bgYellow.black(' TBD ');
      }

      let vidCount = next.vidURLs.length;
      let broadcasts = vidCount < 1 ? chalk.cyan('Broadcasts: ') + 'TBD / Unavailable' : chalk.cyan('Broadcasts:');

      if (vidCount >= 1) {
        for (let i = 0; i < vidCount; i++) {
          broadcasts += ' ' + next.vidURLs[i];
        }
      }

      let dataBreak = '';
      if (nextCount > 1) {
        dataBreak = '\n';
      }

      if (argv.details) {
        let rocket = chalk.cyan('Rocket:') + ' ' + next.rocket.name;

        helpers.printMessage(title + '\n' + schedule + '\n' + broadcasts + '\n' + rocket + dataBreak);
      } else {
        helpers.printMessage(title + '\n' + schedule + '\n' + broadcasts + dataBreak);
      }
    }
  });
};
