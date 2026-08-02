import React from 'react';
import { ShieldAlert, Cpu, Server, Code2 } from 'lucide-react';

export type CategoryMetaType = Record<string, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  gradient: string;
}>;

export const CATEGORY_META: CategoryMetaType = {
  security:    { icon: ShieldAlert, color: 'text-rose-400',   glow: 'shadow-[0_0_20px_rgba(251,113,133,0.3)]',  gradient: 'from-rose-500/20 to-transparent' },
  performance: { icon: Cpu,         color: 'text-amber-400',  glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',   gradient: 'from-amber-500/20 to-transparent' },
  structure:   { icon: Code2,       color: 'text-blue-400',   glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',   gradient: 'from-blue-500/20 to-transparent' },
  loadBalance: { icon: Server,      color: 'text-violet-400', glow: 'shadow-[0_0_20px_rgba(167,139,250,0.3)]',  gradient: 'from-violet-500/20 to-transparent' },
};
