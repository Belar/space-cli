const helpers = require('../src/helpers');

describe('Time', function () {
  describe('convertTimezone', function () {
    it('should return converted time, error to be null', function () {
      let timeOriginal = 'March 20, 2017 13:31:00 UTC';
      let expectedTime = 'March 20, 2017 14:31:00 CET';
      let timezone = 'Europe/Paris';

      helpers.convertTimezone(timeOriginal, timezone, function (error, data) {
        expect(error).toEqual(null);
        expect(data).toEqual(expectedTime);
      });
    });

    it('should return error message on unexisting time zone', function () {
      let timeOriginal = 'March 20, 2017 13:31:00 UTC';
      let timezone = 'wrongTimezone';

      helpers.convertTimezone(timeOriginal, timezone, function (error, data) {
        expect(typeof error).toEqual('string');
      });
    });
  });
});
