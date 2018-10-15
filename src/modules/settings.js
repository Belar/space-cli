const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const os = require('os');

const helpers = require('../helpers');

const homeDir = os.homedir();
const configSubdir = os.platform() === 'win32' ? path.join('AppData', 'Local') : '.config';
const configDir = process.env.XDG_CONFIG_HOME || path.join(homeDir, configSubdir);
const spacecliDir = path.join(configDir, 'spacecli');

const settingsFilePath = path.join(spacecliDir, 'settingsData.json');

function getSettings () {
  if (fs.existsSync(settingsFilePath)) {
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(data);
  }
  if (!fs.existsSync(spacecliDir)) {
    fs.mkdirSync(spacecliDir);
  }
  return {};
}

function update (argv) {
  const settingsData = getSettings();
  const settingsDataUpdate = Object.create(settingsData);

  if (argv.timezone && argv.timezone.length > 0) {
    const timezone = argv.timezone;

    if (!helpers.isValidTimezone(timezone)) {
      const errorMessage = 'Unrecognised time zone.';
      return helpers.printError(errorMessage);
    }
    settingsDataUpdate.timezone = timezone;
  }

  const settingsJSON = JSON.stringify(settingsDataUpdate);

  if (settingsData.timezone !== settingsDataUpdate.timezone) {
    return fs.writeFile(settingsFilePath, settingsJSON, 'utf8', (error) => {
      if (error) {
        return helpers.printError(error.message);
      }
      const message = chalk.bgGreen('Success!') + ' ' + 'The file has been saved!';
      helpers.printMessage(message);
    });
  }

  const message = chalk.bgGreen('OK') + ' ' + 'Settings are correct, no changes required.';
  return helpers.printMessage(message);
};

module.exports = {
  getSettings,
  update
};
