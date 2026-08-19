'use client';
import React from 'react';
import { ImprovementSuggestion } from '../../types';
import { Cpu, ChevronDown, ChevronUp } from 'lucide-react';
import { getSeverityBadgeColor, CATEGORY_ICONS, parseSections } from './suggestionUtils';
import FixButtons from './FixButtons';
import AutoFixPanel from './AutoFixPanel';

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
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
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
          <FixButtons
            showProblem={showProblem}
            showFix={showFix}
            autoFix={autoFix}
            fixLoading={fixLoading}
            onToggleProblem={onToggleProblem}
            onToggleFix={onToggleFix}
            onAutoFix={onAutoFix}
          />
          <div className="space-y-4 mt-4">
            {showProblem && sections['problem'] && (
              <div className="animate-slide-up">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-1.5 flex items-center gap-1.5">
                  <span className="text-rose-400">🐛</span> Problem
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">{sections['problem']}</p>
              </div>
            )}
            {showFix && sections['fix'] && (
              <div className="animate-slide-up">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-1.5 flex items-center gap-1.5">
                  <span className="text-accent">🔧</span> Fix
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">{sections['fix']}</p>
              </div>
            )}
            {autoFix && (
              <div className="animate-slide-up">
                <AutoFixPanel
                  autoFix={autoFix}
                  fixExplanation={fixExplanation}
                  copied={copied}
                  onCopy={onCopy}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
