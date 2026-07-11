'use client';

import React, { useState } from 'react';
import { Key, Loader2, X } from 'lucide-react';

interface ChangePasswordProps {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // අලුත් passwords දෙක සමානදැයි බලයි
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'නව password එක තහවුරු කළ password එක සමඟ ගැලපෙන්නේ නැත.' });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('user_token');
      
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      setMessage({ type: 'success', text: 'Password එක සාර්ථකව වෙනස් කරන ලදී!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'වැරැද්දක් සිදු විය.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative max-w-sm w-full rounded-lg border border-[#243740] bg-[#18252C] p-6 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-550 hover:text-accent transition duration-150 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 border-b border-[#243740]/65 pb-3">
          <Key className="h-4 w-4 text-accent" />
          <h3 className="text-xs font-bold text-[#ECE9E4] uppercase tracking-wider">
            Change Password
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-[10px]">
          <div>
            <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#131D21]/50 border border-[#243740] text-zinc-300 rounded focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#131D21]/50 border border-[#243740] text-zinc-300 rounded focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-[#131D21]/50 border border-[#243740] text-zinc-300 rounded focus:outline-none focus:border-accent"
            />
          </div>

          {message && (
            <div className={`p-2.5 rounded text-center font-bold tracking-wide border ${
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
            className="w-full flex justify-center items-center py-2 px-4 border border-accent bg-accent hover:bg-accent/90 text-background font-extrabold uppercase rounded cursor-pointer transition duration-150"
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}