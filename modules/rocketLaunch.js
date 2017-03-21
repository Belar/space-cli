const axios = require('axios');

exports.nextLaunch = function (argv) {
  axios.get('https://launchlibrary.net/1.2/launch/next/1').then((response) => {
    let next = response.data.launches[0];
    console.log(next.id, next.name, next.net);
  });
}
