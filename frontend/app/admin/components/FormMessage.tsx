'use client';

import React from 'react';

interface FormMessageProps {
  message: { type: 'success' | 'error'; text: string } | null;
}

export default function FormMessage({ message }: FormMessageProps) {
  if (!message) return null;

  return (
    <div className={`p-2.5 rounded text-center font-bold tracking-wide border font-mono text-[10px] ${
      message.type === 'success' 
        ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' 
        : 'bg-red-950/20 border-red-900/30 text-accent'
    }`}>
      {message.text}
    </div>
  );
}
