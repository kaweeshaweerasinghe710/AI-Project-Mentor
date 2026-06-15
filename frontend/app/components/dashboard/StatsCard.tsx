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
    <div className="lg:col-span-2 rounded-lg border border-[#243740] bg-[#18252C]/50 p-6 flex flex-col justify-between card-hover">
      <div>
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 font-mono">Codebase Scope</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-lg border border-[#243740] bg-[#131D21]/50 p-4 font-mono hover:border-accent transition duration-200">
            <div className="flex items-center gap-1.5 text-zinc-500 mb-2">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Total Files</span>
            </div>
            <div className="text-lg font-extrabold text-[#ECE9E4]">{stats.files}</div>
          </div>
          <div className="rounded-lg border border-[#243740] bg-[#131D21]/50 p-4 font-mono hover:border-accent transition duration-200">
            <div className="flex items-center gap-1.5 text-zinc-500 mb-2">
              <Code2 className="h-3.5 w-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Lines Of Code</span>
            </div>
            <div className="text-lg font-extrabold text-[#ECE9E4]">{stats.lines.toLocaleString()}</div>
          </div>
          <div className="rounded-lg border border-[#243740] bg-[#131D21]/50 p-4 font-mono hover:border-accent transition duration-200">
            <div className="flex items-center gap-1.5 text-zinc-500 mb-2">
              <Cpu className="h-3.5 w-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Complexity</span>
            </div>
            <div className="text-lg font-extrabold text-accent">{stats.complexity}</div>
          </div>
        </div>
      </div>

      {/* Languages Progress bar */}
      <div className="font-mono">
        <div className="flex justify-between items-center text-[10px] mb-3">
          <span className="font-bold text-zinc-450 uppercase tracking-wider">Language Volume</span>
          <span className="text-zinc-550 font-bold uppercase">{dominantLanguage} dominant</span>
        </div>
        
        {/* Stacked Progress Bar (Flat) */}
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
            <div key={index} className="flex items-center gap-1.5 text-[10px]">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor: lang.color }} />
              <span className="text-zinc-400 font-bold uppercase">{lang.name}</span>
              <span className="text-zinc-650 font-bold">{lang.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
