'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  isTyping: boolean;
}

export default function ChatInput({ onSubmit, isTyping }: ChatInputProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    onSubmit(inputText);
    setInputText('');
  };

  return (
    <div className="p-4 bg-zinc-950 border-t border-border shrink-0 font-sans">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 items-center bg-surface/30 border border-border rounded p-1.5 pl-3 focus-within:border-accent transition"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isTyping}
          placeholder="Ask AI Architect... (e.g., Explain Postgres connection pool issues)"
          className="flex-1 bg-transparent border-0 text-foreground placeholder-zinc-700 focus:outline-none focus:ring-0 text-xs py-1"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="flex h-7 w-7 items-center justify-center rounded bg-accent hover:bg-accent/90 text-background transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0 hover:scale-105"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
