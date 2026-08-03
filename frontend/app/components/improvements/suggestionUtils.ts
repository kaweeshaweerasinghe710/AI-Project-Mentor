import React from 'react';
import { ShieldAlert, Code2, Server, Cpu } from 'lucide-react';

export const getSeverityBadgeColor = (severity: 'low' | 'medium' | 'high') => {
  if (severity === 'high')   return 'text-accent border-accent/20 bg-accent/5';
  if (severity === 'medium') return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
  return 'text-muted border-border bg-panel/40';
};

export const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  security:    ShieldAlert,
  structure:   Code2,
  loadBalance: Server,
  performance: Cpu,
};

export function parseSections(description: string) {
  const sections: Record<string, string> = {};
  for (const line of description.split('\n').filter(l => l.trim())) {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1 && colonIdx < 12) {
      const key   = line.substring(0, colonIdx).trim().toLowerCase();
      const value = line.substring(colonIdx + 1).trim();
      sections[key] = value;
    }
  }
  return sections;
}
