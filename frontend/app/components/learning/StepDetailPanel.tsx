import React from 'react';
import { LearningStep } from '../../types';
import { ExternalLink, Loader2, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORY_META } from './categoryMeta';

interface StepDetailPanelProps {
  step: LearningStep;
  idx: number;
  isCompleting: boolean;
  onComplete: () => void;
}

export default function StepDetailPanel({
  step,
  idx,
  isCompleting,
  onComplete,
}: StepDetailPanelProps) {
  const meta = CATEGORY_META[step.category] || CATEGORY_META.structure;
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
