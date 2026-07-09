const githubService = require('./githubService');
const geminiService = require('./geminiService');
const prisma = require('../config/prisma');


async function runAnalysis(repoUrl, userId) {
  //read the github repo and get the files
  const { repoName, files } = await githubService.fetchRepoFiles(repoUrl);
  
  if (!files || files.length === 0) {
    throw new Error('No readable code files found in the repository');
  }

  // analyze the codebase using Gemini
  const analysisResult = await geminiService.analyzeCodebase(repoName, files);
  const project = await prisma.project.create({
    data: {
      repoName: repoName,
      repoUrl: repoUrl,
      score: analysisResult.score,
      techStack: analysisResult.techStack,
      userId: userId,
      
      suggestions: {
        create: analysisResult.suggestions.map((s) => ({
          category: s.category,
          title: s.title,
          description: s.description,
          filePath: s.filePath,
          severity: s.severity,
        })),
      },
      
      reviewQuestions: {
        create: analysisResult.reviewQuestions.map((q) => ({
          question: q.question,
          codeContext: q.codeContext,
          guidance: q.guidance,
          modelAnswer: q.modelAnswer,
        })),
      },
    },
    include: {
      suggestions: true,
      reviewQuestions: true,
    },
  });

  return project;
}

module.exports = {
  runAnalysis,
};