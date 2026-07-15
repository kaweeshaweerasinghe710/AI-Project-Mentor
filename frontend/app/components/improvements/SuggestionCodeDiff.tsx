'use client';

import React, { useState } from 'react';
import { ImprovementSuggestion } from '../../types';
import { AlertTriangle, Wrench, Sparkles } from 'lucide-react';

interface SuggestionCodeDiffProps {
  suggestion: ImprovementSuggestion;
}

export default function SuggestionCodeDiff({ suggestion }: SuggestionCodeDiffProps) {
  const [codeTab, setCodeTab] = useState<'before' | 'after'>('before');

  return (
    <div className="border-t border-border bg-surface/20 font-sans text-xs">
      {/* Impact / Effort Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-panel/30 border-b border-border">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-muted block uppercase tracking-wider text-[9px] mb-1 font-mono">
              Architectural Impact
            </span>
            <span className="text-zinc-300 leading-relaxed text-xs">
              {suggestion.impact}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Wrench className="h-4 w-4 text-muted shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-muted block uppercase tracking-wider text-[9px] mb-1 font-mono">
              Refactoring Effort
            </span>
            <span className="text-zinc-300 leading-relaxed text-xs">
              {suggestion.effort}
            </span>
          </div>
        </div>
      </div>

      {/* Code Diff Panel */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-wider font-mono">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Code Refactor Solution</span>
          </div>
          {/* Tab Switcher */}
          <div className="flex rounded bg-surface/80 p-0.5 border border-border">
            <button
              onClick={() => setCodeTab('before')}
              className={`px-3 py-1 text-[9px] uppercase font-bold rounded-sm transition duration-200 cursor-pointer select-none font-mono ${
                codeTab === 'before'
                  ? 'bg-panel text-accent font-extrabold border border-border'
                  : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              Vulnerable Code
            </button>
            <button
              onClick={() => setCodeTab('after')}
              className={`px-3 py-1 text-[9px] uppercase font-bold rounded-sm transition duration-200 cursor-pointer select-none font-mono ${
                codeTab === 'after'
                  ? 'bg-panel text-accent font-extrabold border border-border'
                  : 'text-zinc-500 hover:text-zinc-400'
              }`}
            >
              Refactored Fix
            </button>
          </div>
        </div>

        {/* Code Area */}
        <div className="relative rounded border border-border bg-surface overflow-hidden">
          <div className="absolute top-2.5 right-2.5 text-[9px] text-zinc-650 bg-panel px-2 py-0.5 rounded border border-border font-mono">
            {codeTab === 'before' ? 'Original' : 'Optimized'}
          </div>
          <pre className="p-4 overflow-x-auto text-[10px] text-zinc-400 leading-relaxed font-mono">
            <code>{codeTab === 'before' ? suggestion.beforeCode : suggestion.afterCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
