'use client';

import React from 'react';
import { ReviewQuestion } from '../../types';
import QuestionHeader from './QuestionHeader';
import QuestionAssessment from './QuestionAssessment';

interface QuestionCardProps {
  question: ReviewQuestion;
  index: number;
  isExpanded: boolean;
  isReviewed: boolean;
  draft: string;
  showAnswer: boolean;
  onToggleExpand: () => void;
  onToggleReviewed: (e: React.MouseEvent) => void;
  onDraftChange: (value: string) => void;
  onToggleAnswer: () => void;
}

export default function QuestionCard({
  question,
  index,
  isExpanded,
  isReviewed,
  draft,
  showAnswer,
  onToggleExpand,
  onToggleReviewed,
  onDraftChange,
  onToggleAnswer
}: QuestionCardProps) {
  return (
    <div 
      onClick={onToggleExpand}
      className={`rounded border transition-all duration-200 cursor-pointer select-none bg-panel/30 font-sans ${
        isExpanded ? 'border-accent bg-panel/60' : 'border-border hover:border-accent/60'
      }`}
    >
      <QuestionHeader
        question={question}
        index={index}
        isExpanded={isExpanded}
        isReviewed={isReviewed}
        onToggleReviewed={onToggleReviewed}
      />
      {isExpanded && (
        <QuestionAssessment
          question={question}
          isReviewed={isReviewed}
          draft={draft}
          showAnswer={showAnswer}
          onToggleReviewed={onToggleReviewed}
          onDraftChange={onDraftChange}
          onToggleAnswer={onToggleAnswer}
        />
      )}
    </div>
  );
}
