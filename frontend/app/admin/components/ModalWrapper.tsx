'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalWrapperProps {
  onClose: () => void;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function ModalWrapper({ onClose, icon, title, children }: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in font-sans">
      <div className="relative max-w-sm w-full rounded-lg border border-border bg-panel p-6 shadow-2xl space-y-6">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-muted hover:text-accent transition duration-150 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 border-b border-border/65 pb-3">
          {icon}
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            {title}
          </h3>
        </div>

        {children}
      </div>
    </div>
  );
}
