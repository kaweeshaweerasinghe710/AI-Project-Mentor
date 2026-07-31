const express = require('express');
const router  = express.Router();
const authMiddleware    = require('../middleware/authMiddleware');
const autofixController = require('../controllers/autofixController');

router.use(authMiddleware);
router.post('/generate', autofixController.generateFix);

module.exports = router;