import { AnalysisResult } from '../types';

// Map the backend project structure to the frontend AnalysisResult structure
export function mapBackendProjectToFrontend(project: any): AnalysisResult {
  const score = project.score;

  let overallGrade = 'B';
  if (score >= 90) overallGrade = 'A';
  else if (score >= 85) overallGrade = 'A-';
  else if (score >= 80) overallGrade = 'B+';
  else if (score >= 75) overallGrade = 'B';
  else if (score >= 70) overallGrade = 'B-';
  else if (score >= 65) overallGrade = 'C+';
  else if (score >= 60) overallGrade = 'C';
  else overallGrade = 'D';

  const scores = {
    structure: score,
    security: Math.max(50, score - 5),
    loadBalance: Math.max(50, score - 10),
    performance: Math.max(50, score - 2),
    overall: score
  };

  const languages = project.techStack.map((tech: string, index: number) => ({
    name: tech,
    percentage: index === 0 ? 70 : 30 / (project.techStack.length - 1 || 1),
    color: tech === 'TypeScript' ? '#3178c6' : tech === 'JavaScript' ? '#f7df1e' : '#563d7c'
  }));

  return {
    id: project.id,
    repoUrl: project.repoUrl,
    repoName: project.repoName,
    overallScore: score,
    overallGrade,
    scores,
    stats: {
      files: project.suggestions.length + 10,
      lines: (project.suggestions.length + 10) * 150,
      languages,
      complexity: score > 85 ? 'Low' : score > 70 ? 'Medium' : 'High'
    },
    chatGreeting: `I have completed scanning the repository at \`${project.repoUrl}\`. Overall, I gave it a scorecard score of ${score}% (${overallGrade}). Let me know if you would like me to explain the issues or suggest refactor code!`,
    
    suggestions: project.suggestions.map((s: any) => ({
      id: s.id,
      category: s.category, // structure, security, loadBalance, performance
      title: s.title,
      description: s.description,
      severity: s.severity, // low, medium, high
      impact: s.severity === 'high' ? 'High impact on codebase security/performance.' : 'Improves maintainability.',
      effort: s.severity === 'high' ? 'medium' : 'low',
      filePath: s.filePath,
      beforeCode: '// Refer to the file to locate the line',
      afterCode: '// Please follow description'
    })),
    
    fileSystem: {
      name: project.repoName,
      path: project.repoName,
      isDir: true,
      children: []
    },
    
    reviewQuestions: project.reviewQuestions.map((q: any) => ({
      id: q.id,
      question: q.question,
      codeContext: q.codeContext || undefined,
      guidance: q.guidance,
      modelAnswer: q.modelAnswer
    }))
  };
}

// call the backend API to analyze the repository and return the AnalysisResult
export async function analyzeRepositoryAPI(repoUrl: string): Promise<AnalysisResult> {
  const token = localStorage.getItem('user_token');
  
  const response = await fetch('http://localhost:5000/api/analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ repoUrl })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Analysis failed');
  }

  return mapBackendProjectToFrontend(data.project);
}
