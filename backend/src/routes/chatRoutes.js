const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/:projectId', authMiddleware, chatController.sendMessage);
router.get('/:projectId', authMiddleware, chatController.getChatHistory);

module.exports = router;