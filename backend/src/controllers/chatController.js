const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = require('../config/prisma');


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.sendMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    // read the project from the database 
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: userId },
      include: { suggestions: true }
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found or access denied' });
    }

    // read chat history for the project from the database
    const oldMessages = await prisma.chatMessage.findMany({
      where: { projectId: projectId },
      orderBy: { createdAt: 'asc' }
    });

    
    const systemInstruction = `
      You are an expert senior software architect and AI coding mentor.
      You have previously audited the repository named "${project.repoName}" (${project.repoUrl}).
      Here is the audit summary:
      - Tech Stack: ${project.techStack.join(', ')}
      - Code Quality Score: ${project.score}/100
      - Major issues found:
      ${project.suggestions.map((s, idx) => `${idx + 1}. [${s.category.toUpperCase()}] ${s.title} in file ${s.filePath} (Severity: ${s.severity}) - Description: ${s.description}`).join('\n')}

      Your job is to answer the developer's questions.
      CRITICAL INSTRUCTIONS FOR RESPONSE STYLE:
      - Keep your responses very short, simple, direct, and to-the-point.
      - Do NOT write long paragraphs or theoretical explanations.
      - Answer only what is asked.
      - Provide clean, minimal code snippets only when explicitly requested.
      - Avoid fluff or conversational filler. Keep it extremely concise.
      
      FORMATTING INSTRUCTIONS:
      - Use bullet points (•) or numbered lists (1, 2, 3) to separate distinct points.seperate distinct points by new lines.
      - Put clear blank lines (double newlines) between different points or sections.
      - Use bold text (**word**) for key terms to make the answer highly scannable.
      - Ensure the layout is clean, spaced out, and easy to read. Do not bunch text together.
    `;

   // convert old messages to Gemini chat format
    const geminiHistory = oldMessages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemInstruction
    });

    const chat = model.startChat({
      history: geminiHistory
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const aiReplyText = response.text();

   // save both user message and AI reply to the database in a transaction
    await prisma.$transaction([
      prisma.chatMessage.create({
        data: {
          role: 'user',
          content: message,
          projectId: projectId
        }
      }),
      prisma.chatMessage.create({
        data: {
          role: 'model',
          content: aiReplyText,
          projectId: projectId
        }
      })
    ]);
    res.status(200).json({
      reply: aiReplyText
    });

  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ message: error.message || 'Server error during chat query' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: userId }
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or access denied' });
    }
    const messages = await prisma.chatMessage.findMany({
      where: { projectId: projectId },
      orderBy: { createdAt: 'asc' }
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Get Chat History Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};