const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateFix = async (req, res) => {
  const { beforeCode, title, description, filePath } = req.body;
  const ext = filePath.split('.').pop();
  const langMap = { js: 'JavaScript', ts: 'TypeScript', py: 'Python', java: 'Java' };
  const language = langMap[ext] || ext;

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { temperature: 0.2 },  
  });

  const prompt = `
    CRITICAL FORMATTING RULE: DO NOT use single quotes ('') to emphasize words or variables in your text responses. Do not wrap words in extra quotes.

    You are a senior software engineer. Fix the following ${language} code.

    ISSUE: ${title}
    DETAILS: ${description}
    FILE: ${filePath}

    VULNERABLE CODE:
    \`\`\`${ext}
    ${beforeCode}
    \`\`\`

    RULES:
    - Return ONLY the fixed code, no explanations
    - Keep the same code style and indentation
    - Fix only the specific issue mentioned
    - Do not add unrelated changes
    - Include necessary imports if needed

    After the code block, add one line starting with "EXPLANATION:" 
    explaining what was changed and why (one sentence only).
  `;

  const result = await model.generateContent(prompt);
  const text   = result.response.text();
  const codeMatch = text.match(/```[\w]*\n([\s\S]*?)```/);
  const explMatch = text.match(/EXPLANATION:\s*(.*)/i);

  res.json({
    fixedCode:   codeMatch ? codeMatch[1].trim() : text,
    explanation: explMatch ? explMatch[1].trim() : 'Code fixed successfully.',
  });
};
