const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('92bfd907dea3489285abc89fd0f177d1');


class News {
  static async find(keywords, language) {
    try {
      const searchBox = {
        q: keywords,
        from: '2020-07-08',
        to: '2020-07-09',
        language: language,
        sortBy: 'relevancy',
        page: 1,
      }
  
      const data = await newsapi.v2.everything(searchBox);
      console.log(data.articles);
      return data.articles;
    } catch (e) {
      console.log(e); 
    }
  }
  
  static async category() {
    try {
      const data = await newsapi.v2.topHeadlines({
        language: 'en',
        country: 'us'
      })
      // console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = News;