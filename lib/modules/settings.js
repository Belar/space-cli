const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment-timezone');

const helpers = require('../helpers');
const settingsFilePath = 'settingsData.json';

function getSettings() {
  if (fs.existsSync(settingsFilePath)) {
    let data = fs.readFileSync(settingsFilePath);
    return JSON.parse(data);
  }
  return {};
}

function update(argv) {
  let settingsData = getSettings();
  let settingsDataUpdate = Object.create(settingsData);

  if (argv.timezone) {
    let timezone = argv.timezone;

    if (!moment.tz.zone(timezone)) {
      let errorMessage = chalk.red('error: ' + 'Unrecognised time zone.');
      return helpers.printError(errorMessage);
    }
    settingsDataUpdate.timezone = timezone;
  }

  let settingsJSON = JSON.stringify(settingsDataUpdate);

  if (settingsData.timezone !== settingsDataUpdate.timezone) {
    return fs.writeFile(settingsFilePath, settingsJSON, (error) => {
      if (error) {
        return helpers.printError(error.message);
      }
      let message = chalk.bgGreen('Success!') + ' ' + 'The file has been saved!';
      helpers.printMessage(message);
    });
  }

  let message = chalk.bgGreen('OK') + ' ' + 'Settings are correct, no changes required.';
  return helpers.printMessage(message);
};

module.exports = {
  getSettings,
  update
};
