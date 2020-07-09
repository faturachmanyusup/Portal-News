const router = require('express').Router()
const user = require('./user')
const news = require('./newsRoutes')

router.use('/', user)
router.use('/news', user)

module.exports = router
