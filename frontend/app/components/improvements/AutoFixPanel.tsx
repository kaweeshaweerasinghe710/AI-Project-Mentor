import React from 'react';
import { Sparkles, ClipboardCopy, Check } from 'lucide-react';

interface AutoFixPanelProps {
  autoFix: string;
  fixExplanation: string;
  copied: boolean;
  onCopy: () => void;
}

export default function AutoFixPanel({ autoFix, fixExplanation, copied, onCopy }: AutoFixPanelProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> AI Generated Fix
        </p>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold text-muted hover:text-foreground border border-border hover:border-zinc-500 px-2.5 py-1 rounded transition-all cursor-pointer"
        >
          {copied
            ? <><Check className="h-3 w-3 text-accent" /> Copied!</>
            : <><ClipboardCopy className="h-3 w-3" /> Copy</>}
        </button>
      </div>
      <pre className="bg-background rounded-lg p-4 overflow-x-auto text-xs font-mono text-zinc-200 border border-border leading-relaxed">
        <code>{autoFix}</code>
      </pre>
      {fixExplanation && (
        <p className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-semibold text-violet-400">What changed: </span>
          {fixExplanation}
        </p>
      )}
    </div>
  );
}
