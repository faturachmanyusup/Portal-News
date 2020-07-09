const router = require('express').Router();

router.get('/', ControllerAfterLogin) // after login
router.post('/', ControlerSearch) // Jika user cari berida dengan keywords
