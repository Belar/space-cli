/* eslint-disable no-unused-expressions */
/* global describe, it, before, after, beforeEach, afterEach */

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const helpers = require('../lib/helpers');
const info = require('../lib/modules/info');

describe('Info', function () {
  let sandbox;

  before(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(helpers, 'printMessage');
  });

  after(function () {
    sandbox.restore();
  });

  describe('about', function () {
    it('should call printMessage once', function (done) {
      info.about();

      expect(helpers.printMessage).to.be.calledOnce;
      done();
    });
  });
});
