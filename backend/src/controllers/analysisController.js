const analysisService = require('../services/analysisService');

exports.createAnalysis = async (req, res) => {
  try {
    const { repoUrl } = req.body;
    const userId = req.user.id; 

    if (!repoUrl) {
      return res.status(400).json({ message: 'Repository URL is required' });
    }
    const project = await analysisService.runAnalysis(repoUrl, userId);

    res.status(201).json({
      message: 'Repository analyzed and saved successfully',
      project
    });
  } catch (error) {
    console.error('Create Analysis Error:', error);
    res.status(500).json({ message: error.message || 'Server error during codebase analysis' });
  }
};