'use client';
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import RepoInput from './landing/RepoInput';
import PresetCard from './landing/PresetCard';

// 1. Definition of presets to handle template scans
const presets: Record<string, { repoUrl: string }> = {
  'nextjs-storefront-backend': {
    repoUrl: 'https://github.com/vibe-labs/nextjs-storefront-backend'
  },
  'secure-django-auth': {
    repoUrl: 'https://github.com/vibe-labs/secure-django-auth'
  },
  'go-websocket-chat': {
    repoUrl: 'https://github.com/vibe-labs/go-websocket-chat'
  }
};

interface LandingPageProps {
  onStartAnalysis: (repoUrl: string, presetKey?: string) => void;
}

export default function LandingPage({ onStartAnalysis }: LandingPageProps) {
  const handlePresetSelect = (key: string) => {
    const preset = presets[key];
    if (preset) {
      onStartAnalysis(preset.repoUrl, key);
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background font-sans">
      <div className="mx-auto w-full max-w-4xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-panel/60 px-3.5 py-1.5 text-xs uppercase tracking-wider text-muted mb-8 select-none">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span>Senior Code Review & Static Auditing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-6 uppercase">
            STATIC AUDITS & ARCHITECTURE FOR <span className="text-accent underline decoration-2 underline-offset-8">REPOSITORIES</span>
          </h1>
          <p className="mx-auto max-w-xl text-xs text-muted leading-relaxed">
            Scan your codebase configurations, database parameters, and thread-safety handlers. Identify structural bugs and review fixes immediately.
          </p>
        </div>

        {/* Input Bar */}
        <RepoInput onStartAnalysis={(url) => onStartAnalysis(url)} />

        {/* Presets Cards Section */}
        <div>
          <h2 className="text-xs font-bold text-muted uppercase tracking-widest text-center mb-8">
            Or select a template codebase to scan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PresetCard
              presetKey="nextjs-storefront-backend"
              repoName="nextjs-storefront-backend"
              language="TypeScript"
              description="Checkout routes, PostgreSQL pool configs, and JWT tokens. Contains security holes and unscaled pools."
              onSelect={handlePresetSelect}
            />
            <PresetCard
              presetKey="secure-django-auth"
              repoName="secure-django-auth"
              language="Python"
              description="Django authentication setup. Audits stacktrace debug settings and missing HttpOnly cookie security variables."
              onSelect={handlePresetSelect}
            />
            <PresetCard
              presetKey="go-websocket-chat"
              repoName="go-websocket-chat"
              language="Go Lang"
              description="WebSocket server concurrency. Highlights race conditions on maps and clustering horizontal scalability limits."
              onSelect={handlePresetSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
