'use client';

import React from 'react';
import { ScoreCategory } from '../../types';
import { ShieldCheck, Cpu, Code2, Server } from 'lucide-react';

interface ComparisonChartProps {
  scores: ScoreCategory;
}

export default function ComparisonChart({ scores }: ComparisonChartProps) {
  const chartItems = [
    { label: 'Structure Layout', value: scores.structure, icon: Code2 },
    { label: 'Security Parameters', value: scores.security, icon: ShieldCheck },
    { label: 'Clustering & Pools', value: scores.loadBalance, icon: Server },
    { label: 'Performance & Locks', value: scores.performance, icon: Cpu }
  ];

  return (
    <div className="rounded-lg border border-[#243740] bg-[#18252C]/50 p-6 card-hover">
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 font-mono">
        Comparison Analysis
      </h3>
      <div className="space-y-4">
        {chartItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="space-y-1.5 font-mono">
              <div className="flex justify-between items-center text-[10px] font-semibold">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Icon className="h-4 w-4 text-zinc-650" />
                  <span>{item.label}</span>
                </div>
                <span className="text-zinc-350">{item.value}%</span>
              </div>
              <div className="w-full bg-[#131D21] h-1.5 rounded overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-1000 ease-out"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
