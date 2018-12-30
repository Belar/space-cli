const chalk = require('chalk');
const helpers = require('../helpers');

exports.about = function () {
  const welcome = chalk`{green Welcome to Space CLI} - a CLI for space information`;
  const credits = `Credits:\nhttps://launchlibrary.net/ - API for upcoming launches\nhttps://www.spaceflightnewsapi.net/ - API for space information like news, manned flights or ISS status`;

  helpers.printMessage(`${welcome}\n\n${credits}`);
};
