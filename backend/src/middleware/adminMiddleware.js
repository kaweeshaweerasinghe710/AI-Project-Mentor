const prisma = require('../config/prisma');

module.exports = async (req, res, next) => {
  try {
    // Assuming that the user ID is available in req.user.id after authentication
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Administrators only' });
    }
    // if the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Admin Middleware Error:', error);
    res.status(500).json({ message: 'Server error during admin verification' });
  }
};