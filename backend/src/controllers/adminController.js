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

const bcrypt = require('bcryptjs'); 

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Update all existing admins to regular users
    await prisma.user.updateMany({
      where: { role: 'admin' },
      data: { role: 'user' }
    });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      }
    });
    res.status(201).json({
      message: 'New Administrator created successfully',
      email: newAdmin.email
    });

  } catch (error) {
    console.error('Create Admin Error:', error);
    res.status(500).json({ message: 'Server error during creating admin' });
  }
};