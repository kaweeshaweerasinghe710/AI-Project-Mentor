'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LearningStep, Badge } from '../types';
import {
  CheckCircle2, ExternalLink, ShieldAlert, Cpu, Server, Code2,
  Trophy, Loader2, ChevronRight, Sparkles,
} from 'lucide-react';

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; glow: string; gradient: string }> = {
  security:    { icon: ShieldAlert, color: 'text-rose-400',   glow: 'shadow-[0_0_20px_rgba(251,113,133,0.3)]',  gradient: 'from-rose-500/20 to-transparent' },
  performance: { icon: Cpu,         color: 'text-amber-400',  glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',   gradient: 'from-amber-500/20 to-transparent' },
  structure:   { icon: Code2,       color: 'text-blue-400',   glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',   gradient: 'from-blue-500/20 to-transparent' },
  loadBalance: { icon: Server,      color: 'text-violet-400', glow: 'shadow-[0_0_20px_rgba(167,139,250,0.3)]',  gradient: 'from-violet-500/20 to-transparent' },
};

export default function LearningPath() {
  const [steps, setSteps]               = useState<LearningStep[]>([]);
  const [badges, setBadges]             = useState<Badge[]>([]);
  const [loading, setLoading]           = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx]   = useState<number | null>(null);
  const [newBadgeToast, setNewBadgeToast] = useState<{ badge: Badge; visible: boolean } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchLearningPath = useCallback(async () => {
    try {
      const token = localStorage.getItem('user_token');
      const res   = await fetch('http://localhost:5000/api/learning', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setSteps(data.steps || []);
      setBadges(data.badges || []);
    } catch (err) {
      console.error('Failed to load learning path:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLearningPath(); }, [fetchLearningPath]);

  const handleComplete = async (stepId: string) => {
    setCompletingId(stepId);
    try {
      const token = localStorage.getItem('user_token');
      const res   = await fetch(`http://localhost:5000/api/learning/step/${stepId}/complete`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to complete step');
      const data = await res.json();
      setSteps(prev => prev.map(s => (s.id === stepId ? { ...s, isCompleted: true } : s)));
      if (data.newBadges?.length > 0) {
        setBadges(prev => [...prev, ...data.newBadges]);
        setNewBadgeToast({ badge: data.newBadges[0], visible: true });
        setTimeout(() => setNewBadgeToast(null), 4000);
      }
    } catch (err) {
      console.error('Failed to complete step:', err);
    } finally {
      setCompletingId(null);
    }
  };

  const doneCount = steps.filter(s => s.isCompleted).length;
  const progress  = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;
  const selected  = selectedIdx !== null ? steps[selectedIdx] : null;

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-muted font-mono text-xs gap-2">
      <Loader2 className="h-4 w-4 animate-spin" /> Loading learning path...
    </div>
  );

  if (steps.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
      <Trophy className="h-10 w-10 text-muted/40" />
      <p className="text-sm text-muted font-sans">Analyze a repository to generate your learning path.</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 pb-8 animate-fade-in font-sans">
      {newBadgeToast?.visible && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-panel border border-accent/40 rounded-lg px-5 py-4 shadow-2xl animate-slide-up">
          <span className="text-3xl">{newBadgeToast.badge.icon}</span>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-accent font-bold">Badge Unlocked!</p>
            <p className="text-sm font-semibold text-foreground">{newBadgeToast.badge.label}</p>
          </div>
        </div>
      )}
      
      <div className="relative rounded-xl border border-border bg-panel/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />

        <div ref={scrollRef} className="overflow-x-auto scrollbar-thin py-10 px-6">
          <div className="relative flex items-center" style={{ minWidth: `${Math.max(steps.length * 140, 500)}px` }}>
            <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-border" />
            <div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent transition-all duration-700"
              style={{ width: doneCount > 0 ? `${((doneCount - 0.5) / steps.length) * 100}%` : '0%' }}
            />
            {steps.map((step, idx) => {
              const meta        = CATEGORY_META[step.category] || CATEGORY_META.structure;
              const CatIcon     = meta.icon;
              const isSelected  = selectedIdx === idx;
              const isAbove     = idx % 2 === 0;

              return (
                <div
                  key={step.id}
                  className="flex-1 flex justify-center relative"
                  style={{ minWidth: '120px' }}
                >
                  <div className="flex flex-col items-center gap-2 relative">
                    {isAbove && (
                      <div className="flex flex-col items-center gap-1 mb-1">
                        <CatIcon className={`h-3.5 w-3.5 ${meta.color} opacity-70`} />
                        <span className={`text-[10px] text-center leading-tight max-w-[100px] transition-colors ${
                          isSelected ? 'text-foreground font-medium' : 'text-muted'
                        }`}>
                          {step.title.length > 35 ? step.title.substring(0, 33) + '…' : step.title}
                        </span>
                      </div>
                    )}
                    <div className={`w-[1px] h-3 ${step.isCompleted ? 'bg-accent/40' : 'bg-border'}`} />
                    <button
                      onClick={() => setSelectedIdx(isSelected ? null : idx)}
                      className={`relative h-12 w-12 rounded-full border-2 flex items-center justify-center text-sm font-bold font-mono z-10 transition-all duration-300 cursor-pointer ${
                        step.isCompleted
                          ? `bg-accent border-accent text-background ${meta.glow}`
                          : isSelected
                          ? 'bg-panel border-accent text-accent shadow-[0_0_16px_rgba(62,207,142,0.25)]'
                          : 'bg-panel border-zinc-600 text-zinc-400 hover:border-zinc-400 hover:text-zinc-200 hover:shadow-lg'
                      }`}
                    >
                      {step.isCompleted
                        ? <CheckCircle2 className="h-5 w-5" />
                        : <span>{idx + 1}</span>}
                      {isSelected && !step.isCompleted && (
                        <span className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-20" />
                      )}
                    </button>
                    <div className={`w-[1px] h-3 ${step.isCompleted ? 'bg-accent/40' : 'bg-border'}`} />
                    {!isAbove && (
                      <div className="flex flex-col items-center gap-1 mt-1">
                        <span className={`text-[10px] text-center leading-tight max-w-[100px] transition-colors ${
                          isSelected ? 'text-foreground font-medium' : 'text-muted'
                        }`}>
                          {step.title.length > 35 ? step.title.substring(0, 33) + '…' : step.title}
                        </span>
                        <CatIcon className={`h-3.5 w-3.5 ${meta.color} opacity-70`} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selected ? (
        <DetailPanel
          step={selected}
          idx={selectedIdx!}
          isCompleting={completingId === selected.id}
          onComplete={() => handleComplete(selected.id)}
        />
      ) : (
        <p className="text-center text-[10px] text-muted font-mono py-2">
          Select a milestone to view details
        </p>
      )}
    </div>
  );
}
function DetailPanel({
  step, idx, isCompleting, onComplete,
}: {
  step: LearningStep;
  idx: number;
  isCompleting: boolean;
  onComplete: () => void;
}) {
  const meta    = CATEGORY_META[step.category] || CATEGORY_META.structure;
  const CatIcon = meta.icon;

  return (
    <div className={`rounded-xl overflow-hidden animate-slide-up border ${
      step.isCompleted ? 'border-accent/20' : 'border-border'
    }`}>
      <div className={`h-1 bg-gradient-to-r ${meta.gradient}`} />

      <div className="p-6 bg-panel/40 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
              step.isCompleted ? 'bg-accent/15' : 'bg-surface'
            }`}>
              <CatIcon className={`h-5 w-5 ${step.isCompleted ? 'text-accent' : meta.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-widest">
                  Milestone {idx + 1}
                </span>
                {step.isCompleted && (
                  <span className="text-[9px] font-mono font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded">
                    ✓ DONE
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-foreground leading-snug">{step.title}</h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {step.resource && (
            <a
              href={step.resource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans text-accent hover:text-accent/80 border border-accent/25 hover:border-accent/50 rounded-lg px-4 py-2.5 bg-accent/5 hover:bg-accent/10 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Open Resource
              <ChevronRight className="h-3 w-3 opacity-50" />
            </a>
          )}

          {!step.isCompleted && (
            <button
              onClick={onComplete}
              disabled={isCompleting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-background text-xs font-mono font-bold uppercase tracking-wider hover:bg-accent/90 disabled:opacity-50 cursor-pointer transition-all"
            >
              {isCompleting
                ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Marking...</>
                : <><Sparkles className="h-3.5 w-3.5" /> Complete Milestone</>}
            </button>
          )}

          {step.isCompleted && step.completedAt && (
            <span className="text-xs text-muted font-mono">
              Completed {new Date(step.completedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
