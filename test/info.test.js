const helpers = require('../lib/helpers');
const info = require('../lib/modules/info');

describe('Info', function () {
  describe('about', function () {
    test('should call printMessage once', function () {
      const spy = jest.spyOn(helpers, 'printMessage');
      info.about();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
