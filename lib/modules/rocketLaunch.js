const axios = require('axios');
const chalk = require('chalk');

const helpers = require('../helpers');

exports.nextLaunch = function (argv) {
  let launchCount = argv.limit > 1 ? argv.limit : 1;

  axios.get('https://launchlibrary.net/1.2/launch/next/' + launchCount).then((response) => {
    let nextCount = response.data.launches.length;
    let timezone = argv.timezone;

    for (let i = 0; i < nextCount; i++) {
      let next = response.data.launches[i];
      let title = chalk.yellow('Next launch:') + ' ' + next.id + ' ' + next.name;
      let schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + next.net;

      if (timezone && timezone.length > 0) {
        helpers.convertTimezone(next.net, timezone, function (error, data) {
          if (!error) {
            schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + data;
            return;
          }
          return helpers.printMessage(chalk.red(error));
        });
      }

      let dataBreak;
      if (nextCount > 1) {
        dataBreak = '\n';
      }

      if (argv.details) {
        let broadcasts = chalk.cyan('Broadcasts:') + ' ' + next.vidURLs;
        let rocket = chalk.cyan('Rocket:') + ' ' + next.rocket.name;

        helpers.printMessage(title + '\n' + schedule + '\n' + broadcasts + '\n' + rocket + dataBreak);
      } else {
        helpers.printMessage(title + '\n' + schedule + dataBreak);
      }
    }
  });
};
