'use client';

import React, { useState } from 'react';
import { Key, Loader2 } from 'lucide-react';
import ModalWrapper from './ModalWrapper';
import FormField from './FormField';
import FormMessage from './FormMessage';

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

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'නව password එක තහවුරු කළ password එක සමඟ ගැලපෙන්නේ නැත.' });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('user_token');
      
      const response = await fetch('http://13.239.146.29.nip.io:5000/api/auth/change-password', {
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
    <ModalWrapper 
      onClose={onClose} 
      icon={<Key className="h-4 w-4 text-accent" />} 
      title="Change Password"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormField label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} placeholder="••••••••" required />
        <FormField label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="••••••••" required />
        <FormField label="Confirm New Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" required />
        
        <FormMessage message={message} />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 px-4 border border-accent bg-accent hover:bg-accent/90 text-background font-extrabold uppercase rounded cursor-pointer transition duration-150 text-xs"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Update Password'}
        </button>
      </form>
    </ModalWrapper>
  );
}
