const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);   // Use the authRoutes for authentication-related endpoints

app.get('/', (req, res) => {
  res.json({
    message: 'AI Project Mentor API'
  });
});

module.exports = app;