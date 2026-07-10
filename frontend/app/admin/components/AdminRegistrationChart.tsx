'use client';

import React from 'react';

interface RegistrationStat {
  date: string;
  count: number;
}

interface ChartProps {
  stats: RegistrationStat[];
}

export default function AdminRegistrationChart({ stats }: ChartProps) {
  const maxCount = Math.max(...stats.map((s) => s.count), 1);

  return (
    <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 p-6 space-y-6">
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
        Registration Growth Chart (Daily)
      </h3>

      {stats.length === 0 ? (
        <div className="h-64 border border-dashed border-[#243740] rounded flex items-center justify-center text-zinc-650">
          // No user data available in system database.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Custom SVG Bar Graph */}
          <div className="h-64 flex items-end gap-2 md:gap-4 pt-6 border-b border-[#243740] pb-2 overflow-x-auto scrollbar-thin">
            {stats.map((day, idx) => {
              const percentHeight = (day.count / maxCount) * 80; // 80% maximum height
              return (
                <div key={idx} className="w-12 h-full shrink-0 flex flex-col justify-end items-center gap-2 group relative">
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-[#131D21] border border-accent text-accent px-2 py-0.5 rounded text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-10">
                    {day.count} Users
                  </div>

                  {/* Count above the bar */}
                  <span className="text-[9px] font-bold text-zinc-500 group-hover:text-accent transition duration-150">
                    {day.count}
                  </span>

                  {/* Visual Bar */}
                  <div 
                    style={{ height: `${percentHeight}%` }}
                    className="w-full bg-accent/20 hover:bg-accent/40 border-t-2 border-accent rounded-t transition-all duration-500"
                  />
                </div>
              );
            })}
          </div>

          {/* Dates underneath the bars */}
          <div className="flex justify-between text-[8px] font-bold text-zinc-550 px-1 overflow-x-auto scrollbar-none">
            {stats.map((day, idx) => (
              <div key={idx} className="min-w-[32px] text-center">
                {day.date.split('-').slice(1).join('/')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}