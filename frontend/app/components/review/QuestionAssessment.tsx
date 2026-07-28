'use client';

import React, { useState } from 'react';
import { ReviewQuestion } from '../../types';
import { Code, CheckCircle2, Circle, Sparkles, HelpCircle, Send, Loader2, RotateCcw } from 'lucide-react';

interface QuestionAssessmentProps {
  question: ReviewQuestion;
  isReviewed: boolean;
  draft: string;
  showAnswer: boolean;
  onToggleReviewed: (e: React.MouseEvent) => void;
  onDraftChange: (value: string) => void;
  onToggleAnswer: () => void;
}

const FEEDBACK_STYLES: Record<string, { color: string; border: string; bg: string; label: string }> = {
  '🟢': { color: 'text-emerald-400', border: 'border-emerald-400/25', bg: 'bg-emerald-400/8',  label: 'What you got right' },
  '⚠️': { color: 'text-amber-400',  border: 'border-amber-400/25',  bg: 'bg-amber-400/8',   label: 'What you missed' },
  '💡': { color: 'text-blue-400',   border: 'border-blue-400/25',   bg: 'bg-blue-400/8',    label: 'Key takeaway' },
};

function FeedbackLine({ line }: { line: string }) {
  const matched = Object.entries(FEEDBACK_STYLES).find(([emoji]) => line.startsWith(emoji));

  if (matched) {
    const [emoji, style] = matched;
    const colonIdx = line.indexOf(':');
    const rest = colonIdx !== -1 ? line.substring(colonIdx + 1).trim() : line.replace(emoji, '').trim();
    if (emoji === '🟢') {
      return (
        <div className={`rounded-lg border p-4 ${style.border} ${style.bg}`}>
          <div className={`flex items-center gap-2 mb-2 text-[11px] font-mono font-bold uppercase tracking-wider ${style.color}`}>
            <span className="text-lg leading-none">{emoji}</span>
            <span>{style.label}</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed">{rest}</p>
        </div>
      );
    }
    return (
      <div className="text-sm text-zinc-200 leading-relaxed">
        <div className={`flex items-center gap-2 mb-1 text-[11px] font-mono font-bold uppercase tracking-wider ${style.color}`}>
          <span className="text-lg leading-none">{emoji}</span>
          <span>{style.label}</span>
        </div>
        <p className="mb-2">{rest}</p>
      </div>
    );
  }
  const colonIdx = line.indexOf(':');
  if (colonIdx === -1) return <p className="text-sm text-zinc-200 leading-relaxed">{line}</p>;
  return (
    <p className="text-sm text-zinc-200 leading-relaxed">
      <span className="font-bold text-foreground">{line.substring(0, colonIdx + 1)}</span>
      {line.substring(colonIdx + 1)}
    </p>
  );
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
  const [submitting, setSubmitting]   = useState(false);
  const [aiFeedback, setAiFeedback]   = useState<string | null>(null);
  const [feedbackErr, setFeedbackErr] = useState<string | null>(null);

  const handleSubmitAnswer = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!draft.trim() || draft.trim().length < 10) {
      setFeedbackErr('Please write a more detailed answer before submitting.');
      return;
    }

    setSubmitting(true);
    setAiFeedback(null);
    setFeedbackErr(null);

    try {
      const token = localStorage.getItem('user_token');
      const res   = await fetch('http://localhost:5000/api/review/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          question:    question.question,
          modelAnswer: question.modelAnswer,
          userAnswer:  draft,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Evaluation failed');
      setAiFeedback(data.feedback);
    } catch (err: any) {
      setFeedbackErr(err.message || 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAiFeedback(null);
    setFeedbackErr(null);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="border-t border-border bg-surface/20 p-7 space-y-6 cursor-default"
    >
    
      <div className="space-y-2.5">
        <label className="block text-[10px] font-mono text-muted font-bold uppercase tracking-widest">
          Your Assessment
        </label>
        <textarea
          rows={5}
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          disabled={!!aiFeedback}
          placeholder="Write your answer here, then click Submit for feedback..."
          className="w-full bg-surface/60 border border-border text-zinc-200 rounded-lg p-4 font-sans text-sm placeholder-zinc-600 focus:outline-none focus:border-accent transition duration-150 resize-none leading-relaxed disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
      {!aiFeedback ? (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmitAnswer}
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
          onClick={handleRetry}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Edit answer & re-submit
        </button>
      )}

      {aiFeedback && (
        <div className="rounded-lg border border-accent/25 bg-accent/5 p-6 space-y-3 animate-slide-up">
          <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-accent mb-10">
            <span>Senior Architect Feedback on Your Answer</span>
          </div>
          <div className="space-y-3">
            {aiFeedback
              .split('\n')
              .filter(l => l.trim())
              .map((line, idx) => (
                <FeedbackLine key={idx} line={line.trim()} />
              ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border/40">
        <button
          onClick={onToggleReviewed}
          className={`inline-flex items-center gap-2 px-5 py-2.5 border rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition duration-150 cursor-pointer ${
            isReviewed
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-border bg-panel/30 text-muted hover:text-zinc-200 hover:border-zinc-500'
          }`}
        >
          {isReviewed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          {isReviewed ? 'Mark as Unreviewed' : 'Mark as Reviewed'}
        </button>

      </div>
      
    </div>
  );
}
