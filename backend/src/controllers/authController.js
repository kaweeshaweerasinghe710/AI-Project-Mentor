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