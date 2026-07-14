'use client';

import React from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import { GithubIcon } from './icons';

interface HeaderProps {
  repoName?: string;
  onReset?: () => void;
  userEmail?: string | null;
  onSignOut?: () => void;
}

export default function Header({ repoName, onReset, userEmail, onSignOut }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md font-sans">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-panel text-accent group-hover:border-accent group-hover:rotate-6 transition-all duration-300">
            <Bot className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-foreground font-mono group-hover:text-accent transition duration-200">
              AI_PROJECT_MENTOR
            </span>
            <span className="text-[9px] font-bold text-muted uppercase tracking-wider leading-none mt-0.5">
              Code Architecture Reviews
            </span>
          </div>
        </div>

        {/* Central Repository Metadata */}
        {repoName && (
          <div className="hidden md:flex items-center gap-2.5 rounded-lg border border-border bg-panel/60 px-3.5 py-1.5 text-xs font-mono text-zinc-400">
            <GithubIcon className="h-3.5 w-3.5 text-muted" />
            <span className="text-muted">Repo:</span>
            <span className="text-zinc-300 font-semibold">{repoName}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-3 text-xs">
          {userEmail && (
            <span className="hidden sm:inline font-bold text-muted font-mono bg-panel border border-border px-2.5 py-1.5 rounded-lg uppercase">
              {userEmail.split('@')[0]}
            </span>
          )}
          {repoName && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-panel px-3.5 py-1.5 font-mono uppercase tracking-wider font-semibold text-zinc-400 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset Scan</span>
            </button>
          )}
          {userEmail && (
            <button
              onClick={onSignOut}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-panel px-3.5 py-1.5 font-mono uppercase tracking-wider font-semibold text-zinc-400 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
            >
              Sign Out
            </button>
          )}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg h-9 w-9 border border-border bg-panel text-zinc-400 hover:border-accent hover:text-accent hover:scale-105 transition-all duration-200"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
