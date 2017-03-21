#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');

// ./modules
const rocketLaunch = require('./modules/rocketLaunch');

var argv = yargs
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .command('about', 'Info about the CLI', about)
  .command('next', 'Get next rocket launch',
    rocketLaunch.nextLaunch
  )
  .help('h')
  .alias('h', 'help')
  .argv;

function about() {
  console.log(chalk.green('Welcome to SIC [Space Information Center]'), '- CLI for space information');
}
