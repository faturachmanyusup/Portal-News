const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('92bfd907dea3489285abc89fd0f177d1');


class News {
  // function untuk menampilkan LIST BERITA AWAL(setelah login)
  static async topHeadlines(country) {
    country = country || 'en';
    try {
      const data = await newsapi.v2.topHeadlines({
        country: country
      })
      // console.log(data.articles);
      return data.articles;
    } catch (e) {
      console.log(e);
    }
  }

  // function untuk menampilkan berita berdasarkan kata kunci
  static async find(keywords, language) {
    try {
      const data = await newsapi.v2.everything({
        q: keywords,
        from: '2020-07-08',
        to: '2020-07-09',
        language: language,
        sortBy: 'relevancy',
        page: 2
      })
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // function untuk menampilkan berita berdasarkan category
  static async category(cat, language) {
    try {
      const data = await newsapi.v2.sources({
        category: cat,
        language: language,
        country: 'us'
      })
      // console.log(data.sources);
      return data.sources;
    } catch (e) {
      console.log(e);
    }
  }

}

// News.category('technology', 'en');
// News.topHeadlines('id')
// News.find('bola')

module.exports = News;