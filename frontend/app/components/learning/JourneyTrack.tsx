import React, { useRef } from 'react';
import { LearningStep } from '../../types';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORY_META } from './categoryMeta';

interface JourneyTrackProps {
  steps: LearningStep[];
  selectedIdx: number | null;
  doneCount: number;
  onSelectStep: (idx: number | null) => void;
}

export default function JourneyTrack({ steps, selectedIdx, doneCount, onSelectStep }: JourneyTrackProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden pt-4 pb-2">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />

      <div ref={scrollRef} className="overflow-x-auto scrollbar-thin py-10 px-6">
        <div className="relative flex items-center" style={{ minWidth: `${Math.max(steps.length * 140, 500)}px` }}>
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-border" />
          <div
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent transition-all duration-700"
            style={{ width: doneCount > 0 ? `${((doneCount - 0.5) / steps.length) * 100}%` : '0%' }}
          />
          {steps.map((step, idx) => {
            const meta = CATEGORY_META[step.category] || CATEGORY_META.structure;
            const CatIcon = meta.icon;
            const isSelected = selectedIdx === idx;
            const isAbove = idx % 2 === 0;

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
                    onClick={() => onSelectStep(isSelected ? null : idx)}
                    className={`relative h-12 w-12 rounded-full border-2 flex items-center justify-center text-sm font-bold font-mono z-10 transition-all duration-300 cursor-pointer ${
                      step.isCompleted
                        ? `bg-accent border-accent text-background`
                        : isSelected
                        ? 'bg-panel border-accent text-accent'
                        : 'bg-panel border-zinc-600 text-zinc-400 hover:border-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {step.isCompleted
                      ? <CheckCircle2 className="h-5 w-5" />
                      : <span>{idx + 1}</span>}
                    {isSelected && !step.isCompleted && (
                      <span className="absolute inset-0 rounded-full border-2 border-accent opacity-20" />
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
  );
}
