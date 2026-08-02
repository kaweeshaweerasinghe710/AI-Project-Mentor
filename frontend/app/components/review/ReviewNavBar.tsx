import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewNavBarProps {
  currentIndex: number;
  totalQuestions: number;
  reviewedIds: string[];
  questionIds: string[];
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number, direction: 'forward' | 'backward') => void;
}

export default function ReviewNavBar({
  currentIndex,
  totalQuestions,
  reviewedIds,
  questionIds,
  isFirst,
  isLast,
  onPrev,
  onNext,
  onGoTo
}: ReviewNavBarProps) {
  return (
    <div className="flex items-center justify-between px-1">
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </button>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalQuestions }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i, i > currentIndex ? 'forward' : 'backward')}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-6 h-2.5 bg-accent'
                : reviewedIds.includes(questionIds[i])
                ? 'w-2.5 h-2.5 bg-accent/40'
                : 'w-2.5 h-2.5 bg-border hover:bg-zinc-500'
            }`}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={isLast}
        className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded border border-border text-muted hover:border-accent hover:text-accent transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
