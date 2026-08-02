import React from 'react';
import { getQuickPrompts } from '../../services/chat';

interface QuickPromptsProps {
  repoName: string;
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function QuickPrompts({ repoName, onSend, disabled }: QuickPromptsProps) {
  return (
    <div className="px-5 pb-3.5 pt-2.5 shrink-0 flex flex-wrap gap-2 bg-panel border-t border-border/40">
      {getQuickPrompts(repoName).map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onSend(prompt)}
          disabled={disabled}
          className="text-[9px] font-bold text-muted hover:text-accent bg-panel hover:bg-[#1C2C32] border border-border hover:border-accent px-2.5 py-1 rounded transition duration-200 cursor-pointer select-none uppercase tracking-wider font-mono"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
