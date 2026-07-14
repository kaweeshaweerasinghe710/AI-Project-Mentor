'use client';

import React from 'react';
import { FileText, Code2, Cpu } from 'lucide-react';
import { LanguageStat } from '../../types';

interface StatsCardProps {
  stats: {
    files: number;
    lines: number;
    languages: LanguageStat[];
    complexity: 'Low' | 'Medium' | 'High' | 'Extreme';
  };
}

export default function StatsCard({ stats }: StatsCardProps) {
  const dominantLanguage = stats.languages[0]?.name || 'None';

  return (
    <div className="lg:col-span-2 rounded-lg border border-border bg-panel/50 p-6 flex flex-col justify-between card-hover font-sans">
      <div>
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-6">Codebase Scope</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-8 text-xs">
          {/* Total Files */}
          <div className="rounded-lg border border-border bg-surface/50 p-4 hover:border-accent transition duration-200">
            <div className="flex items-center gap-1.5 text-muted mb-2">
              <FileText className="h-3.5 w-3.5" />
              <span className="font-bold uppercase tracking-wider">Total Files</span>
            </div>
            <div className="text-lg font-extrabold text-foreground font-mono">{stats.files}</div>
          </div>

          {/* Lines of Code */}
          <div className="rounded-lg border border-border bg-surface/50 p-4 hover:border-accent transition duration-200">
            <div className="flex items-center gap-1.5 text-muted mb-2">
              <Code2 className="h-3.5 w-3.5" />
              <span className="font-bold uppercase tracking-wider">Lines Of Code</span>
            </div>
            <div className="text-lg font-extrabold text-foreground font-mono">{stats.lines.toLocaleString()}</div>
          </div>

          {/* Complexity */}
          <div className="rounded-lg border border-border bg-surface/50 p-4 hover:border-accent transition duration-200">
            <div className="flex items-center gap-1.5 text-muted mb-2">
              <Cpu className="h-3.5 w-3.5" />
              <span className="font-bold uppercase tracking-wider">Complexity</span>
            </div>
            <div className="text-lg font-extrabold text-accent font-mono">{stats.complexity}</div>
          </div>
        </div>
      </div>

      {/* Languages Progress bar */}
      <div className="text-xs">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-zinc-400 uppercase tracking-wider">Language Volume</span>
          <span className="text-muted font-bold uppercase">{dominantLanguage} dominant</span>
        </div>
        
        <div className="w-full h-1.5 rounded bg-zinc-900 overflow-hidden flex mb-4">
          {stats.languages.map((lang, index) => (
            <div
              key={index}
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Languages Legend */}
        <div className="flex flex-wrap gap-x-5 gap-y-2.5">
          {stats.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: lang.color }} />
              <span className="text-zinc-400 font-bold uppercase">{lang.name}</span>
              <span className="text-muted font-bold font-mono">{lang.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
