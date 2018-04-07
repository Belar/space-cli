const chai = require('chai');
const expect = chai.expect;

const helpers = require('../lib/helpers');

describe('Time', function () {
  describe('convertTimezone', function () {
    it('should return converted time, error to be null', function (done) {
      let timeOriginal = 'March 20, 2017 13:31:00 UTC';
      let expectedTime = 'March 20, 2017 14:31:00 CET';
      let timezone = 'Europe/Paris';

      helpers.convertTimezone(timeOriginal, timezone, function (error, data) {
        expect(error).to.be.equal(null);
        expect(data).to.be.equal(expectedTime);
        done();
      });
    });

    it('should return error message on unexisting time zone', function (done) {
      let timeOriginal = 'March 20, 2017 13:31:00 UTC';
      let timezone = 'wrongTimezone';

      helpers.convertTimezone(timeOriginal, timezone, function (error, data) {
        expect(error).to.be.a('string');
        done();
      });
    });
  });
});
