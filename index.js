#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');

// ./modules
const rocketLaunch = require('./lib/modules/rocketLaunch');

var argv = yargs
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .command('about', 'Info about the CLI', about)
  .command('next', 'Get next rocket launch',
    function (yargs) {
      return yargs.option('d', {
        alias: 'details',
        describe: 'Details about the next launch'
      });
    },
    rocketLaunch.nextLaunch
  )
  .help('h')
  .alias('h', 'help')
  .argv;

function about() {
  console.log(chalk.green('Welcome to Space CLI'), '- a CLI for space information' + '\n\n' + 'Credits:' + '\n' + 'https://launchlibrary.net/ - API documentation for upcoming launches');
}
