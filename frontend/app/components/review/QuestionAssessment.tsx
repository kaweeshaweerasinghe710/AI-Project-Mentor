'use client';

import React from 'react';
import { ReviewQuestion } from '../../types';
import { Code, CheckCircle2, Circle, Sparkles, HelpCircle } from 'lucide-react';

interface QuestionAssessmentProps {
  question: ReviewQuestion;
  isReviewed: boolean;
  draft: string;
  showAnswer: boolean;
  onToggleReviewed: (e: React.MouseEvent) => void;
  onDraftChange: (value: string) => void;
  onToggleAnswer: () => void;
}

export default function QuestionAssessment({
  question,
  isReviewed,
  draft,
  showAnswer,
  onToggleReviewed,
  onDraftChange,
  onToggleAnswer,
}: QuestionAssessmentProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="border-t border-border bg-surface/20 p-7 space-y-6 cursor-default"
    >
      <div className="bg-panel/60 border border-border/60 rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-muted">
          <Code className="h-4 w-4 text-accent" />
          <span>Code Review Guidance</span>
        </div>
        <p className="text-s leading-relaxed text-zinc-200">
          {question.guidance}
        </p>
      </div>

      <div className="space-y-2.5">
        <label className="block text-[10px] font-mono text-muted font-bold uppercase tracking-widest">
          Your Assessment Notes
        </label>
        <textarea
          rows={5}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="Write your thoughts, architectural recommendations, or code changes here..."
          className="w-full bg-surface/60 border border-border text-zinc-200 rounded-lg p-4 font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-accent transition duration-150 resize-none leading-relaxed"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onToggleReviewed}
          className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition duration-150 cursor-pointer ${
            isReviewed
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-border bg-panel/30 text-muted hover:text-zinc-200 hover:border-zinc-500'
          }`}
        >
          {isReviewed
            ? <CheckCircle2 className="h-4 w-4" />
            : <Circle className="h-4 w-4" />}
          {isReviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
        </button>

        <button
          onClick={onToggleAnswer}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent hover:text-accent/70 transition cursor-pointer"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          {showAnswer ? 'Hide Reference Answer' : 'Reveal Reference Answer'}
        </button>
      </div>

      {showAnswer && (
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-5 space-y-3 animate-slide-up">
          <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-accent">
            <HelpCircle className="h-4 w-4" />
            <span>Senior Architect Reference Answer</span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-200">
            {question.modelAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
