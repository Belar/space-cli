const axios = require('axios');

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
        console.log(nextDetails.id, nextDetails.name, nextDetails.net, nextDetails.vidURLs, nextDetails.rocket.name);
      });
    } else {
      console.log(next.id, next.name, next.net);
    }
  });
}
