const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = require('../config/prisma');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const BADGE_RULES = [
  { type: 'first_step',       label: 'First Step!',       icon: '🌱', condition: (done, total, byCategory) => done === 1 },
  { type: 'half_way',         label: 'Halfway There!',    icon: '⚡', condition: (done, total) => done >= Math.ceil(total / 2) && done < total },
  { type: 'all_done',         label: 'Code Master!',      icon: '🏆', condition: (done, total) => done === total && total > 0 },
  { type: 'security_master',  label: 'Security Expert',   icon: '🛡️', condition: (done, total, byCategory) => byCategory.security?.done > 0 && byCategory.security?.done === byCategory.security?.total },
  { type: 'speed_demon',      label: 'Speed Demon',       icon: '🚀', condition: (done, total, byCategory) => byCategory.performance?.done > 0 && byCategory.performance?.done === byCategory.performance?.total },
  { type: 'architect',        label: 'Architect',         icon: '🏗️', condition: (done, total, byCategory) => byCategory.structure?.done > 0 && byCategory.structure?.done === byCategory.structure?.total },
];

exports.generateLearningPath = async (userId, suggestions, techStack) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
  });

  const prompt = `
    You are an expert software engineering mentor.
    A developer's codebase has been analyzed. Based on the issues found, generate a personalized learning path.

    Tech Stack: ${techStack.join(', ')}
    Issues found:
    ${suggestions.map((s, i) => `${i + 1}. [${s.category.toUpperCase()}] ${s.title} (Severity: ${s.severity})`).join('\n')}

    Generate exactly 6 learning steps that will help this developer address their weak areas.
    Each step should be a specific topic or skill to learn, ordered by priority (most critical first).

    You MUST respond with a JSON array matching this EXACT schema:
    [
      {
        "title": "<specific skill or topic to learn, e.g. 'JWT Authentication Best Practices'>",
        "category": "<security | performance | structure | loadBalance>",
        "resource": "<a real, specific URL to a documentation page, article, or guide - must be a real valid URL>"
      }
    ]
    Return exactly 6 items. No extra text.
  `;

  const result = await model.generateContent(prompt);
  const steps = JSON.parse(result.response.text());


  await prisma.learningStep.deleteMany({ where: { userId } });

  await prisma.learningStep.createMany({
    data: steps.map((step, idx) => ({
      title: step.title,
      category: step.category,
      resource: step.resource || null,
      order: idx + 1,
      isCompleted: false,
      userId
    }))
  });
};

exports.getLearningPath = async (req, res) => {
  try {
    const userId = req.user.id;

    const steps = await prisma.learningStep.findMany({
      where: { userId },
      orderBy: { order: 'asc' }
    });

    const badges = await prisma.badge.findMany({
      where: { userId },
      orderBy: { earnedAt: 'asc' }
    });

    res.status(200).json({ steps, badges });
  } catch (error) {
    console.error('Get Learning Path Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.completeStep = async (req, res) => {
  try {
    const { stepId } = req.params;
    const userId = req.user.id;

    // Mark step as completed
    const step = await prisma.learningStep.update({
      where: { id: stepId },
      data: { isCompleted: true, completedAt: new Date() }
    });

    if (step.userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const allSteps = await prisma.learningStep.findMany({ where: { userId } });
    const doneCount = allSteps.filter(s => s.isCompleted).length;
    const totalCount = allSteps.length;
    const byCategory = {};
    for (const s of allSteps) {
      if (!byCategory[s.category]) byCategory[s.category] = { done: 0, total: 0 };
      byCategory[s.category].total++;
      if (s.isCompleted) byCategory[s.category].done++;
    }

    const existingBadges = await prisma.badge.findMany({ where: { userId }, select: { type: true } });
    const existingTypes = new Set(existingBadges.map(b => b.type));

    const newBadges = [];
    for (const rule of BADGE_RULES) {
      if (!existingTypes.has(rule.type) && rule.condition(doneCount, totalCount, byCategory)) {
        const badge = await prisma.badge.create({
          data: { type: rule.type, label: rule.label, icon: rule.icon, userId }
        });
        newBadges.push(badge);
      }
    }

    res.status(200).json({ step, newBadges });
  } catch (error) {
    console.error('Complete Step Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
