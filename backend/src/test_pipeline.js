require('dotenv').config();
const prisma = require('./config/prisma');

async function testMiddleware() {
  console.log('Testing adminMiddleware database query...');
  try {
    // get first user
    const firstUser = await prisma.user.findFirst();
    if (!firstUser) {
      console.log('No users in DB');
      return;
    }
    console.log('Testing with User ID:', firstUser.id);
    
    // Run the query from adminMiddleware
    const user = await prisma.user.findUnique({
      where: { id: firstUser.id },
      select: { role: true }
    });
    
    console.log('Query success! User role is:', user.role);
  } catch (err) {
    console.error('Middleware database query failed with error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testMiddleware();
