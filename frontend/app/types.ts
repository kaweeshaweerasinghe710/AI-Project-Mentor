export interface CodeAnnotation {
  line: number;
  severity: 'info' | 'warning' | 'error';
  message: string;
  suggestion?: string;
}

export interface FileNode {
  name: string;
  path: string;
  isDir: boolean;
  children?: FileNode[];
  content?: string;
  language?: string;
  annotations?: CodeAnnotation[];
}

export interface ImprovementSuggestion {
  id: string;
  category: 'structure' | 'security' | 'loadBalance' | 'performance';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  impact: string;
  effort: string;
  filePath: string;
  beforeCode: string;
  afterCode: string;
}

export interface ReviewQuestion {
  id: string;
  question: string;
  codeContext?: string;
  guidance: string;
  modelAnswer: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface ScoreCategory {
  structure: number;
  security: number;
  loadBalance: number;
  performance: number;
  overall: number;
}

export interface AnalysisResult {
   id?: string; // Unique identifier for the analysis result
  repoUrl: string;
  repoName: string;
  overallScore: number;
  overallGrade: string;
  scores: ScoreCategory;
  stats: {
    files: number;
    lines: number;
    languages: LanguageStat[];
    complexity: 'Low' | 'Medium' | 'High' | 'Extreme';
  };
  suggestions: ImprovementSuggestion[];
  fileSystem: FileNode;
  reviewQuestions: ReviewQuestion[];
  chatGreeting: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  code?: string;
  timestamp: string;
}
