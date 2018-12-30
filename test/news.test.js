const axios = require('axios');

const news = require('../src/modules/news');
const helpers = require('../src/helpers');

const newsResponse = require('./mockData/news.js');

jest.mock('axios');

describe('Space news', function () {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list articles', function () {
    it('should set limit if applied and call printMessage for each news', function (done) {
      expect.hasAssertions();

      const spy = jest.spyOn(helpers, 'printMessage');
      axios.get.mockImplementation((url, query) => {
        expect(query.params).not.toHaveProperty('since_added');
        expect(query.params).toHaveProperty('limit');

        return Promise.resolve({
          data: newsResponse.multiResponse
        });
      });

      const newsCount = 2;
      news.listArticles({
        limit: newsCount
      });

      const newsListMessageCount = newsCount + 1; // Adds 1 output for data label
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(newsListMessageCount);
        done();
      });
    });
    it('should set date requirement if no limit applied', function () {
      expect.hasAssertions();

      axios.get.mockImplementation((url, query) => {
        expect(query.params).toHaveProperty('since_added');
        expect(query.params).not.toHaveProperty('limit');

        return Promise.resolve({
          data: newsResponse.multiResponse
        });
      });

      news.listArticles({
        since_added: new Date()
      });
    });
  });
});
