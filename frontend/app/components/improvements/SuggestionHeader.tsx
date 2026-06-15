'use client';

import React from 'react';
import { ImprovementSuggestion } from '../../types';
import { ShieldAlert, Code2, Server, Cpu, Eye, EyeOff } from 'lucide-react';

const getSeverityBadgeColor = (severity: 'low' | 'medium' | 'high') => {
  if (severity === 'high') return 'text-accent border-accent/20 bg-accent/5';
  if (severity === 'medium') return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
  return 'text-zinc-500 border-[#243740] bg-[#18252C]/40';
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  security: ShieldAlert,
  structure: Code2,
  loadBalance: Server,
  performance: Cpu
};

interface SuggestionHeaderProps {
  suggestion: ImprovementSuggestion;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function SuggestionHeader({
  suggestion,
  isExpanded,
  onToggleExpand
}: SuggestionHeaderProps) {
  const CatIcon = CATEGORY_ICONS[suggestion.category] || Cpu;

  return (
    <div className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/15 font-bold">
            <CatIcon className="h-3 w-3" />
            {suggestion.category}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded border font-bold ${getSeverityBadgeColor(suggestion.severity)}`}>
            {suggestion.severity} severity
          </span>
          <span className="text-zinc-500 bg-[#131D21]/60 px-2 py-0.5 rounded border border-[#243740]">
            {suggestion.filePath}
          </span>
        </div>
        <h3 className="text-sm font-extrabold text-[#ECE9E4] uppercase tracking-wide font-mono">
          {suggestion.title}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed max-w-3xl font-mono">
          {suggestion.description}
        </p>
      </div>

      <button
        onClick={onToggleExpand}
        className="md:self-start flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-wider px-3.5 py-2 border border-[#243740] bg-[#131D21]/30 rounded hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer select-none"
      >
        {isExpanded ? (
          <>
            <EyeOff className="h-3 w-3" />
            <span>Hide Fix</span>
          </>
        ) : (
          <>
            <Eye className="h-3 w-3" />
            <span>Show Fix</span>
          </>
        )}
      </button>
    </div>
  );
}
