const prisma = require('../config/prisma');

exports.getRegistrationStats = async (req, res) => {
  try {
    const stats = await prisma.$queryRaw`
      SELECT 
        TO_CHAR("createdAt", 'YYYY-MM-DD') AS date, 
        COUNT(*)::int AS count
      FROM "User"
      GROUP BY TO_CHAR("createdAt", 'YYYY-MM-DD')
      ORDER BY date ASC
    `;

    res.status(200).json(stats);
  } catch (error) {
    console.error('Admin Stats Error:', error);
    res.status(500).json({ message: 'Server error during fetching registration stats' });
  }
};