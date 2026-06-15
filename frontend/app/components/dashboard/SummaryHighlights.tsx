'use client';

import React from 'react';
import { AnalysisResult } from '../../types';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface SummaryHighlightsProps {
  result: AnalysisResult;
  onNavigateToTab: (tab: string) => void;
}

export default function SummaryHighlights({ result, onNavigateToTab }: SummaryHighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Structural Success Panel */}
      <div className="rounded-lg border border-[#243740] bg-[#18252C]/50 p-6 font-mono card-hover">
        <div className="flex items-center gap-2 border-b border-[#243740]/65 pb-3 mb-4">
          <CheckCircle className="h-4 w-4 text-[#859F3D]" />
          <h3 className="text-xs font-bold text-[#ECE9E4] uppercase tracking-wider">
            Structural Success
          </h3>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start gap-2 text-[11px] text-zinc-550 leading-relaxed">
            <span className="text-[#859F3D] font-bold shrink-0">&gt;</span>
            <span>Workspace packages are correctly declared and compiled with strict parameters.</span>
          </li>
          <li className="flex items-start gap-2 text-[11px] text-zinc-550 leading-relaxed">
            <span className="text-[#859F3D] font-bold shrink-0">&gt;</span>
            <span>Root directories respect clear separation of logic boundaries and configs.</span>
          </li>
        </ul>
      </div>

      {/* Identified Warnings Panel */}
      <div className="rounded-lg border border-[#243740] bg-[#18252C]/50 p-6 flex flex-col justify-between font-mono card-hover">
        <div>
          <div className="flex items-center gap-2 border-b border-[#243740]/65 pb-3 mb-4">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <h3 className="text-xs font-bold text-[#ECE9E4] uppercase tracking-wider">
              Identified Warnings
            </h3>
          </div>
          <ul className="space-y-3">
            {result.suggestions.slice(0, 2).map((sugg, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-550 leading-relaxed">
                <span className="text-accent font-bold shrink-0">&gt;</span>
                <div>
                  <span className="text-zinc-400 font-semibold">{sugg.title}</span>
                  <span className="text-zinc-655 block text-[9px] mt-0.5">{sugg.filePath}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => onNavigateToTab('suggestions')}
          className="mt-6 w-full text-center py-2 bg-[#18252C] border border-[#243740] hover:border-accent hover:text-accent text-[10px] text-zinc-400 font-bold rounded transition duration-200 cursor-pointer uppercase tracking-wider"
        >
          Review all {result.suggestions.length} suggestions
        </button>
      </div>
    </div>
  );
}
