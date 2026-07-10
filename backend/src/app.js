const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes'); 
const projectRoutes = require('./routes/projectRoutes'); 
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);   // Use the authRoutes for authentication-related endpoints
app.use('/api/analysis', analysisRoutes); 
app.use('/api/projects', projectRoutes);  
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'AI Project Mentor API'
  });
});

module.exports = app;