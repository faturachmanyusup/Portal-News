const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('92bfd907dea3489285abc89fd0f177d1');

async function findNews(search, bahasa) {
  try {
    const data = await newsapi.v2.everything({
      q: search,
      from: '2020-07-08',
      to: '2020-07-09',
      language: bahasa,
      sortBy: 'relevancy',
      page: 2,
    })
    // console.log(data.articles);
    return data.articles;
  } catch (error) {
    console.log(error); 
  }
}

// findNews('bola', 'id');