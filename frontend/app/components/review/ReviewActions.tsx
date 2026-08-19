import React from 'react';
import { CheckCircle2, Circle, HelpCircle } from 'lucide-react';

interface ReviewActionsProps {
  isReviewed: boolean;
  showAnswer: boolean;
  onToggleReviewed: (e: React.MouseEvent) => void;
  onToggleAnswer: () => void;
}

export default function ReviewActions({
  isReviewed,
  showAnswer,
  onToggleReviewed,
  onToggleAnswer,
}: ReviewActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border/40">
      <button
        onClick={onToggleReviewed}
        className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition duration-150 cursor-pointer ${
          isReviewed
            ? 'border-accent/40 bg-accent/10 text-accent'
            : 'border-border bg-panel/30 text-muted hover:text-slate-200 hover:border-slate-500'
        }`}
      >
        {isReviewed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
        {isReviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
      </button>

    </div>
  );
}
