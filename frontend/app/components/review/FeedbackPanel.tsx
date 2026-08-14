import React from 'react';

const FEEDBACK_STYLES: Record<string, { color: string; border: string; bg: string; label: string }> = {
  '🟢': { color: 'text-emerald-400', border: 'border-emerald-400/25', bg: 'bg-emerald-400/8',  label: 'What you got right' },
  '⚠️': { color: 'text-amber-400',  border: 'border-amber-400/25',  bg: 'bg-amber-400/8',   label: 'What you missed' },
  '💡': { color: 'text-blue-400',   border: 'border-blue-400/25',   bg: 'bg-blue-400/8',    label: 'Key takeaway' },
};

function FeedbackLine({ line }: { line: string }) {
  const matched = Object.entries(FEEDBACK_STYLES).find(([emoji]) => line.startsWith(emoji));

  if (matched) {
    const [emoji, style] = matched;
    const colonIdx = line.indexOf(':');
    const rest = colonIdx !== -1 ? line.substring(colonIdx + 1).trim() : line.replace(emoji, '').trim();
    if (emoji === '🟢') {
        <div className={`border-l-2 pl-4 py-1 ${style.border}`}>
          <div className={`flex items-center gap-2 mb-2 text-[11px] font-mono font-bold uppercase tracking-wider ${style.color}`}>
            <span className="text-lg leading-none">{emoji}</span>
            <span>{style.label}</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed">{rest}</p>
        </div>
    }
    return (
      <div className="text-sm text-zinc-200 leading-relaxed">
        <div className={`flex items-center gap-2 mb-1 text-[11px] font-mono font-bold uppercase tracking-wider ${style.color}`}>
          <span className="text-lg leading-none">{emoji}</span>
          <span>{style.label}</span>
        </div>
        <p className="mb-2">{rest}</p>
      </div>
    );
  }
  const colonIdx = line.indexOf(':');
  if (colonIdx === -1) return <p className="text-sm text-zinc-200 leading-relaxed">{line}</p>;
  return (
    <p className="text-sm text-zinc-200 leading-relaxed">
      <span className="font-bold text-foreground">{line.substring(0, colonIdx + 1)}</span>
      {line.substring(colonIdx + 1)}
    </p>
  );
}

interface FeedbackPanelProps {
  feedback: string;
}

export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  return (
    <div className="border-t border-accent/20 pt-6 mt-6 space-y-3 animate-slide-up">
      <div className="flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-widest text-accent mb-10">
        <span>Senior Architect Feedback on Your Answer</span>
      </div>
      <div className="space-y-3">
        {feedback
          .split('\n')
          .filter(l => l.trim())
          .map((line, idx) => (
            <FeedbackLine key={idx} line={line.trim()} />
          ))}
      </div>
    </div>
  );
}
