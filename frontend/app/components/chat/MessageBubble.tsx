'use client';

import React from 'react';
import { ChatMessage } from '../../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className="space-y-1.5 max-w-[90%]">
      {/* Monospaced text label indicator */}
      <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1">
        {isUser ? '[YOU]' : '[AI_ARCHITECT]'} &middot;{' '}
        <span className="text-zinc-650 font-normal">{message.timestamp}</span>
      </div>

      {/* Message content */}
      <div className="rounded border border-[#243740] bg-[#18252C]/65 p-3.5 text-zinc-350 leading-relaxed">
        <p className="font-sans text-[11px] leading-relaxed">{message.text}</p>

        {message.code && (
          <div className="mt-3.5 rounded border border-[#243740] bg-[#131D21] overflow-hidden text-[10px] select-text">
            <div className="bg-[#18252C] border-b border-[#243740] px-3 py-1.5 text-zinc-500 flex justify-between select-none">
              <span>SUGGESTED_FIX</span>
            </div>
            <pre className="p-3 overflow-x-auto text-zinc-400">
              <code>{message.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
