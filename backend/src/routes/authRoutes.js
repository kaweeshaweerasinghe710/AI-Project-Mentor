const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// 1. SIGNUP Route (POST /api/auth/signup)
router.post('/signup', authController.register);

// 2. LOGIN Route (POST /api/auth/login)
router.post('/login', authController.login);

// POST /api/auth/change-password
router.post('/change-password', authMiddleware, authController.changePassword);

// POST /api/auth/google
router.post('/google', authController.googleLogin);

module.exports = router;