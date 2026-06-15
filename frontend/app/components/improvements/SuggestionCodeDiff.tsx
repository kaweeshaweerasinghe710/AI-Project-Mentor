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
    <div className="border-t border-[#243740] bg-[#131D21]/20 font-mono text-xs">
      {/* Impact / Effort Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#18252C]/30 border-b border-[#243740]">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-zinc-550 block uppercase tracking-wider text-[9px] mb-1">
              Architectural Impact
            </span>
            <span className="text-zinc-400 leading-relaxed text-[11px] font-sans">
              {suggestion.impact}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Wrench className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-zinc-550 block uppercase tracking-wider text-[9px] mb-1">
              Refactoring Effort
            </span>
            <span className="text-zinc-400 leading-relaxed text-[11px] font-sans">
              {suggestion.effort}
            </span>
          </div>
        </div>
      </div>

      {/* Code Diff Panel */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Code Refactor Solution</span>
          </div>
          {/* Tab Switcher */}
          <div className="flex rounded bg-[#131D21]/80 p-0.5 border border-[#243740]">
            <button
              onClick={() => setCodeTab('before')}
              className={`px-3 py-1 text-[9px] uppercase font-bold rounded-sm transition duration-200 cursor-pointer select-none ${
                codeTab === 'before'
                  ? 'bg-[#18252C] text-accent font-extrabold border border-[#243740]'
                  : 'text-zinc-650 hover:text-zinc-450'
              }`}
            >
              Vulnerable Code
            </button>
            <button
              onClick={() => setCodeTab('after')}
              className={`px-3 py-1 text-[9px] uppercase font-bold rounded-sm transition duration-200 cursor-pointer select-none ${
                codeTab === 'after'
                  ? 'bg-[#18252C] text-accent font-extrabold border border-[#243740]'
                  : 'text-zinc-650 hover:text-zinc-450'
              }`}
            >
              Refactored Fix
            </button>
          </div>
        </div>

        {/* Code Area */}
        <div className="relative rounded border border-[#243740] bg-[#131D21] overflow-hidden">
          <div className="absolute top-2.5 right-2.5 text-[9px] text-zinc-600 bg-[#18252C] px-2 py-0.5 rounded border border-[#243740]">
            {codeTab === 'before' ? 'Original' : 'Optimized'}
          </div>
          <pre className="p-4 overflow-x-auto text-[10px] text-zinc-400 leading-relaxed">
            <code>{codeTab === 'before' ? suggestion.beforeCode : suggestion.afterCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
