const router = require('express').Router();
const NewsController = require('../controllers/news');

router.get('/', NewsController.findAll) // after login
router.post('/', NewsController.search) // Jika user cari berida dengan keywords
