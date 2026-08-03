'use client';

import React from 'react';

interface AdminHeaderProps {
  onAddAdmin: () => void;
  onChangePassword: () => void;
  onSignOut: () => void;
}

export default function AdminHeader({ onAddAdmin, onChangePassword, onSignOut }: AdminHeaderProps) {
  return (
    <header className="border-b border-border bg-surface/90 py-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-foreground uppercase font-mono">
          AI_PROJECT_MENTOR  <span className="text-accent">ADMIN_PANEL</span>
        </span>
        
        <div className="flex items-center gap-3 font-mono">
          <button 
            onClick={onChangePassword}
            className="flex items-center gap-1.5 rounded border border-border bg-panel px-3.5 py-1.5 text-[10px] text-zinc-400 hover:border-accent hover:text-accent transition duration-200 cursor-pointer"
          >
            Change Password
          </button>

          <button 
            onClick={onAddAdmin}
            className="flex items-center gap-1.5 rounded border border-accent/40 bg-accent/5 px-3.5 py-1.5 text-[10px] text-accent hover:bg-accent hover:text-background transition duration-200 cursor-pointer"
          >
            + Add Admin
          </button>

          <button 
            onClick={onSignOut}
            className="flex items-center gap-1.5 rounded border border-border bg-panel px-3.5 py-1.5 text-[10px] text-zinc-400 hover:border-accent hover:text-accent transition duration-200 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
