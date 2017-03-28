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
const time = require('../lib/modules/time');

const nextResponse = require('./mockData.js');

describe('Rocket launch', function () {
  let sandbox;

  beforeEach(function () {
    moxios.install();
    moxios.stubRequest('https://launchlibrary.net/1.2/launch/next/1', {
      status: 200,
      responseText: nextResponse.nextSingleResponse
    });

    sandbox = sinon.sandbox.create();
    sandbox.stub(helpers, 'printMessage');
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

    it('should call printMessage twice with time conversion error', function (done) {
      sandbox.stub(time, 'convertTimezone').yields('Unrecognised time zone.');

      rocketLaunch.nextLaunch({
        timezone: 'wrongTimezone'
      });

      moxios.wait(function () {
        expect(helpers.printMessage).to.be.calledTwice;
        done();
      });
    });
  });
});
