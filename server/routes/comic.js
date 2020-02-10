const express = require('express')
const router = express.Router()
const ComicsController = require('../controllers/ComicController');

router.get('/', ComicsController.list);
router.put('/:id', ComicsController.update);

module.exports = router