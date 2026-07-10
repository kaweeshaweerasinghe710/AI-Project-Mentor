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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Users Card */}
      <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 p-5 flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Total Users</span>
          <div className="text-xl font-extrabold text-[#ECE9E4]">{totalUsers}</div>
        </div>
        <Users className="h-8 w-8 text-accent opacity-60" />
      </div>

      {/* Active Days Card */}
      <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 p-5 flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Active Days</span>
          <div className="text-xl font-extrabold text-[#ECE9E4]">{activeDays}</div>
        </div>
        <Calendar className="h-8 w-8 text-accent opacity-60" />
      </div>

      {/* Daily Average Card */}
      <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 p-5 flex items-center justify-between">
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Daily Average</span>
          <div className="text-xl font-extrabold text-accent">{dailyAverage}</div>
        </div>
        <TrendingUp className="h-8 w-8 text-accent opacity-60" />
      </div>
    </div>
  );
}