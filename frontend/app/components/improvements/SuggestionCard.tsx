'use client';

import React, { useState } from 'react';
import { ImprovementSuggestion } from '../../types';
import SuggestionHeader from './SuggestionHeader';


interface SuggestionCardProps {
  suggestion: ImprovementSuggestion;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const [isExpanded,   setIsExpanded]   = useState(false);
  const [showProblem,  setShowProblem]  = useState(false);
  const [showFix,      setShowFix]      = useState(false);
  const [autoFix, setAutoFix]       = useState<string | null>(null);
  const [fixLoading, setFixLoading] = useState(false);
  const [fixExplanation, setFixExplanation] = useState('');

  const handleToggleExpand = () => {
    if (isExpanded) {
      setShowProblem(false);
      setShowFix(false);
    }
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="rounded-lg border border-border bg-panel/45 hover:border-accent/40 hover:bg-panel transition-all duration-300 overflow-hidden font-sans">
      <SuggestionHeader
        suggestion={suggestion}
        isExpanded={isExpanded}
        showProblem={showProblem}
        showFix={showFix}
        onToggleExpand={handleToggleExpand}
        onToggleProblem={() => setShowProblem(prev => !prev)}
        onToggleFix={() => setShowFix(prev => !prev)}
      />
    </div>
  );
}
