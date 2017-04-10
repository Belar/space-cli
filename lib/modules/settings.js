const fs = require('fs');

const helpers = require('../helpers');
const settingsData = {};

exports.update = function (argv) {

  let settingsDataUpdate = Object.create(settingsData);

  if (argv.timezone) {
    settingsDataUpdate.timezone = argv.timezone;
  }

  let settingsJSON = JSON.stringify(settingsDataUpdate);
  if (settingsData.timezone !== settingsDataUpdate.timezone) {
    fs.writeFile('settingsData.json', settingsJSON, (err) => {
      if (err) throw err;
      helpers.printMessage('The file has been saved!');
    });
  }
};
