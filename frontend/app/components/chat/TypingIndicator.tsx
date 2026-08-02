import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="space-y-1.5 animate-pulse self-start items-start">
      <div className="text-[9px] font-bold text-muted uppercase tracking-widest px-1 font-mono">
        [AI_ARCHITECT]
      </div>
      <div className="rounded border border-border bg-zinc-950/20 px-3.5 py-3 text-zinc-600 font-semibold tracking-wider font-mono text-[10px]">
        typing...
      </div>
    </div>
  );
}
