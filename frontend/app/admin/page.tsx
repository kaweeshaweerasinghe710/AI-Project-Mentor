'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertOctagon, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdminStatsGrid from '@/app/admin/components/AdminStatsGrid';
import AdminRegistrationChart from '@/app/admin/components/AdminRegistrationChart';
import AddAdminForm from './components/AddAdminForm';
import ChangePasswordModal from '@/app/admin/components/ChangePasswordModal';
import AdminHeader from './components/AdminHeader';
import { useAdminStats } from '../hooks/useAdminStats';

export default function AdminDashboard() {
  const router = useRouter();
  const { stats, loading, error, totalUsers, dailyAvg, handleSignOut } = useAdminStats(router);
  const [showAddAdmin, setShowAddAdmin] = useState(false); 
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-sans text-muted">
        <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
        <span>Loading Admin Panel Stats...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 font-sans text-xs">
        <div className="max-w-md w-full rounded-lg border border-red-900/30 bg-[#1A1012] p-8 text-center space-y-6">
          <AlertOctagon className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest font-mono">ACCESS DENIED</h2>
          <p className="text-slate-400 leading-relaxed font-sans">{error}</p>
          <div className="pt-4 font-mono">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-accent hover:underline uppercase tracking-wider text-[10px] font-bold"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans text-xs flex flex-col">
      <AdminHeader 
        onAddAdmin={() => setShowAddAdmin(true)} 
        onChangePassword={() => setShowChangePassword(true)} 
        onSignOut={handleSignOut} 
      />

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <h1 className="text-base font-bold text-foreground uppercase tracking-wider font-mono">
            User Registration Analytics
          </h1>
        </div>
        <AdminStatsGrid 
          totalUsers={totalUsers} 
          activeDays={stats.length} 
          dailyAverage={dailyAvg} 
        />
        <AdminRegistrationChart stats={stats} />
        {showAddAdmin && <AddAdminForm onClose={() => setShowAddAdmin(false)} />}
        {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
      </main>
    </div>
  );
}
