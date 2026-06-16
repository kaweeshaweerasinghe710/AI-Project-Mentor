import { AnalysisResult } from '../types';
import { getHashCode } from '../utils/hash';
import { customSuggestions, getCustomFileSystem, customReviewQuestions } from '../data/presets';

// Generates dynamic analysis response for custom URLs typed by users
export function generateMockAnalysis(repoUrl: string): AnalysisResult {
  const cleanUrl = repoUrl.trim().replace(/\/$/, '');
  const urlParts = cleanUrl.split('/');
  const repoName = urlParts[urlParts.length - 1] || 'custom-repository';
  
  // Create variations of scores based on character hash code of url
  const hash = getHashCode(repoUrl);

  const scores = {
    structure: 70 + (hash % 25), // 70-94
    security: 60 + (hash % 35),  // 60-94
    loadBalance: 55 + (hash % 40), // 55-94
    performance: 65 + (hash % 30), // 65-94
    overall: 0
  };
  scores.overall = Math.round((scores.structure + scores.security + scores.loadBalance + scores.performance) / 4);

  let overallGrade = 'B';
  if (scores.overall >= 90) overallGrade = 'A';
  else if (scores.overall >= 85) overallGrade = 'A-';
  else if (scores.overall >= 80) overallGrade = 'B+';
  else if (scores.overall >= 75) overallGrade = 'B';
  else if (scores.overall >= 70) overallGrade = 'B-';
  else if (scores.overall >= 65) overallGrade = 'C+';
  else if (scores.overall >= 60) overallGrade = 'C';
  else overallGrade = 'D';

  const languages = [
    { name: 'TypeScript', percentage: 55 + (hash % 30), color: '#3178c6' },
    { name: 'JavaScript', percentage: 20 + (hash % 15), color: '#f7df1e' },
    { name: 'CSS', percentage: 5 + (hash % 10), color: '#563d7c' },
    { name: 'HTML', percentage: 2 + (hash % 5), color: '#e34c26' }
  ];
  const totalPercentage = languages.reduce((acc, curr) => acc + curr.percentage, 0);
  languages[0].percentage += (100 - totalPercentage); // ensure exact 100%

  return {
    repoUrl,
    repoName,
    overallScore: scores.overall,
    overallGrade,
    scores,
    stats: {
      files: 20 + (hash % 80),
      lines: 3000 + (hash % 15000),
      languages,
      complexity: (hash % 3 === 0) ? 'High' : (hash % 3 === 1) ? 'Medium' : 'Low'
    },
    chatGreeting: `I have completed scanning the repository at \`${repoUrl}\`. Overall, I gave it a scorecard score of ${scores.overall}% (${overallGrade}). I identified security and architecture details in the routes, database layer, and Docker configuration files. Let me know if you would like me to explain the issues or suggest refactor code!`,
    suggestions: customSuggestions,
    fileSystem: {
      name: repoName,
      path: repoName,
      isDir: true,
      children: getCustomFileSystem(repoName)
    },
    reviewQuestions: customReviewQuestions
  };
}

