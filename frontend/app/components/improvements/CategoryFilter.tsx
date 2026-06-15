'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface CategoryItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2.5 border-b border-[#243740] pb-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-[10px] uppercase font-bold tracking-wider rounded border transition-all duration-200 cursor-pointer select-none ${
              isSelected
                ? 'bg-accent border-accent text-[#131D21] font-extrabold shadow'
                : 'bg-[#18252C] border-[#243740] text-zinc-500 hover:border-accent hover:text-accent'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
