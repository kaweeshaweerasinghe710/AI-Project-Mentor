'use client';

import React from 'react';
import { Loader2, Trophy } from 'lucide-react';
import { useLearningPath } from '../hooks/useLearningPath';
import JourneyTrack from './learning/JourneyTrack';
import StepDetailPanel from './learning/StepDetailPanel';
import BadgeToast from './learning/BadgeToast';

export default function LearningPath() {
  const {
    steps,
    loading,
    completingId,
    selectedIdx,
    setSelectedIdx,
    newBadgeToast,
    doneCount,
    handleComplete,
    selected
  } = useLearningPath();

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
      {newBadgeToast && (
        <BadgeToast badge={newBadgeToast.badge} visible={newBadgeToast.visible} />
      )}
      
      <JourneyTrack 
        steps={steps}
        selectedIdx={selectedIdx}
        doneCount={doneCount}
        onSelectStep={setSelectedIdx}
      />
      
      {selected ? (
        <StepDetailPanel
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
