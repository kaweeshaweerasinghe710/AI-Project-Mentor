const fallbackQuickPrompts = [
  "How can I improve the security of this project?",
  "Are there any performance bottlenecks?",
  "Is the directory structure correct?"
];

export function getQuickPrompts(repoName: string): string[] {
  return fallbackQuickPrompts;
}

export function getSimulatedResponse(text: string, repoName: string): { response: string; code?: string } {
  return { 
    response: "I've analyzed your question. Once the Chat API is connected, I will provide project-specific architecture recommendations here!" 
  };
}

