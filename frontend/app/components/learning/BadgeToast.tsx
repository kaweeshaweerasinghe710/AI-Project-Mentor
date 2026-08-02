import React from 'react';
import { Badge } from '../../types';

interface BadgeToastProps {
  badge: Badge;
  visible: boolean;
}

export default function BadgeToast({ badge, visible }: BadgeToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-panel border border-accent/40 rounded-lg px-5 py-4 shadow-2xl animate-slide-up">
      <span className="text-3xl">{badge.icon}</span>
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-accent font-bold">Badge Unlocked!</p>
        <p className="text-sm font-semibold text-foreground">{badge.label}</p>
      </div>
    </div>
  );
}
