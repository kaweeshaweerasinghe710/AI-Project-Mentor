const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


router.get('/stats/registrations', authMiddleware, adminMiddleware, adminController.getRegistrationStats);

module.exports = router;