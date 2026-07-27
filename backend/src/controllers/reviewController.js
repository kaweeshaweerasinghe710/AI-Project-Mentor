const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.evaluateAnswer = async (req, res) => {
  try {
    const { question, guidance, modelAnswer, userAnswer } = req.body;

    if (!userAnswer || userAnswer.trim().length < 10) {
      return res.status(400).json({ message: 'Please write a more detailed answer before submitting.' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.4 },
    });

    const prompt = `
      You are a senior software architect reviewing a developer's self-assessment answer.

      CODE REVIEW QUESTION:
      "${question}"

      REVIEW GUIDANCE GIVEN TO DEVELOPER:
      "${guidance}"

      DEVELOPER'S ANSWER:
      "${userAnswer}"

      REFERENCE ANSWER (what a senior architect would say):
      "${modelAnswer}"

      Your task: Evaluate the developer's answer and give structured, constructive feedback.

      STRICT FORMATTING RULES:
      - Write in exactly 3 sections separated by newlines
      - Line 1 starts with "✅ What you got right:" — mention what the developer answered correctly (be specific)
      - Line 2 starts with "⚠️ What you missed:" — mention important points missing from their answer
      - Line 3 starts with "💡 Key takeaway:" — one concise sentence on the most important thing to remember
      - Be direct, honest, and encouraging
      - If the answer is completely wrong or irrelevant, say so kindly
      - Keep each section to 1-2 sentences maximum
    `;

    const result   = await model.generateContent(prompt);
    const feedback = result.response.text();

    res.status(200).json({ feedback });

  } catch (error) {
    console.error('Review Evaluate Error:', error);
    res.status(500).json({ message: 'AI evaluation failed: ' + error.message });
  }
};
