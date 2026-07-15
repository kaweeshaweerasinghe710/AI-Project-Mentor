'use client';
import { login, signup } from '../services/auth';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (activeTab === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      let data;
      if (activeTab === 'login') {
        data = await login(email.trim(), password);
      } else {
        data = await signup(email.trim(), password);
      }
     
      localStorage.setItem('user_token', data.token);
      localStorage.setItem('user_email', email.trim());
      localStorage.setItem('user_role', data.user.role);
      if (data.user.role === 'admin') {
        router.push('/admin'); 
      } else {
        router.push('/'); 
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Header Icon & Title */}
          <div className="flex justify-center mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded border border-border bg-panel/60 text-accent">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-center text-xl font-extrabold text-foreground uppercase tracking-widest font-mono">
            AI_PROJECT_MENTOR
          </h2>
          <p className="mt-2 text-center text-[10px] text-muted uppercase tracking-wider font-mono">
            Security Auditing & Peer Review Portal
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-panel/40 border border-border rounded-lg py-8 px-6 shadow-xl card-hover">
            {/* Tab Switcher */}
            <div className="flex bg-surface/80 p-0.5 border border-border rounded mb-6">
              <button
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-sm transition duration-200 cursor-pointer select-none font-mono ${
                  activeTab === 'login'
                    ? 'bg-panel text-accent font-extrabold border border-border'
                    : 'text-zinc-650 hover:text-zinc-450'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('signup'); setError(''); }}
                className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-sm transition duration-200 cursor-pointer select-none font-mono ${
                  activeTab === 'signup'
                    ? 'bg-panel text-accent font-extrabold border border-border'
                    : 'text-zinc-650 hover:text-zinc-450'
                }`}
              >
                Register
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-2 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-650">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-border text-zinc-300 rounded text-xs placeholder-zinc-700 focus:outline-none focus:border-accent transition duration-150"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-2 font-mono">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-650">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-border text-zinc-300 rounded text-xs placeholder-zinc-700 focus:outline-none focus:border-accent transition duration-150"
                  />
                </div>
              </div>

              {/* Confirm Password Field (Only for Signup) */}
              {activeTab === 'signup' && (
                <div className="animate-fade-in">
                  <label className="block text-[9px] font-bold text-muted uppercase tracking-wider mb-2 font-mono">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-650">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-border text-zinc-300 rounded text-xs placeholder-zinc-700 focus:outline-none focus:border-accent transition duration-150"
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <p className="text-[10px] text-accent text-center bg-accent-muted border border-accent/15 rounded-lg py-2 animate-fade-in font-mono">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-accent bg-accent hover:bg-accent/90 text-background text-xs uppercase tracking-wider font-extrabold rounded transition duration-200 cursor-pointer hover:scale-102"
              >
                {activeTab === 'login' ? 'Authenticate' : 'Create Account'}
              </button>

              {/* OAuth Separator */}
              <div className="relative my-5 select-none font-mono">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase font-bold">
                  <span className="bg-[#19262C] px-2 text-zinc-550">Or authenticate via</span>
                </div>
              </div>

              <div className="w-full flex justify-center mt-3">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    setError('');
                    try {
                      const res = await fetch('http://localhost:5000/api/auth/google', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ credentialToken: credentialResponse.credential })
                      });

                      const data = await res.json();
                      if (!res.ok) {
                        throw new Error(data.message || 'Google Auth failed');
                      }
                      localStorage.setItem('user_token', data.token);
                      localStorage.setItem('user_email', data.user.email);
                      localStorage.setItem('user_role', data.user.role);
                      if (data.user.role === 'admin') {
                        router.push('/admin');
                      } else {
                        router.push('/');
                      }

                    } catch (err: any) {
                      setError(err.message || 'Google authentication failed.');
                    }
                  }}
                  onError={() => {
                    setError('Google Sign-In was cancelled or failed.');
                  }}
                  theme="filled_black" 
                  width="100%"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
