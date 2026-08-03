import React from 'react';
import { Send, Loader2, RotateCcw } from 'lucide-react';

interface AnswerSubmitFormProps {
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (e: React.MouseEvent) => void;
  submitting: boolean;
  feedbackErr: string | null;
  hasSubmitted: boolean;
  onRetry: (e: React.MouseEvent) => void;
  disabled: boolean;
}

export default function AnswerSubmitForm({
  draft,
  onDraftChange,
  onSubmit,
  submitting,
  feedbackErr,
  hasSubmitted,
  onRetry,
  disabled
}: AnswerSubmitFormProps) {
  return (
    <>
      <div className="space-y-2.5">
        <label className="block text-[10px] font-mono text-muted font-bold uppercase tracking-widest">
          Your Assessment
        </label>
        <textarea
          rows={5}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          disabled={disabled}
          placeholder="Write your answer here, then click Submit for feedback..."
          className="w-full bg-surface/60 border border-border text-zinc-200 rounded-lg p-4 font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-accent transition duration-150 resize-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
      {!hasSubmitted ? (
        <div className="flex items-center gap-3">
          <button
            onClick={onSubmit}
            disabled={submitting || !draft.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-background text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting
              ? <><Loader2 className="h-4 w-4 animate-spin" /> Evaluating...</>
              : <><Send className="h-4 w-4" /> Submit Answer</>}
          </button>
          {feedbackErr && (
            <p className="text-xs text-rose-400 font-sans">{feedbackErr}</p>
          )}
        </div>
      ) : (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Edit answer & re-submit
        </button>
      )}
    </>
  );
}
