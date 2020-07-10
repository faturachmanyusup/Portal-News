const router = require('express').Router()
const UserController = require('../controllers/user')
const news = require(`./newsRoutes`)
const Authentication = require('../middlewares/authenthication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/google', UserController.googleLogin)
router.use(Authentication)
router.post('/currency',UserController.currency)
router.use('/news', news) 


module.exports = router 