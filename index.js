#!/usr/bin/env node

const yargs = require('yargs');

// ./modules
const rocketLaunch = require('./lib/modules/rocketLaunch');
const info = require('./lib/modules/info');

var argv = yargs
  .usage('Usage: space <command> [options]')
  .demandCommand(1)
  .command('about', 'Info about the CLI', info.about)
  .command('next', 'Get next rocket launch',
    function (yargs) {
      return yargs.option('d', {
        alias: 'details',
        describe: 'Details about the next launch'
      }).option('tz', {
        alias: 'timezone',
        describe: 'Define time zone for time info e.g. America/New_York, Europe/Paris, Asia/Shanghai'
      }).option('lt', {
        alias: 'limit',
        describe: 'Define amount of upcoming events to show'
      });
    },
    rocketLaunch.nextLaunch
  )
  .help('h')
  .alias('h', 'help')
  .argv;
