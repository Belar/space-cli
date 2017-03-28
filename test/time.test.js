/* eslint-disable no-unused-expressions */
/* global describe, it, before, after, beforeEach, afterEach */

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const time = require('../lib/modules/time');

describe('Time', function () {
  describe('convertTimezone', function () {
    it('should return converted time, error to be null', function (done) {
      let timeOriginal = 'March 20, 2017 13:31:00 UTC';
      let expectedTime = 'March 20, 2017 14:31:00 CET';
      let timezone = 'Europe/Paris';

      time.convertTimezone(timeOriginal, timezone, function (error, data) {
        expect(error).to.be.equal(null);
        expect(data).to.be.equal(expectedTime);
        done();
      });
    });

    it('should return error message on unexisting time zone', function (done) {
      let timeOriginal = 'March 20, 2017 13:31:00 UTC';
      let timezone = 'wrongTimezone';

      time.convertTimezone(timeOriginal, timezone, function (error, data) {
        expect(error).to.be.a('string');
        done();
      });
    });
  });
});
