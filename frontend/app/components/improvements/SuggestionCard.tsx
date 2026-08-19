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

  const handleAutoFix = async () => {
    setFixLoading(true);
    setAutoFix(null);
    try {
      const token = localStorage.getItem('user_token');
      const res   = await fetch('http://13.239.146.29.nip.io:5000/api/autofix/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          beforeCode:  suggestion.beforeCode,
          title:       suggestion.title,
          description: suggestion.description,
          filePath:    suggestion.filePath,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setAutoFix(data.fixedCode);
      setFixExplanation(data.explanation || '');
    } catch (err) {
      console.error('Auto-fix failed:', err);
    } finally {
      setFixLoading(false);
    }
  };

  const handleCopy = () => {
    if (autoFix) {
      navigator.clipboard.writeText(autoFix);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
