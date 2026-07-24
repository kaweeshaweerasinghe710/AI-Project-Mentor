'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { LearningStep, Badge } from '../types';
import { CheckCircle2, Circle, ExternalLink, ShieldAlert, Cpu, Server, Code2, Trophy, Loader2 } from 'lucide-react';

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ className?: string }>, color: string, bg: string }> = {
  security:    { icon: ShieldAlert, color: 'text-rose-400',   bg: 'bg-rose-400/10 border-rose-400/20' },
  performance: { icon: Cpu,         color: 'text-amber-400',  bg: 'bg-amber-400/10 border-amber-400/20' },
  structure:   { icon: Code2,       color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400/20' },
  loadBalance: { icon: Server,      color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
};

interface NewBadgeToast {
  badge: Badge;
  visible: boolean;
}

export default function LearningPath() {
  const [steps, setSteps] = useState<LearningStep[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [newBadgeToast, setNewBadgeToast] = useState<NewBadgeToast | null>(null);

  const fetchLearningPath = useCallback(async () => {
    try {
      const token = localStorage.getItem('user_token');
      const res = await fetch('http://localhost:5000/api/learning', {
        headers: { 'Authorization': `Bearer ${token}` }
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
      const res = await fetch(`http://localhost:5000/api/learning/step/${stepId}/complete`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to complete step');
      const data = await res.json();

      // Update step locally
      setSteps(prev => prev.map(s => s.id === stepId ? { ...s, isCompleted: true } : s));

      // Show new badge toast if awarded
      if (data.newBadges && data.newBadges.length > 0) {
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
  const progress = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted font-mono text-xs gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading learning path...
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <Trophy className="h-10 w-10 text-muted/40" />
        <p className="text-sm text-muted font-sans">Analyze a repository to generate your learning path.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8 animate-fade-in">
      {newBadgeToast?.visible && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-panel border border-accent/40 rounded-lg px-5 py-4 shadow-2xl animate-slide-up">
          <span className="text-3xl">{newBadgeToast.badge.icon}</span>
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-accent font-bold">Badge Unlocked!</p>
            <p className="text-sm font-semibold text-foreground font-sans">{newBadgeToast.badge.label}</p>
          </div>
        </div>
      )}
      <div className="rounded-lg border border-border bg-panel/50 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground font-sans">Your Learning Progress</h2>
          <span className="text-xs font-mono text-accent font-bold">{doneCount} / {steps.length} complete</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-accent transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted font-sans mt-2">{progress}% completed</p>
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          const meta = CATEGORY_META[step.category] || CATEGORY_META.structure;
          const CatIcon = meta.icon;
          const isCompleting = completingId === step.id;

          return (
            <div
              key={step.id}
              className={`rounded-lg border p-4 flex items-center gap-4 transition-all duration-300 font-sans ${
                step.isCompleted
                  ? 'border-accent/20 bg-accent/5 opacity-75'
                  : 'border-border bg-panel/50 hover:border-zinc-600'
              }`}
            >
              <div className="shrink-0">
                {step.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                ) : (
                  <Circle className="h-5 w-5 text-muted/40" />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${meta.bg} ${meta.color}`}>
                    <CatIcon className="h-2.5 w-2.5" />
                    {step.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted">Step {step.order}</span>
                </div>
                <p className={`text-sm font-medium leading-snug ${step.isCompleted ? 'line-through text-muted' : 'text-foreground'}`}>
                  {step.title}
                </p>
              </div>

              {step.resource && (
                <a
                  href={step.resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-muted hover:text-accent transition-colors border border-border hover:border-accent/40 rounded px-2 py-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Read
                </a>
              )}

              {!step.isCompleted && (
                <button
                  onClick={() => handleComplete(step.id)}
                  disabled={isCompleting}
                  className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-accent/40 text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isCompleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
                  {isCompleting ? 'Marking...' : 'Done'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {badges.length > 0 && (
        <div className="rounded-lg border border-border bg-panel/50 p-5">
          <h3 className="text-sm font-semibold text-foreground font-sans mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            Earned Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-2 bg-accent/5 border border-accent/20 rounded-lg px-4 py-2.5"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-xs font-semibold text-foreground font-sans">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
