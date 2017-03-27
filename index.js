#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');

// ./modules
const rocketLaunch = require('./lib/modules/rocketLaunch');
const helpers = require('./lib/helpers');

var argv = yargs
  .usage('Usage: space <command> [options]')
  .demandCommand(1)
  .command('about', 'Info about the CLI', about)
  .command('next', 'Get next rocket launch',
    function (yargs) {
      return yargs.option('d', {
        alias: 'details',
        describe: 'Details about the next launch'
      }).option('tz', {
        alias: 'timezone',
        describe: 'Define time zone for time info e.g. America/New_York, Europe/Paris, Asia/Shanghai'
      });
    },
    rocketLaunch.nextLaunch
  )
  .help('h')
  .alias('h', 'help')
  .argv;

function about() {
  helpers.printMessage(chalk.green('Welcome to Space CLI'), '- a CLI for space information' + '\n\n' + 'Credits:' + '\n' + 'https://launchlibrary.net/ - API documentation for upcoming launches');
}
