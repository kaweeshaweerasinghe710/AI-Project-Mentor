'use client';

import React, { useState } from 'react';
import { ImprovementSuggestion } from '../../types';
import SuggestionHeader from './SuggestionHeader';

interface SuggestionCardProps {
  suggestion: ImprovementSuggestion;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const [isExpanded,      setIsExpanded]      = useState(false);
  const [showProblem,     setShowProblem]     = useState(false);
  const [showFix,         setShowFix]         = useState(false);
  const [autoFix,         setAutoFix]         = useState<string | null>(null);
  const [fixLoading,      setFixLoading]      = useState(false);
  const [fixExplanation,  setFixExplanation]  = useState('');
  const [copied,          setCopied]          = useState(false);

  const handleToggleExpand = () => {
    if (isExpanded) {
      setShowProblem(false);
      setShowFix(false);
      setAutoFix(null);
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
        autoFix={autoFix}
        fixLoading={fixLoading}
        fixExplanation={fixExplanation}
        copied={copied}
        onToggleExpand={handleToggleExpand}
        onToggleProblem={() => setShowProblem(prev => !prev)}
        onToggleFix={() => setShowFix(prev => !prev)}
        onAutoFix={handleAutoFix}
        onCopy={handleCopy}
      />
    </div>
  );
}
