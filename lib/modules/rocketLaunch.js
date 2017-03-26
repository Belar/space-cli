const axios = require('axios');
const chalk = require('chalk');

const time = require('./time');

exports.nextLaunch = function (argv) {
  axios.get('https://launchlibrary.net/1.2/launch/next/1').then((response) => {
    let next = response.data.launches[0];
    let timezone = argv.timezone;

    let title = chalk.yellow('Next launch:') + ' ' + next.id + ' ' + next.name;
    let schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + next.net;

    if (timezone && timezone.length > 0) {
      time.convertTimezone(next.net, timezone, function (error, data) {
        if (!error) {
          schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + data;
          return;
        }
        return console.log(chalk.red(error));
      });
    }

    if (argv.details) {
      let broadcasts = chalk.cyan('Broadcasts:') + ' ' + next.vidURLs;
      let rocket = chalk.cyan('Rocket:') + ' ' + next.rocket.name;

      console.log(title + '\n' + schedule + '\n' + broadcasts + '\n' + rocket);
    } else {
      console.log(title + '\n' + schedule);
    }
  });
};
