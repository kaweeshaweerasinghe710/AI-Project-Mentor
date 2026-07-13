const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeCodebase(repoName, files) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.0, 
    },
  });

  const filesContext = files
    .map((file) => `--- File Path: ${file.path} ---\nCode:\n${file.content}\n`)
    .join('\n');

  const prompt = `
    You are an expert senior software engineer and security auditor.
    Analyze the following codebase of the repository named "${repoName}".

    STRICT GUIDELINES FOR EVALUATION (VERY IMPORTANT):
    1. Be highly objective, logical, and consistent.
    2. If the codebase is empty or has very few lines of code, do not penalize it excessively.
    3. Do NOT hallucinate or guess vulnerabilities. Only raise suggestions for issues that are visibly present in the source files.
    4. Scoring Rules:
       - If there are no clear security vulnerabilities (e.g. no exposed passwords or tokens, no SQL injection), the security score MUST be 90 or above.
       - If connection pools or replica limits are not explicitly configured but not required for this type of codebase, do not lower the loadBalance score below 80.
       - If namespaces/structures are standard, structure score must be 85 or above.
    
    Provide the following output:
    1. Overall project quality score (from 0 to 100).
    2. Primary languages, libraries, and frameworks detected.
    3. List of code quality, security, and performance suggestions.
    4. A set of 5 code review questions based on this codebase (not multiple choice) that test the developer's understanding of their own code design, along with reference model answers.

    Here are the source files:
    ${filesContext}

    You MUST respond with a JSON object matching this EXACT JSON schema:
    {
      "score": <number representing overall score from 0 to 100>,
      "techStack": [<array of strings containing detected technologies>],
      "suggestions": [
        {
          "category": "<structure | security | loadBalance | performance>",
          "title": "<short descriptive title of the issue>",
          "description": "<detailed description of the bug, security flaw or performance bottleneck and how to fix it>",
          "filePath": "<exact path of the file containing the issue>",
          "severity": "<low | medium | high>"
        }
      ],
      "reviewQuestions": [
        {
          "question": "<a code review question asking the developer to evaluate their design or refactor a specific part of code>",
          "codeContext": "<optional code snippet from the files being referenced, or null>",
          "guidance": "<instructions on what the developer should inspect, e.g., 'Look at the function in lines 12-24 of app.js'>",
          "modelAnswer": "<detailed explanation of what a correct/best practice answer would be>"
        }
      ]
    }
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Gemini Analysis Error:', error);
    throw new Error('AI Analysis failed: ' + error.message);
  }
}

module.exports = {
  analyzeCodebase,
};