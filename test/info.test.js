const helpers = require('../src/helpers');
const info = require('../src/modules/info');

describe('Info', function () {
  describe('about', function () {
    test('should call printMessage once', function () {
      const spy = jest.spyOn(helpers, 'printMessage');
      info.about();

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
