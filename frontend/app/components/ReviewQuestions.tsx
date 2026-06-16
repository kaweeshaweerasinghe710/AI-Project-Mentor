'use client';

import React, { useState, useMemo } from 'react';
import { ReviewQuestion } from '../types';
import { Search } from 'lucide-react';
import ReviewHeader from './review/ReviewHeader';
import QuestionCard from './review/QuestionCard';

interface ReviewQuestionsProps {
  questions: ReviewQuestion[];
}

export default function ReviewQuestions({ questions }: ReviewQuestionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [userDrafts, setUserDrafts] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  const handleResetProgress = () => {
    setReviewedIds([]);
    setUserDrafts({});
    setShowAnswers({});
    setExpandedId(null);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleToggleReviewed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReviewedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDraftChange = (id: string, value: string) => {
    setUserDrafts((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleToggleAnswer = (id: string) => {
    setShowAnswers((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return questions;
    const term = searchTerm.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(term) ||
        q.guidance.toLowerCase().includes(term)
    );
  }, [questions, searchTerm]);

  // Statistics
  const totalCount = questions.length;
  const reviewedCount = reviewedIds.length;
  const progressPercent = totalCount > 0 ? Math.round((reviewedCount / totalCount) * 100) : 0;

  if (questions.length === 0) {
    return (
      <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 p-12 text-center text-zinc-550 font-mono text-[10px]">
        {"// No code review questions generated for this codebase."}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs select-none">
      {/* Dashboard Header & Stats Block */}
      <ReviewHeader
        progressPercent={progressPercent}
        reviewedCount={reviewedCount}
        totalCount={totalCount}
        onResetProgress={handleResetProgress}
      />

      {/* Filter and Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-550" />
          <input
            type="text"
            placeholder="FILTER BY KEYWORD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#18252C]/40 border border-[#243740] text-zinc-300 rounded font-mono text-[10px] placeholder-zinc-600 focus:outline-none focus:border-accent transition duration-150"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 p-12 text-center text-zinc-650 font-sans text-xs">
            No questions match your filter query.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              isExpanded={expandedId === q.id}
              isReviewed={reviewedIds.includes(q.id)}
              draft={userDrafts[q.id] || ''}
              showAnswer={showAnswers[q.id] || false}
              onToggleExpand={() => handleToggleExpand(q.id)}
              onToggleReviewed={(e) => handleToggleReviewed(q.id, e)}
              onDraftChange={(val) => handleDraftChange(q.id, val)}
              onToggleAnswer={() => handleToggleAnswer(q.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
