'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PresetCardProps {
  presetKey: string;
  repoName: string;
  language: string;
  description: string;
  onSelect: (key: string) => void;
}

export default function PresetCard({
  presetKey,
  repoName,
  language,
  description,
  onSelect
}: PresetCardProps) {
  const isTypeScript = language.toLowerCase() === 'typescript';

  return (
    <div
      onClick={() => onSelect(presetKey)}
      className="group relative cursor-pointer rounded-lg border border-border bg-panel/65 p-6 hover:border-accent hover:bg-[#1C2C33] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between font-sans"
    >
      <div>
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide font-mono ${
            isTypeScript
              ? 'text-accent bg-accent-muted border-accent/15'
              : 'text-muted bg-panel border-border'
          }`}
        >
          {language}
        </span>
        <h3 className="mt-4 text-xs font-extrabold text-foreground group-hover:text-accent transition duration-200">
          {repoName}
        </h3>
        <p className="mt-2 text-xs text-muted leading-relaxed">
          {description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted group-hover:text-foreground transition">
        <span>Start Review</span>
        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition duration-200" />
      </div>
    </div>
  );
}
