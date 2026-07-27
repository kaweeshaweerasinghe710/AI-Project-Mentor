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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleResetProgress = () => {
    setReviewedIds([]);
    setUserDrafts({});
    setShowAnswers({});
    setExpandedId(null);
    setCurrentIndex(0);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleToggleReviewed = (id: string, e: React.MouseEvent) => {
  e.stopPropagation();
  setReviewedIds((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  );
  if (currentIndex < filteredQuestions.length - 1) {
    setCurrentIndex(prev => prev + 1);
  }
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
      <div className="rounded-lg border border-border bg-panel/40 p-12 text-center text-muted font-mono text-[10px]">
        {"// No code review questions generated for this codebase."}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans text-xs select-none">
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
          <input
            type="text"
            placeholder="FILTER BY KEYWORD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-panel/40 border border-border text-zinc-300 rounded font-mono text-[10px] placeholder-zinc-650 focus:outline-none focus:border-accent transition duration-150"
          />
        </div>
      </div>

<div className="space-y-4">
  {filteredQuestions.length === 0 ? (
    <div className="rounded-lg border border-border bg-panel/40 p-12 text-center text-muted text-xs">
      No questions match your filter query.
    </div>
  ) : (
    <>
      {/* Question counter */}
      <div className="flex items-center justify-between text-[10px] font-mono text-muted px-1">
        <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="px-3 py-1 border border-border rounded hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <button
            onClick={() => setCurrentIndex(i => Math.min(filteredQuestions.length - 1, i + 1))}
            disabled={currentIndex === filteredQuestions.length - 1}
            className="px-3 py-1 border border-border rounded hover:border-accent hover:text-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
      <QuestionCard
        key={filteredQuestions[currentIndex].id}
        question={filteredQuestions[currentIndex]}
        index={currentIndex}
        isExpanded={expandedId === filteredQuestions[currentIndex].id}
        isReviewed={reviewedIds.includes(filteredQuestions[currentIndex].id)}
        draft={userDrafts[filteredQuestions[currentIndex].id] || ''}
        showAnswer={showAnswers[filteredQuestions[currentIndex].id] || false}
        onToggleExpand={() => handleToggleExpand(filteredQuestions[currentIndex].id)}
        onToggleReviewed={(e) => handleToggleReviewed(filteredQuestions[currentIndex].id, e)}
        onDraftChange={(val) => handleDraftChange(filteredQuestions[currentIndex].id, val)}
        onToggleAnswer={() => handleToggleAnswer(filteredQuestions[currentIndex].id)}
      />
    </>
  )}
</div>
    </div>
  );
}
