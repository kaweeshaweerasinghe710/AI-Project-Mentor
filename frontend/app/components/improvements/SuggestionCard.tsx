'use client';

import React, { useState } from 'react';
import { ImprovementSuggestion } from '../../types';
import SuggestionHeader from './SuggestionHeader';
import SuggestionCodeDiff from './SuggestionCodeDiff';

interface SuggestionCardProps {
  suggestion: ImprovementSuggestion;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-panel/45 hover:border-accent hover:bg-panel transition-all duration-300 overflow-hidden card-hover font-sans">
      <SuggestionHeader
        suggestion={suggestion}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && <SuggestionCodeDiff suggestion={suggestion} />}
    </div>
  );
}
