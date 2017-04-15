const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment-timezone');
const path = require('path');

const homeDir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;
const spacecliDir = path.join(homeDir, '.spacecli');

const helpers = require('../helpers');
const settingsFilePath = path.join(homeDir, '.spacecli', 'settingsData.json');

function getSettings() {
  if (fs.existsSync(settingsFilePath)) {
    let data = fs.readFileSync(settingsFilePath);
    return JSON.parse(data);
  }
  if (!fs.existsSync(spacecliDir)) {
    fs.mkdirSync(spacecliDir);
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
