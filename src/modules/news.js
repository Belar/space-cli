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

      const title = chalk`${article.title} {yellow ${article.news_site_long}}`;

      helpers.printMessage(`${title}`);
    }
  }).catch(error => {
    const errorMessage = `${error.code}: ${error.message}`;
    helpers.printError(errorMessage);
  });
};
