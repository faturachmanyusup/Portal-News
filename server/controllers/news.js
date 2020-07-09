const News = require('../helpers/newsapi')

class NewsController {
    static findAll (req, res ,next) {

        const { country } = req.params

        News.topHeadlines(country)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => next(err))
    }
    static search (req, res, next) {

        const { keywords, language } = req.query

        News.find(keywords,language)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => next(err))

    }
}

module.exports = NewsController;