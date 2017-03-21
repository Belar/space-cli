#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');

let argv = yargs
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .command('about', 'Info about the CLI', about)
  .help('h')
  .alias('h', 'help')
  .argv;

function about() {
  console.log(chalk.green('Welcome to SIC [Space Information Center]'), '- CLI for space information');
}
