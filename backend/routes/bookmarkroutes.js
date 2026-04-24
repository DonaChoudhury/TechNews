const express = require('express');
const router = express.Router();
const { saveBookmark, getBookmarks, removeBookmark } = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/auth'); // Aapka security guard!

// Har route pe authMiddleware laga diya
router.post('/', authMiddleware, saveBookmark);
router.get('/', authMiddleware, getBookmarks);
router.delete('/:id', authMiddleware, removeBookmark);

module.exports = router;