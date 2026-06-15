'use client';

import React from 'react';

export default function ChatHeader() {
  return (
    <div className="border-b border-[#243740] bg-zinc-950 px-5 py-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="h-1.5 w-1.5 rounded-full bg-[#859F3D] shrink-0 animate-pulse" />
        <div>
          <h3 className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
            AI_SENIOR_ARCHITECT
          </h3>
        </div>
      </div>
      <div className="text-[9px] text-zinc-550 bg-[#18252C] px-2 py-0.5 border border-[#243740] rounded select-none">
        STATUS: ACTIVE_REVIEW
      </div>
    </div>
  );
}
