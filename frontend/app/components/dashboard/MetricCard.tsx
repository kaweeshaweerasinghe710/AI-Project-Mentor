'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  score: number;
  description: string;
  limitText: string;
  statusText: string;
  isStatusPositive?: boolean;
  icon: LucideIcon;
}

export default function MetricCard({
  title,
  score,
  description,
  limitText,
  statusText,
  isStatusPositive = false,
  icon: Icon
}: MetricCardProps) {
  const getScoreColor = (val: number) => {
    if (val >= 85) return 'text-[#859F3D]'; // Muted Green
    if (val >= 70) return 'text-accent'; // Sandstone Gold
    if (val >= 60) return 'text-amber-500';
    return 'text-rose-450';
  };

  return (
    <div className="rounded-lg border border-[#243740] bg-[#18252C]/65 p-5 flex flex-col justify-between hover:border-accent hover:bg-[#1C2C33] hover:-translate-y-1 transition-all duration-300 group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-[#243740] bg-[#131D21]/30 text-zinc-400 group-hover:text-accent transition duration-200">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <span className={`text-sm font-mono font-extrabold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        <h4 className="text-xs font-bold text-[#ECE9E4] uppercase tracking-wider font-mono">
          {title}
        </h4>
        <p className="mt-2 text-[10px] text-zinc-550 leading-relaxed font-mono">
          {description}
        </p>
      </div>
      <div className="mt-6 pt-3 border-t border-[#243740]/60 flex justify-between items-center font-mono text-[9px] uppercase tracking-wider">
        <span className="text-zinc-650 font-bold">{limitText}</span>
        <span className={`font-bold ${isStatusPositive ? 'text-[#859F3D]' : 'text-accent'}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
}
