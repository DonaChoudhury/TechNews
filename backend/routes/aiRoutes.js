const express = require('express');
const router = express.Router();
const { summarizeNews } = require('../controllers/aiController');

// POST request: /api/ai/summarize
router.post('/summarize', summarizeNews);

module.exports = router;