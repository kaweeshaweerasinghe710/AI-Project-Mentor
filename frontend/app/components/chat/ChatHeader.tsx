'use client';

import React from 'react';

export default function ChatHeader() {
  return (
    <div className="border-b border-border bg-zinc-950 px-5 py-4 flex items-center justify-between shrink-0 font-sans">
      <div className="flex items-center gap-2.5">
        <div className="h-1.5 w-1.5 rounded-full bg-[#859F3D] shrink-0 animate-pulse" />
        <div>
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
            AI_SENIOR_ARCHITECT
          </h3>
        </div>
      </div>
      <div className="text-[9px] text-muted bg-panel px-2 py-0.5 border border-border rounded select-none font-mono">
        STATUS: ACTIVE_REVIEW
      </div>
    </div>
  );
}
