const fs = require('fs');

const helpers = require('../helpers');
const settingsFilePath = 'settingsData.json'

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
    settingsDataUpdate.timezone = argv.timezone;
  }

  let settingsJSON = JSON.stringify(settingsDataUpdate);
  if (settingsData.timezone !== settingsDataUpdate.timezone) {
    fs.writeFile(settingsFilePath, settingsJSON, (err) => {
      if (err) throw err;
      helpers.printMessage('The file has been saved!');
    });
  }
};

module.exports = {
  getSettings,
  update
};
