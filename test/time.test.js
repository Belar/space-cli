const helpers = require('../src/helpers');

describe('Time', function () {
  describe('convertTimezone', function () {
    it('should return converted time, error to be null', function () {
      expect.hasAssertions();

      const timeOriginal = 'March 20, 2017 13:31:00 UTC';
      const expectedTime = 'March 20, 2017 14:31:00 CET';
      const timezone = 'Europe/Paris';

      const convertedTime = helpers.convertTimezone(timeOriginal, timezone);

      expect(convertedTime).toEqual(expectedTime);
    });
  });
  describe('timezone check', function () {
    it('should return boolean false on unexisting time zone', function () {
      expect.hasAssertions();

      const timezone = 'wrongTimezone';
      const isTimezoneValid = helpers.isValidTimezone(timezone);

      expect(isTimezoneValid).toBeFalsy();
    });
  });
});
