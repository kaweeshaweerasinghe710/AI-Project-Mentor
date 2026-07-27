'use client';

import React from 'react';
import { ReviewQuestion } from '../../types';
import QuestionAssessment from './QuestionAssessment';
import { CheckCircle2, Circle } from 'lucide-react';

interface QuestionCardProps {
  question: ReviewQuestion;
  index: number;
  isReviewed: boolean;
  draft: string;
  showAnswer: boolean;
  onToggleReviewed: (e: React.MouseEvent) => void;
  onDraftChange: (value: string) => void;
  onToggleAnswer: () => void;
}

export default function QuestionCard({
  question,
  index,
  isReviewed,
  draft,
  showAnswer,
  onToggleReviewed,
  onDraftChange,
  onToggleAnswer,
}: QuestionCardProps) {
  return (
    <div className={`rounded-xl border-2 transition-all duration-300 font-sans overflow-hidden ${
      isReviewed
        ? 'border-accent/30 bg-accent/5'
        : 'border-border bg-panel/50'
    }`}>

      <div className="p-7 pb-5">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] font-bold text-muted bg-surface border border-border px-3 py-1 rounded-full font-mono tracking-widest uppercase">
            Question {index + 1}
          </span>
          {isReviewed && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-accent border border-accent/30 bg-accent/10 px-3 py-1 rounded-full font-mono">
              <CheckCircle2 className="h-3 w-3" /> Reviewed
            </span>
          )}
        </div>

        <h3 className="text-l font-semibold text-foreground leading-relaxed tracking-tight">
          {question.question}
        </h3>
      </div>
      <QuestionAssessment
        question={question}
        isReviewed={isReviewed}
        draft={draft}
        showAnswer={showAnswer}
        onToggleReviewed={onToggleReviewed}
        onDraftChange={onDraftChange}
        onToggleAnswer={onToggleAnswer}
      />
    </div>
  );
}
