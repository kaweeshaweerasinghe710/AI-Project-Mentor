const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 1. User Register Logic
async function registerUser(email, password) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: email.split('@')[0]
    }
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role} };
}

// 2. User Login Logic
async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}


// 3. Google OAuth Login/Signup Logic
async function loginWithGoogle(credentialToken) {
  const ticket = await client.verifyIdToken({
    idToken: credentialToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const { email, name } = payload;
  let user = await prisma.user.findUnique({
    where: { email }
  });

  // If user doesn't exist, create a new user with a random password
  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
        role: 'user'
      }
    });
  }
  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, passwordHash: user.password.substring(0, 10) },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

module.exports = {
  registerUser,
  loginUser
};