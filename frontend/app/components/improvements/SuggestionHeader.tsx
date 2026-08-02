'use client';
import React from 'react';
import { ImprovementSuggestion } from '../../types';
import { ShieldAlert, Code2, Server, Cpu, ChevronDown, ChevronUp, Bug, Wrench, Sparkles, Loader2, ClipboardCopy, Check } from 'lucide-react';

const getSeverityBadgeColor = (severity: 'low' | 'medium' | 'high') => {
  if (severity === 'high')   return 'text-accent border-accent/20 bg-accent/5';
  if (severity === 'medium') return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
  return 'text-muted border-border bg-panel/40';
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  security:    ShieldAlert,
  structure:   Code2,
  loadBalance: Server,
  performance: Cpu,
};

function parseSections(description: string) {
  const sections: Record<string, string> = {};
  for (const line of description.split('\n').filter(l => l.trim())) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1 && colonIdx < 12) {
      const key   = line.substring(0, colonIdx).trim().toLowerCase();
      const value = line.substring(colonIdx + 1).trim();
      sections[key] = value;
    }
  }
  return sections;
}
interface SuggestionHeaderProps {
  suggestion:      ImprovementSuggestion;
  isExpanded:      boolean;
  showProblem:     boolean;
  showFix:         boolean;
  autoFix:         string | null;
  fixLoading:      boolean;
  fixExplanation:  string;
  copied:          boolean;
  onToggleExpand:  () => void;
  onToggleProblem: () => void;
  onToggleFix:     () => void;
  onAutoFix:       () => void;
  onCopy:          () => void;
}

export default function SuggestionHeader({
  suggestion,
  isExpanded,
  showProblem,
  showFix,
  autoFix,
  fixLoading,
  fixExplanation,
  copied,
  onToggleExpand,
  onToggleProblem,
  onToggleFix,
  onAutoFix,
  onCopy,
}: SuggestionHeaderProps) {
  const CatIcon  = CATEGORY_ICONS[suggestion.category] || Cpu;
  const sections = parseSections(suggestion.description);

  return (
    <div className="p-5 font-sans space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono uppercase tracking-wider">
        <span className="inline-flex items-center gap-1.5 text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/15 font-bold">
          <CatIcon className="h-3 w-3" />
          {suggestion.category}
        </span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded border font-bold ${getSeverityBadgeColor(suggestion.severity)}`}>
          {suggestion.severity} severity
        </span>
        <span className="text-muted bg-surface/60 px-2 py-0.5 rounded border border-border font-mono">
          {suggestion.filePath}
        </span>
      </div>
      <h3 className="text-base font-semibold text-foreground tracking-normal">
        {suggestion.title}
      </h3>
      {sections['impact'] && (
        <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
          <span className="font-semibold text-foreground">Impact:</span>{' '}
          {sections['impact']}
        </p>
      )}
      <button
        onClick={onToggleExpand}
        className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-2 border border-border bg-surface/30 rounded hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer select-none"
      >
        {isExpanded
          ? <><ChevronUp className="h-3 w-3" /><span>Hide Fix</span></>
          : <><ChevronDown className="h-3 w-3" /><span>Show Fix</span></>}
      </button>

      {isExpanded && (
        <div className="space-y-3 animate-slide-up">
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
          {showProblem && sections['problem'] && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-4 animate-slide-up">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 mb-1.5">
                🐛 Problem
              </p>
              <p className="text-sm text-zinc-200 leading-relaxed">{sections['problem']}</p>
            </div>
          )}
          {showFix && sections['fix'] && (
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 animate-slide-up">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-1.5">
                🔧 Fix
              </p>
              <p className="text-sm text-zinc-200 leading-relaxed">{sections['fix']}</p>
            </div>
          )}
          {autoFix && (
            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-4 space-y-3 animate-slide-up">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> AI Generated Fix
                </p>
                <button
                  onClick={onCopy}
                  className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold text-muted hover:text-foreground border border-border hover:border-zinc-500 px-2.5 py-1 rounded transition-all cursor-pointer"
                >
                  {copied
                    ? <><Check className="h-3 w-3 text-accent" /> Copied!</>
                    : <><ClipboardCopy className="h-3 w-3" /> Copy</>}
                </button>
              </div>
              <pre className="bg-background rounded-lg p-4 overflow-x-auto text-xs font-mono text-zinc-200 border border-border leading-relaxed">
                <code>{autoFix}</code>
              </pre>
              {fixExplanation && (
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-violet-400">What changed: </span>
                  {fixExplanation}
                </p>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
