'use client';

import React, { useState, useMemo } from 'react';
import { ReviewQuestion } from '../types';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import ReviewHeader from './review/ReviewHeader';
import QuestionCard from './review/QuestionCard';

interface ReviewQuestionsProps {
  questions: ReviewQuestion[];
}

export default function ReviewQuestions({ questions }: ReviewQuestionsProps) {
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [direction, setDirection]         = useState<'forward' | 'backward'>('forward');
  const [animKey, setAnimKey]             = useState(0);
  const [reviewedIds, setReviewedIds]     = useState<string[]>([]);
  const [userDrafts, setUserDrafts]       = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers]     = useState<Record<string, boolean>>({});

  const goTo = (newIndex: number, dir: 'forward' | 'backward') => {
    setDirection(dir);
    setAnimKey(k => k + 1);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) goTo(currentIndex + 1, 'forward');
  };

  const handlePrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1, 'backward');
  };

  const handleResetProgress = () => {
    setReviewedIds([]);
    setUserDrafts({});
    setShowAnswers({});
    setCurrentIndex(0);
    setDirection('forward');
    setAnimKey(k => k + 1);
  };

  const handleToggleReviewed = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const alreadyReviewed = reviewedIds.includes(id);
    setReviewedIds(prev =>
      alreadyReviewed ? prev.filter(i => i !== id) : [...prev, id]
    );
    // Auto-advance to next question when marking as reviewed
    if (!alreadyReviewed && currentIndex < questions.length - 1) {
      setTimeout(() => goTo(currentIndex + 1, 'forward'), 300);
    }
  };

  const handleDraftChange = (id: string, value: string) => {
    setUserDrafts(prev => ({ ...prev, [id]: value }));
  };

  const handleToggleAnswer = (id: string) => {
    setShowAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount    = questions.length;
  const reviewedCount = reviewedIds.length;
  const progressPercent = totalCount > 0 ? Math.round((reviewedCount / totalCount) * 100) : 0;

  if (questions.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-panel/40 p-12 text-center text-muted font-mono text-[10px]">
        {'// No code review questions generated for this codebase.'}
      </div>
    );
  }

  const current = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast  = currentIndex === questions.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">

      <ReviewHeader
        progressPercent={progressPercent}
        reviewedCount={reviewedCount}
        totalCount={totalCount}
        onResetProgress={handleResetProgress}
      />
      <div className="flex items-center justify-between px-1">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <div className="flex items-center gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > currentIndex ? 'forward' : 'backward')}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-6 h-2.5 bg-accent'
                  : reviewedIds.includes(questions[i].id)
                  ? 'w-2.5 h-2.5 bg-accent/40'
                  : 'w-2.5 h-2.5 bg-border hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={isLast}
          className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-hidden">
        <div
          key={animKey}
          className={direction === 'forward' ? 'animate-slide-right' : 'animate-slide-left'}
        >
          <QuestionCard
            question={current}
            index={currentIndex}
            isReviewed={reviewedIds.includes(current.id)}
            draft={userDrafts[current.id] || ''}
            showAnswer={showAnswers[current.id] || false}
            onToggleReviewed={(e) => handleToggleReviewed(current.id, e)}
            onDraftChange={(val) => handleDraftChange(current.id, val)}
            onToggleAnswer={() => handleToggleAnswer(current.id)}
          />
        </div>
      </div>

      {!isLast && (
        <p className="text-center text-[10px] text-muted font-mono">
          Mark as reviewed to auto-advance → or use Next button
        </p>
      )}
      {isLast && reviewedCount === totalCount && (
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-accent font-sans">🎉 All questions reviewed!</p>
          <button
            onClick={handleResetProgress}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset & Start Again
          </button>
        </div>
      )}
    </div>
  );
}
