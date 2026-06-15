'use client';

import React from 'react';
import { BookOpen, Undo2 } from 'lucide-react';

interface ReviewHeaderProps {
  progressPercent: number;
  reviewedCount: number;
  totalCount: number;
  onResetProgress: () => void;
}

export default function ReviewHeader({
  progressPercent,
  reviewedCount,
  totalCount,
  onResetProgress
}: ReviewHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#243740] pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-accent animate-pulse" />
          <h3 className="text-xs font-bold text-[#ECE9E4] uppercase tracking-wider">
            Codebase Audit & Peer Review
          </h3>
        </div>
        <p className="text-[10px] text-zinc-500 font-sans leading-normal">
          Analyze the following architectural, security, and concurrency review checkpoints derived from your repository.
        </p>
      </div>

      {/* Progress Card */}
      <div className="flex items-center gap-4 bg-[#18252C]/40 border border-[#243740] rounded px-4 py-2.5 min-w-[240px]">
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-500 font-bold">AUDIT PROGRESS</span>
            <span className="text-accent font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#131D21] h-1.5 rounded-full overflow-hidden border border-[#243740]">
            <div
              className="bg-accent h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[9px] text-zinc-650 flex justify-between">
            <span>{reviewedCount} OF {totalCount} REVIEWED</span>
            {reviewedCount > 0 && (
              <button
                onClick={onResetProgress}
                className="hover:text-accent flex items-center gap-1 transition cursor-pointer"
              >
                <Undo2 className="h-2.5 w-2.5" />
                <span>RESET PROGRESS</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
