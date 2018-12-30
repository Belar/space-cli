#!/usr/bin/env node

const yargs = require('yargs');

// ./modules
const rocketLaunch = require('./modules/rocketLaunch');
const news = require('./modules/news');
const info = require('./modules/info');
const settings = require('./modules/settings');

const argv = yargs // eslint-disable-line
  .usage('Usage: space <command> [options]')
  .demandCommand(1)
  .strict(true)
  .command('about', 'Info about the CLI', info.about)
  .command('launch', 'Get next rocket launch',
    function (yargs) {
      return yargs
        .option('v', {
          alias: ['verbose', 'details'],
          describe: 'Details about the next launch'
        }).option('tz', {
          alias: 'timezone',
          describe: 'Define time zone for time info e.g. America/New_York, Europe/Paris, Asia/Shanghai'
        }).option('n', {
          alias: ['number', 'limit'],
          describe: 'Define amount of upcoming events to show'
        });
    },
    rocketLaunch.nextLaunch
  )
  .command('news', 'Get recent news articles',
    function (yargs) {
      return yargs
        .option('n', {
          alias: ['number', 'limit'],
          describe: 'Define amount of articles to show'
        });
    },
    news.listArticles
  )
  .command('settings', 'Set default settings',
    function (yargs) {
      return yargs.option('tz', {
        alias: 'timezone',
        describe: 'Define default time zone for time info e.g. America/New_York, Europe/Paris, Asia/Shanghai'
      });
    },
    settings.update
  )
  .help('h')
  .alias('h', 'help')
  .argv;
