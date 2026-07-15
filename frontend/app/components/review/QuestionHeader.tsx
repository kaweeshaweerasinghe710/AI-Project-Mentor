'use client';

import React from 'react';
import { ReviewQuestion } from '../../types';
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';

interface QuestionHeaderProps {
  question: ReviewQuestion;
  index: number;
  isExpanded: boolean;
  isReviewed: boolean;
  onToggleReviewed: (e: React.MouseEvent) => void;
}

export default function QuestionHeader({
  question,
  index,
  isExpanded,
  isReviewed,
  onToggleReviewed
}: QuestionHeaderProps) {
  return (
    <div className="p-4 flex items-start gap-3 justify-between font-sans">
      <div className="flex items-start gap-3">
        <button 
          onClick={onToggleReviewed}
          className="mt-0.5 text-muted hover:text-accent transition duration-150 shrink-0"
        >
          {isReviewed ? (
            <CheckCircle2 className="h-4.5 w-4.5 text-accent" />
          ) : (
            <Circle className="h-4.5 w-4.5 text-zinc-600" />
          )}
        </button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-muted bg-surface border border-border px-1.5 py-0.5 rounded font-mono">
              AUDIT CHECKPOINT {index + 1}
            </span>
            {isReviewed && (
              <span className="text-[8px] font-extrabold text-accent tracking-wider uppercase bg-accent-muted border border-accent/20 px-1 rounded font-mono">
                Reviewed
              </span>
            )}
          </div>
          <h4 className="text-xs font-bold text-foreground leading-relaxed pr-6">
            {question.question}
          </h4>
        </div>
      </div>
      <div className="shrink-0 text-muted mt-1">
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>
    </div>
  );
}
