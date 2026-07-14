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
    <div className="rounded-lg border border-border bg-panel/65 p-5 flex flex-col justify-between hover:border-accent hover:bg-[#1C2C33] hover:-translate-y-1 transition-all duration-300 group font-sans">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-border bg-surface/30 text-zinc-400 group-hover:text-accent transition duration-200">
            <Icon className="h-4.5 w-4.5" />
          </div>
          <span className={`text-base font-mono font-extrabold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
          {title}
        </h4>
        <p className="mt-2 text-xs text-muted leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-6 pt-3 border-t border-border/60 flex justify-between items-center text-xs uppercase tracking-wider">
        <span className="text-zinc-550 font-bold">{limitText}</span>
        <span className={`font-bold ${isStatusPositive ? 'text-[#859F3D]' : 'text-accent'}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
}
