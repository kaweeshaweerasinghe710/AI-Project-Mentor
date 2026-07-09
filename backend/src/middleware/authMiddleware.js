const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing or malformed' });
    }
    // verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = { id: decoded.userId };
    // proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};