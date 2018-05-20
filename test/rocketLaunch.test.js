const axios = require('axios');

const rocketLaunch = require('../src/modules/rocketLaunch');
const helpers = require('../src/helpers');

const nextResponse = require('./mockData.js');

jest.mock('axios');

describe('Rocket launch', function () {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('nextLaunch', function () {
    it('should call printMessage once', function (done) {
      expect.hasAssertions();

      const spy = jest.spyOn(helpers, 'printMessage');
      axios.get.mockResolvedValue({
        data: nextResponse.nextSingleResponse
      });

      rocketLaunch.nextLaunch({});

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should call printMessage once in details mode', function (done) {
      expect.hasAssertions();

      const spy = jest.spyOn(helpers, 'printMessage');
      axios.get.mockResolvedValue({
        data: nextResponse.nextSingleResponse
      });

      rocketLaunch.nextLaunch({
        details: true
      });

      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should call printMessage once and printError with time conversion error once', function (done) {
      expect.hasAssertions();

      helpers.convertTimezone = jest.fn().mockImplementation((time, timzone, callback) => callback('Unrecognised time zone.'));
      const errorSpy = jest.spyOn(helpers, 'printError');
      const messageSpy = jest.spyOn(helpers, 'printMessage');

      rocketLaunch.nextLaunch({
        timezone: 'wrongTimezone'
      });

      setTimeout(() => {
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(messageSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should call printMessage once for each launch', function (done) {
      expect.hasAssertions();

      const messageSpy = jest.spyOn(helpers, 'printMessage');
      axios.get.mockResolvedValue({
        data: nextResponse.nextMultiResponse
      });

      let launchCount = 5;
      rocketLaunch.nextLaunch({
        limit: launchCount
      });

      setTimeout(() => {
        expect(messageSpy).toHaveBeenCalledTimes(launchCount);
        done();
      });
    });

    it('should call printError once on request failure', function (done) {
      expect.hasAssertions();

      const errorSpy = jest.spyOn(helpers, 'printError');

      axios.get.mockRejectedValue({
        response: {
          data: {
            status: 403,
            msg: 'Error message'
          }
        }
      });

      let launchCount = 10;
      rocketLaunch.nextLaunch({
        limit: launchCount
      });

      setTimeout(() => {
        expect(errorSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
