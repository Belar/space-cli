const axios = require('axios');
const chalk = require('chalk');

function getLaunchDetails(launchId, callback) {
  axios.get('https://launchlibrary.net/1.2/launch/' + launchId).then((response) => {
    callback(response.data.launches[0]);
  });
}

exports.nextLaunch = function (argv) {
  axios.get('https://launchlibrary.net/1.2/launch/next/1').then((response) => {
    let next = response.data.launches[0];

    if (argv.details) {
      getLaunchDetails(next.id, function (nextDetails) {
        let title = chalk.yellow('Next launch:') + ' ' + nextDetails.id + ' ' + nextDetails.name;
        let schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + nextDetails.net;
        let broadcasts = chalk.cyan('Broadcasts:') + ' ' + nextDetails.vidURLs;
        let rocket = chalk.cyan('Rocket:') + ' ' + nextDetails.rocket.name;

        console.log(title + '\n' + schedule + '\n' + broadcasts + '\n' + rocket);
      });
    } else {
      let title = chalk.yellow('Next launch:') + ' ' + next.id + ' ' + next.name;
      let schedule = chalk.cyan('Scheduled launch attempt:') + ' ' + next.net;

      console.log(title + '\n' + schedule);
    }
  });
}
