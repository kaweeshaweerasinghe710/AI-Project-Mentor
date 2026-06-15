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
    <div className="rounded-lg border border-[#243740] bg-[#18252C]/45 hover:border-accent hover:bg-[#18252C] transition-all duration-300 overflow-hidden card-hover">
      <SuggestionHeader
        suggestion={suggestion}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && <SuggestionCodeDiff suggestion={suggestion} />}
    </div>
  );
}
