const chalk = require('chalk');
const helpers = require('../helpers');

exports.about = function () {
  helpers.printMessage(chalk.green('Welcome to Space CLI'), '- a CLI for space information' + '\n\n' + 'Credits:' + '\n' + 'https://launchlibrary.net/ - API documentation for upcoming launches');
};
