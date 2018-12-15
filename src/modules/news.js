const axios = require('axios');
const chalk = require('chalk');

const helpers = require('../helpers');

exports.listArticles = function (argv) {
  const articleCount = argv.limit > 1 ? argv.limit : 1;

  axios.get('https://api.spaceflightnewsapi.net/articles/', {
    params: {
      limit: articleCount
    }
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
