/* eslint-disable no-unused-expressions */
/* global describe, it, before, after, beforeEach, afterEach */

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const settings = require('../lib/modules/settings');

describe('Settings', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(fs, 'writeFile');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('Save option', function () {
    it('should call a write file for valid option value pair', function (done) {
      settings.update({
        'timezone': 'Europe/Paris'
      });
      expect(fs.writeFile).to.be.calledOnce;
      done();
    });
  });
});
