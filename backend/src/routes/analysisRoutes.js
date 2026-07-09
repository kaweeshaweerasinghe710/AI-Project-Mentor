const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/analysis (Get all analyses for the authenticated user)
router.post('/', authMiddleware, analysisController.createAnalysis);

module.exports = router;