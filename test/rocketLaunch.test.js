/* eslint-disable no-unused-expressions */
/* global describe, it, before, after, beforeEach, afterEach */

const axios = require('axios');
const moxios = require('moxios'); // axios requests mocking

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const rocketLaunch = require('../lib/modules/rocketLaunch');
const helpers = require('../lib/helpers');

const nextResponse = require('./mockData.js');

describe('Rocket launch', function () {
  let sandbox;

  beforeEach(function () {
    moxios.install();

    moxios.stubRequest('https://launchlibrary.net/1.2/launch/next/1', {
      status: 200,
      responseText: nextResponse.nextSingleResponse
    });

    moxios.stubRequest('https://launchlibrary.net/1.2/launch/next/5', {
      status: 200,
      responseText: nextResponse.nextMultiResponse
    });

    sandbox = sinon.sandbox.create();
    sandbox.stub(helpers, 'printMessage');
    sandbox.stub(helpers, 'printError');
  });

  afterEach(function () {
    moxios.uninstall();

    sandbox.restore();
  });

  describe('nextLaunch', function () {
    it('should call printMessage once', function (done) {
      rocketLaunch.nextLaunch({});

      moxios.wait(function () {
        expect(helpers.printMessage).to.be.calledOnce;
        done();
      });
    });

    it('should call printMessage once in details mode', function (done) {
      rocketLaunch.nextLaunch({
        details: true
      });

      moxios.wait(function () {
        expect(helpers.printMessage).to.be.calledOnce;
        done();
      });
    });

    it('should call printMessage once and printError with time conversion error once', function (done) {
      sandbox.stub(helpers, 'convertTimezone').yields('Unrecognised time zone.');

      rocketLaunch.nextLaunch({
        timezone: 'wrongTimezone'
      });

      moxios.wait(function () {
        expect(helpers.printError).to.be.calledOncee;
        expect(helpers.printMessage).to.be.calledOnce;
        done();
      });
    });

    it('should call printMessage once for each launch', function (done) {
      let launchCount = 5;
      rocketLaunch.nextLaunch({
        limit: launchCount
      });

      moxios.wait(function () {
        expect(helpers.printMessage).to.be.callCount(launchCount);
        done();
      });
    });

    it('should call printError once on request failure', function (done) {
      moxios.stubRequest('https://launchlibrary.net/1.2/launch/next/10', {
        status: 403,
        responseText: {
          'status': 'fail',
          'msg': 'Error message'
        }
      });

      let launchCount = 10;
      rocketLaunch.nextLaunch({
        limit: launchCount
      });

      moxios.wait(function () {
        expect(helpers.printError).to.be.calledOnce;
        done();
      });
    });
  });
});
