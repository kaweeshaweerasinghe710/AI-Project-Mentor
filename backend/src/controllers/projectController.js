const prisma = require('../config/prisma');

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // get projects for the authenticated user
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' } 
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Get Projects Error:', error);
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
};

// Get a specific project by ID, including its suggestions and review questions
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        suggestions: true,
         reviewQuestions: true 
      }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to this project' });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error('Get Project By ID Error:', error);
    res.status(500).json({ message: 'Server error while fetching project details' });
  }
};