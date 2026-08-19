import React from 'react';
import { ShieldAlert, Cpu, Server, Code2 } from 'lucide-react';

export type CategoryMetaType = Record<string, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  gradient: string;
}>;

export const CATEGORY_META: CategoryMetaType = {
  security:    { icon: ShieldAlert, color: 'text-rose-400',   glow: '',  gradient: 'from-rose-500/20 to-transparent' },
  performance: { icon: Cpu,         color: 'text-amber-400',  glow: '',   gradient: 'from-amber-500/20 to-transparent' },
  structure:   { icon: Code2,       color: 'text-blue-400',   glow: '',   gradient: 'from-blue-500/20 to-transparent' },
  loadBalance: { icon: Server,      color: 'text-violet-400', glow: '',  gradient: 'from-violet-500/20 to-transparent' },
};
