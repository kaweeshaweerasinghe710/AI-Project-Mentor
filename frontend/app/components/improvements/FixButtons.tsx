import React from 'react';
import { Bug, Wrench, Sparkles, Loader2 } from 'lucide-react';

interface FixButtonsProps {
  showProblem: boolean;
  showFix: boolean;
  autoFix: string | null;
  fixLoading: boolean;
  onToggleProblem: () => void;
  onToggleFix: () => void;
  onAutoFix: () => void;
}

export default function FixButtons({
  showProblem,
  showFix,
  autoFix,
  fixLoading,
  onToggleProblem,
  onToggleFix,
  onAutoFix
}: FixButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      <button
        onClick={onToggleProblem}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
          showProblem
            ? 'border-accent/50 bg-accent/10 text-accent'
            : 'border-border bg-surface/30 text-muted'
        }`}
      >
        <Bug className="h-3.5 w-3.5" />
        Vulnerable Code
      </button>

      <button
        onClick={onToggleFix}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
          showFix
            ? 'border-accent/50 bg-accent/10 text-accent'
            : 'border-border bg-surface/30 text-muted'
        }`}
      >
        <Wrench className="h-3.5 w-3.5" />
        Refactor Fix
      </button>

      <button
        onClick={onAutoFix}
        disabled={fixLoading || !!autoFix}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:cursor-not-allowed ${
          autoFix
            ? 'border-accent/50 bg-accent/10 text-accent'
            : fixLoading
            ? 'border-accent/30 bg-accent/5 text-accent opacity-80'
            : 'border-border bg-surface/30 text-muted'
        }`}
      >
        {fixLoading
          ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
          : <><Sparkles className="h-3.5 w-3.5" /> Auto Fix</>}
      </button>
    </div>
  );
}
