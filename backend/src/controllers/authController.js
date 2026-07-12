const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Call the registerUser function from authService
    const result = await authService.registerUser(email, password);

    res.status(201).json({
      message: 'User registered successfully',
      ...result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const result = await authService.loginUser(email, password);
    res.status(200).json({
      message: 'Login successful',
      ...result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; 

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'දැනට පවතින password එක වැරදියි!' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

   
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ message: 'password change successfully' });

  } catch (error) {
    console.error('Change Password Error:', error);
    res.status(500).json({ message: 'Server error during password change' });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { credentialToken } = req.body;
    if (!credentialToken) {
      return res.status(400).json({ message: 'Google credential token is required' });
    }

    const result = await authService.loginWithGoogle(credentialToken);
    res.status(200).json({
      message: 'Google login successful',
      ...result
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(400).json({ message: 'Google authentication failed: ' + error.message });
  }
};