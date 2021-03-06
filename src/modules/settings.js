const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const os = require('os');

const helpers = require('../helpers');

const homeDir = os.homedir();
const configSubdir = os.platform() === 'win32' ? path.join('AppData', 'Local') : '.config';
const configDir = process.env.XDG_CONFIG_HOME || path.join(homeDir, configSubdir);
const spacecliDir = path.join(configDir, 'spacecli');

const settingsFilePath = path.join(spacecliDir, 'settings.json');

function getSettings () {
  const settingsFileExists = fs.existsSync(settingsFilePath);
  const settingsDataRaw = settingsFileExists && fs.readFileSync(settingsFilePath, 'utf8');
  const settings = settingsDataRaw && JSON.parse(settingsDataRaw);

  return settings || {};
}

function update (argv) {
  const configDirExists = fs.existsSync(spacecliDir);

  const currentSettings = getSettings();
  const settings = Object.create(currentSettings);

  const hasValidTimezone = argv.timezone && helpers.isValidTimezone(argv.timezone);

  if (!hasValidTimezone) {
    const errorMessage = 'Unrecognised time zone.';
    return helpers.printError(errorMessage);
  }
  settings.timezone = argv.timezone;

  const settingsJSON = JSON.stringify(settings);

  if (!configDirExists) {
    fs.mkdirSync(spacecliDir);
  }

  return fs.writeFile(settingsFilePath, settingsJSON, 'utf8', (error) => {
    if (error) {
      return helpers.printError(error.message);
    }

    const message = chalk`{bgGreen Success!} The file has been saved!`;
    helpers.printMessage(message);
  });
};

module.exports = {
  getSettings,
  update
};
