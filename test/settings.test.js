const fs = require('fs');

const settings = require('../lib/modules/settings');
const helpers = require('../lib/helpers');

fs.writeFile = jest.fn().mockImplementation(() => true);
fs.existsSync = jest.fn().mockReturnValue(false);
fs.mkdirSync = jest.fn().mockReturnValue(undefined);

describe('Settings', function () {
  describe('Save option', function () {
    it('should call a write file for valid option value pair', function () {
      const testData = {
        'timezone': 'Europe/Paris'
      };

      settings.update(testData);

      expect(fs.writeFile).toHaveBeenCalledTimes(1);
    });
    it('should print an error for invalid time zone', function () {
      const spy = jest.spyOn(helpers, 'printError');
      const testData = {
        'timezone': 'Invalid/Timezone'
      };

      settings.update(testData);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
