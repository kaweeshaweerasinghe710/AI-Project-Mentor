'use client';
import React from 'react';
import { ChatMessage } from '../../types';
interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex flex-col space-y-1.5 max-w-[80%] ${
      isUser ? 'self-end items-end' : 'self-start items-start'
    }`}>
      <div className={`text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1 ${
        isUser ? 'text-right' : 'text-left'
      }`}>
        {isUser ? '[YOU]' : '[AI_ARCHITECT]'} &middot;{' '}
        <span className="text-zinc-650 font-normal">{message.timestamp}</span>
      </div>
      <div className={`rounded border p-3.5 leading-relaxed ${
        isUser 
          ? 'border-accent/30 bg-accent/5 text-zinc-350' 
          : 'border-[#243740] bg-[#18252C]/65 text-zinc-350' 
      }`}>
        <p className="font-sans text-[11px] leading-relaxed text-left">{message.text}</p>
        {message.code && (
          <div className="mt-3.5 rounded border border-[#243740] bg-[#131D21] overflow-hidden text-[10px] select-text">
            <div className="bg-[#18252C] border-b border-[#243740] px-3 py-1.5 text-zinc-500 flex justify-between select-none">
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