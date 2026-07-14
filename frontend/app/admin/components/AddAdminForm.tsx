'use client';

import React, { useState } from 'react';
import { UserPlus, Loader2, X } from 'lucide-react';

interface AddAdminFormProps {
  onClose: () => void; // Modal එක close කිරීමට props එකක් ගනී
}

export default function AddAdminForm({ onClose }: AddAdminFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('user_token');
      
      const response = await fetch('http://localhost:5000/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create administrator');
      }

      setMessage({ type: 'success', text: 'නව Administrator සාර්ථකව ඇතුළත් කරන ලදී!' });
      setName('');
      setEmail('');
      setPassword('');

    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'වැරැද්දක් සිදු විය.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // පසුබිම අඳුරු කර පිරිසිදුව පෙන්වන backdrop එකක්
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in font-sans">
      
      {/* Modal Box */}
      <div className="relative max-w-sm w-full rounded-lg border border-border bg-panel p-6 shadow-2xl space-y-6">
        
        {/* Close [X] Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-muted hover:text-accent transition duration-150 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 border-b border-border/65 pb-3">
          <UserPlus className="h-4 w-4 text-accent" />
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Add New Administrator
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[8px] font-bold text-muted uppercase tracking-widest mb-1.5 font-mono">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 bg-surface/50 border border-border text-zinc-300 rounded focus:outline-none focus:border-accent text-xs"
            />
          </div>

          <div>
            <label className="block text-[8px] font-bold text-muted uppercase tracking-widest mb-1.5 font-mono">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-3 py-2 bg-surface/50 border border-border text-zinc-300 rounded focus:outline-none focus:border-accent text-xs"
            />
          </div>

          <div>
            <label className="block text-[8px] font-bold text-muted uppercase tracking-widest mb-1.5 font-mono">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-surface/50 border border-border text-zinc-300 rounded focus:outline-none focus:border-accent text-xs font-sans"
            />
          </div>

          {message && (
            <div className={`p-2.5 rounded text-center font-bold tracking-wide border font-mono text-[10px] ${
              message.type === 'success' 
                ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' 
                : 'bg-red-950/20 border-red-900/30 text-accent'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-accent bg-accent hover:bg-accent/90 text-background font-extrabold uppercase rounded cursor-pointer transition duration-150 text-xs"
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Register Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}