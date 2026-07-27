const express = require('express');
const router  = express.Router();
const authMiddleware   = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

router.use(authMiddleware);
router.post('/evaluate', reviewController.evaluateAnswer);

module.exports = router;
