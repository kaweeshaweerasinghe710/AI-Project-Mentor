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
    <div className="p-4 flex items-start gap-3 justify-between">
      <div className="flex items-start gap-3">
        <button 
          onClick={onToggleReviewed}
          className="mt-0.5 text-zinc-550 hover:text-accent transition duration-150 shrink-0"
        >
          {isReviewed ? (
            <CheckCircle2 className="h-4.5 w-4.5 text-accent" />
          ) : (
            <Circle className="h-4.5 w-4.5 text-zinc-600" />
          )}
        </button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-zinc-500 bg-[#131D21] border border-[#243740] px-1.5 py-0.5 rounded">
              AUDIT CHECKPOINT {index + 1}
            </span>
            {isReviewed && (
              <span className="text-[8px] font-extrabold text-[#DCA052] tracking-wider uppercase bg-[#DCA052]/5 border border-[#DCA052]/20 px-1 rounded">
                Reviewed
              </span>
            )}
          </div>
          <h4 className="text-xs font-bold text-[#ECE9E4] font-sans leading-relaxed pr-6">
            {question.question}
          </h4>
        </div>
      </div>
      <div className="shrink-0 text-zinc-500 mt-1">
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </div>
    </div>
  );
}
