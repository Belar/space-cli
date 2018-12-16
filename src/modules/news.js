const axios = require('axios');
const chalk = require('chalk');

const helpers = require('../helpers');

exports.listArticles = function (argv) {
  const requestParams = {};

  if (argv.limit && argv.limit > 1) {
    requestParams.limit = argv.limit;
  } else {
    const now = new Date();
    const todayStart = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 1);
    const fullDayMs = 24 * 60 * 60 * 1000;
    requestParams.since_added = (todayStart - fullDayMs) / 1000;
  }

  axios.get('https://api.spaceflightnewsapi.net/articles/', {
    params: requestParams
  }).then((response) => {
    const articles = response.data;

    const articlesByDate = articles.reduce((byDate, article) => {
      const title = chalk`${article.title}`;

      const publishedAt = new Date(article.date_published * 1000).toLocaleDateString();
      const articleDetails = chalk`{yellow ${article.news_site_long}}`;

      const readSource = `Read on ${article.url}`;

      const dayArticles = byDate[publishedAt] = byDate[publishedAt] || [];
      dayArticles.push(`${articleDetails} | ${title}\n${readSource} \n`);

      return byDate;
    }, {});

    for (const date in articlesByDate) {
      const dayArticles = articlesByDate[date];

      helpers.printMessage(`${date}\n----------`);
      dayArticles.forEach(article => helpers.printMessage(article));
    }
  }).catch(error => {
    const errorMessage = `${error.code}: ${error.message}`;
    helpers.printError(errorMessage);
  });
};
