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
  onToggleAnswer
}: QuestionAssessmentProps) {
  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      className="border-t border-[#243740] bg-[#131D21]/30 p-4 space-y-4 font-sans text-xs cursor-default"
    >
      {/* Guidance / Inspection Target */}
      <div className="bg-[#18252C]/50 border border-[#243740]/60 rounded p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-500">
          <Code className="h-3.5 w-3.5 text-accent" />
          <span>Code Review Guidance</span>
        </div>
        <p className="text-[11px] leading-relaxed text-zinc-400 font-mono">
          {question.guidance}
        </p>
      </div>

      {/* Interactive Review Draft Box */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono text-zinc-550 font-bold uppercase tracking-wider">
          Your Assessment Notes 
        </label>
        <textarea
          rows={3}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder="Draft your code review response, architectural recommendations, or code changes here..."
          className="w-full bg-[#131D21]/60 border border-[#243740] text-zinc-300 rounded p-3 font-mono text-[10px] placeholder-zinc-700 focus:outline-none focus:border-accent transition duration-150 resize-none"
        />
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Mark Reviewed Toggle */}
        <button
          onClick={onToggleReviewed}
          className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded text-[10px] font-mono font-bold uppercase tracking-wider transition duration-150 cursor-pointer ${
            isReviewed 
              ? 'border-accent/40 bg-accent/5 text-accent' 
              : 'border-[#243740] bg-[#18252C]/30 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
          }`}
        >
          {isReviewed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
          <span>{isReviewed ? 'MARK AS UNREVIEWED' : 'MARK AS REVIEWED'}</span>
        </button>

        {/* Show Answer Trigger */}
        <button
          onClick={onToggleAnswer}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-accent hover:text-accent/80 transition cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>
            {showAnswer ? 'HIDE SENIOR ARCHITECT ANSWER' : 'REVEAL SENIOR ARCHITECT ANSWER'}
          </span>
        </button>
      </div>

      {/* Model Answer Slide-down Panel */}
      {showAnswer && (
        <div className="rounded border border-[#DCA052]/20 bg-[#DCA052]/5 p-4 space-y-2 animate-slide-up mt-2">
          <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono uppercase tracking-wider text-accent">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Senior Architect Reference Answer</span>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-350 font-mono">
            {question.modelAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
