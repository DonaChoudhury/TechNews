const express = require('express');
const router = express.Router();
const { getNewsByCategory } = require('../controllers/newsController');

// GET request: /api/news/:category

router.get('/:category', getNewsByCategory);

module.exports = router;