'use client';

import React, { useState } from 'react';
import { ImprovementSuggestion } from '../types';
import { ShieldAlert, Cpu, Code2, Server, Filter } from 'lucide-react';
import CategoryFilter, { CategoryItem } from './improvements/CategoryFilter';
import SuggestionCard from './improvements/SuggestionCard';

interface ImprovementsListProps {
  suggestions: ImprovementSuggestion[];
}

export default function ImprovementsList({ suggestions }: ImprovementsListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: CategoryItem[] = [
    { id: 'all', label: 'All Reviews', icon: Filter },
    { id: 'security', label: 'Security', icon: ShieldAlert },
    { id: 'structure', label: 'Structure', icon: Code2 },
    { id: 'loadBalance', label: 'Clustering', icon: Server },
    { id: 'performance', label: 'Performance', icon: Cpu }
  ];

  const filteredSuggestions = suggestions.filter(
    (sug) => activeCategory === 'all' || sug.category === activeCategory
  );

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Category Tabs Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Suggestion Cards */}
      {filteredSuggestions.length === 0 ? (
        <div className="rounded-lg border border-border bg-panel/40 p-12 text-center text-muted font-mono text-[10px]">
          {"// No suggestions identified for this category."}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredSuggestions.map((sug) => (
            <SuggestionCard key={sug.id} suggestion={sug} />
          ))}
        </div>
      )}
    </div>
  );
}
