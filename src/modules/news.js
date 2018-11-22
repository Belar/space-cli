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
    const articlesCount = response.data.length;

    for (let i = 0; i < articlesCount; i++) {
      const article = response.data[i];

      const title = chalk`${article.title}`;

      const publishedAt = new Date(article.date_published * 1000).toLocaleDateString();
      const articleDetails = chalk`{yellow ${article.news_site_long}} ${publishedAt}`;

      const readSource = `Read on ${article.url}`;

      helpers.printMessage(`${articleDetails} | ${title}\n${readSource}\n`);
    }
  }).catch(error => {
    const errorMessage = `${error.code}: ${error.message}`;
    helpers.printError(errorMessage);
  });
};
