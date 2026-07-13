'use client';
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import RepoInput from './landing/RepoInput';
import PresetCard from './landing/PresetCard';

interface LandingPageProps {
  onStartAnalysis: (repoUrl: string, presetKey?: string) => void;
}

export default function LandingPage({ onStartAnalysis }: LandingPageProps) {
  const handlePresetSelect = (key: string) => {
    const preset = presets[key];
    onStartAnalysis(preset.repoUrl, key);
  };

  return (
    <div className="flex-grow flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-4xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#243740] bg-[#18252C]/60 px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-450 mb-8 select-none">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span>Senior Code Review & Static Auditing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#ECE9E4] mb-6 font-mono uppercase">
            STATIC AUDITS & ARCHITECTURE FOR <span className="text-accent underline decoration-2 underline-offset-8">REPOSITORIES</span>
          </h1>
          <p className="mx-auto max-w-xl text-xs text-zinc-500 leading-relaxed font-mono">
            Scan your codebase configurations, database parameters, and thread-safety handlers. Identify structural bugs and review fixes immediately.
          </p>
        </div>

        {/* Input Bar */}
        <RepoInput onStartAnalysis={(url) => onStartAnalysis(url)} />

        {/* Presets Cards Section */}
        <div>
          <h2 className="text-[9px] font-bold text-zinc-650 uppercase tracking-widest text-center mb-8 font-mono">
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
