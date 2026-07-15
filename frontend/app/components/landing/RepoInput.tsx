'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon } from '../icons';

interface RepoInputProps {
  onStartAnalysis: (repoUrl: string) => void;
}

export default function RepoInput({ onStartAnalysis }: RepoInputProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = repoUrl.trim();
    if (!trimmed) {
      setError('Please provide a valid GitHub repository link.');
      return;
    }

    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+(\/)?$/;
    if (!githubRegex.test(trimmed)) {
      setError('Invalid URL format. Please input a valid Github URL (e.g. https://github.com/user/repo).');
      return;
    }

    onStartAnalysis(trimmed);
  };

  return (
    <div className="max-w-2xl mx-auto mb-16 font-sans">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center rounded-lg border border-border bg-panel/40 p-1.5 focus-within:border-accent transition duration-300">
          <div className="flex pl-3 text-muted">
            <GithubIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Repository link... e.g., https://github.com/vibe-labs/go-websocket-chat"
            className="w-full bg-transparent border-0 text-foreground placeholder-zinc-700 focus:outline-none focus:ring-0 text-xs px-3.5 py-2.5 font-mono"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-background text-xs uppercase tracking-wider font-extrabold px-5 py-3 rounded-md transition-all duration-200 cursor-pointer shrink-0 hover:scale-102"
          >
            <span>Audit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-3 text-[10px] text-accent text-center bg-accent-muted border border-accent/15 rounded-lg py-2 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
