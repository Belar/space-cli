const chalk = require('chalk');
const helpers = require('../helpers');

exports.about = function () {
  const welcome = chalk`{green Welcome to Space CLI} - a CLI for space information`;
  const credits = `Credits:\nhttps://launchlibrary.net/ - API documentation for upcoming launches`;

  helpers.printMessage(`${welcome}\n\n${credits}`);
};
