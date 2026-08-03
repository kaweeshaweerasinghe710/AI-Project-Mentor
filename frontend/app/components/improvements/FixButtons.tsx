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
            ? 'border-rose-500/50 bg-rose-500/10 text-rose-400'
            : 'border-border bg-surface/30 text-muted hover:border-rose-500/40 hover:text-rose-400'
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
            : 'border-border bg-surface/30 text-muted hover:border-accent/40 hover:text-accent'
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
            ? 'border-violet-500/50 bg-violet-500/10 text-violet-400'
            : fixLoading
            ? 'border-violet-500/30 bg-violet-500/5 text-violet-400 opacity-80'
            : 'border-border bg-surface/30 text-muted hover:border-violet-500/40 hover:text-violet-400'
        }`}
      >
        {fixLoading
          ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</>
          : <><Sparkles className="h-3.5 w-3.5" /> Auto Fix</>}
      </button>
    </div>
  );
}
