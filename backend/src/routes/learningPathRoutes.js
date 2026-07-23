const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const learningPathController = require('../controllers/learningPathController');


router.use(authMiddleware);
router.get('/', learningPathController.getLearningPath);
router.put('/step/:stepId/complete', learningPathController.completeStep);

module.exports = router;
