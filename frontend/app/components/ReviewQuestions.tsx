'use client';

import React from 'react';
import { ReviewQuestion } from '../types';
import { RotateCcw } from 'lucide-react';
import ReviewHeader from './review/ReviewHeader';
import QuestionCard from './review/QuestionCard';
import ReviewNavBar from './review/ReviewNavBar';
import { useReviewNavigation } from '../hooks/useReviewNavigation';

interface ReviewQuestionsProps {
  questions: ReviewQuestion[];
}

export default function ReviewQuestions({ questions }: ReviewQuestionsProps) {
  const {
    currentIndex,
    direction,
    animKey,
    reviewedIds,
    userDrafts,
    showAnswers,
    totalCount,
    reviewedCount,
    progressPercent,
    goTo,
    handleNext,
    handlePrev,
    handleResetProgress,
    handleToggleReviewed,
    handleDraftChange,
    handleToggleAnswer
  } = useReviewNavigation(questions);

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
      
      <ReviewNavBar
        currentIndex={currentIndex}
        totalQuestions={totalCount}
        reviewedIds={reviewedIds}
        questionIds={questions.map(q => q.id)}
        isFirst={isFirst}
        isLast={isLast}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoTo={goTo}
      />

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
