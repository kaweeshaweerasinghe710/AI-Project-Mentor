'use client';

import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import ModalWrapper from './ModalWrapper';
import FormField from './FormField';
import FormMessage from './FormMessage';

interface AddAdminFormProps {
  onClose: () => void;
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
      
      const response = await fetch('http://13.239.146.29.nip.io:5000/api/admin/create-admin', {
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
    <ModalWrapper 
      onClose={onClose} 
      icon={<UserPlus className="h-4 w-4 text-accent" />} 
      title="Add New Administrator"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormField label="Full Name" type="text" value={name} onChange={setName} placeholder="John Doe" required />
        <FormField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="admin@example.com" required />
        <FormField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
        
        <FormMessage message={message} />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 px-4 border border-accent bg-accent hover:bg-accent/90 text-background font-extrabold uppercase rounded cursor-pointer transition duration-150 text-xs"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Register Admin'}
        </button>
      </form>
    </ModalWrapper>
  );
}
