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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 font-sans">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-accent animate-pulse" />
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Codebase Audit & Peer Review
          </h3>
        </div>
        <p className="text-xs text-muted leading-normal">
          Analyze the following architectural, security, and concurrency review checkpoints derived from your repository.
        </p>
      </div>

      {/* Progress Card */}
      <div className="flex items-center gap-4 bg-panel/40 border border-border rounded px-4 py-2.5 min-w-[240px]">
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted font-bold">AUDIT PROGRESS</span>
            <span className="text-accent font-extrabold font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full bg-surface h-1.5 rounded-full overflow-hidden border border-border">
            <div
              className="bg-accent h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-500 flex justify-between">
            <span className="font-mono">{reviewedCount} OF {totalCount} REVIEWED</span>
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
