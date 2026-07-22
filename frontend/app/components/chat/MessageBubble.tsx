'use client';
import React from 'react';
import { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

function renderFormattedText(text: string): React.ReactNode {
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (trimmed === '') {
      return <div key={lineIdx} className="h-2" />;
    }
    const isBullet = /^[•\-\*]\s/.test(trimmed);
    const content = isBullet ? trimmed.replace(/^[•\-\*]\s/, '') : trimmed;

  
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex gap-2 items-start">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
          <p className="text-sm text-zinc-200 leading-relaxed font-sans">{rendered}</p>
        </div>
      );
    }

    return (
      <p key={lineIdx} className="text-sm text-zinc-200 leading-relaxed font-sans">
        {rendered}
      </p>
    );
  });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex flex-col space-y-1.5 max-w-[82%] ${
      isUser ? 'self-end items-end' : 'self-start items-start'
    }`}>
      {/* Sender label */}
      <div className={`text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1 ${
        isUser ? 'text-right' : 'text-left'
      }`}>
        {isUser ? '[YOU]' : '[AI_ARCHITECT]'} &middot;{' '}
        <span className="text-zinc-600 font-normal">{message.timestamp}</span>
      </div>
      <div className={`rounded border px-4 py-3 ${
        isUser
          ? 'border-accent/30 bg-accent/5 text-zinc-200'
          : 'border-border bg-panel/60 text-zinc-200'
      }`}>
        {isUser ? (
          <p className="text-sm font-sans text-zinc-200 leading-relaxed">{message.text}</p>
        ) : (
    
          <div className="space-y-1.5">
            {renderFormattedText(message.text)}
          </div>
        )}

        {message.code && (
          <div className="mt-3.5 rounded border border-border bg-surface overflow-hidden text-[10px] select-text">
            <div className="bg-panel border-b border-border px-3 py-1.5 text-zinc-500 flex justify-between select-none">
              <span>SUGGESTED_FIX</span>
            </div>
            <pre className="p-3 overflow-x-auto text-zinc-400 text-left">
              <code>{message.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}