const router = require('express').Router();
const NewsController = require('../controllers/news');
const Authentication = require('../middlewares/authenthication')

router.use(Authentication)
router.get('/search', NewsController.search) // Jika user cari berida dengan keywords
router.get('/:country', NewsController.findAll) // after login

module.exports = router