const router = require('express').Router();
const NewsController = require('../controllers/news');


router.post('/search', NewsController.search) // Jika user cari berida dengan keywords
router.get('/:country', NewsController.findAll) // after login

module.exports = router