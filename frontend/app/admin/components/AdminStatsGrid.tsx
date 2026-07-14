'use client';

import React from 'react';
import { Users, Calendar, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  totalUsers: number;
  activeDays: number;
  dailyAverage: string;
}

export default function AdminStatsGrid({ totalUsers, activeDays, dailyAverage }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      {/* Total Users Card */}
      <div className="rounded-lg border border-border bg-panel/40 p-5 flex items-center justify-between card-hover">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-muted uppercase tracking-widest font-mono">Total Users</span>
          <div className="text-xl font-extrabold text-foreground font-mono">{totalUsers}</div>
        </div>
        <Users className="h-8 w-8 text-accent opacity-60" />
      </div>

      {/* Active Days Card */}
      <div className="rounded-lg border border-border bg-panel/40 p-5 flex items-center justify-between card-hover">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-muted uppercase tracking-widest font-mono">Active Days</span>
          <div className="text-xl font-extrabold text-foreground font-mono">{activeDays}</div>
        </div>
        <Calendar className="h-8 w-8 text-accent opacity-60" />
      </div>

      {/* Daily Average Card */}
      <div className="rounded-lg border border-border bg-panel/40 p-5 flex items-center justify-between card-hover">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-muted uppercase tracking-widest font-mono">Daily Average</span>
          <div className="text-xl font-extrabold text-accent font-mono">{dailyAverage}</div>
        </div>
        <TrendingUp className="h-8 w-8 text-accent opacity-60" />
      </div>
    </div>
  );
}