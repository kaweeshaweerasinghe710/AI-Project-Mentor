'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertOctagon, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdminStatsGrid from '@/app/admin/components/AdminStatsGrid';
import AdminRegistrationChart from '@/app/admin/components/AdminRegistrationChart';

interface RegistrationStat {
  date: string;
  count: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<RegistrationStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('user_token');
        if (!token) {
          router.push('/login');
          return;
        }
        const response = await fetch('http://localhost:5000/api/admin/stats/registrations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 403) {
          throw new Error('ACCESS_DENIED');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch admin stats');
        }

        const data: RegistrationStat[] = await response.json();
        setStats(data);
        const sum = data.reduce((acc, curr) => acc + curr.count, 0);
        setTotalUsers(sum);

      } catch (err: any) {
        console.error(err);
        if (err.message === 'ACCESS_DENIED') {
          setError('You have not access to this page. Please contact the system administrator.');
        } else {
          setError(err.message || 'cant fetch admin stats');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-mono text-zinc-500">
        <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
        <span>Loading Admin Panel Stats...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 font-mono text-xs">
        <div className="max-w-md w-full rounded-lg border border-red-900/30 bg-[#1A1012] p-8 text-center space-y-6">
          <AlertOctagon className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest">ACCESS DENIED</h2>
          <p className="text-zinc-400 leading-relaxed">{error}</p>
          <div className="pt-4">
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

  const dailyAvg = stats.length > 0 ? (totalUsers / stats.length).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-background text-foreground font-mono text-xs flex flex-col">
      {/* Admin Header */}
      <header className="border-b border-[#243740] bg-[#131D21]/90 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-[#ECE9E4] uppercase">
              AI_PROJECT_MENTOR  <span className="text-accent">ADMIN_PANEL</span>
            </span>
          </div>
         
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {/* Title */}
        <div>
          <h1 className="text-base font-bold text-[#ECE9E4] uppercase tracking-wider">
            User Registration Analytics
          </h1>
        </div>

        {/* 1. Summary Cards Block */}
        <AdminStatsGrid 
          totalUsers={totalUsers} 
          activeDays={stats.length} 
          dailyAverage={dailyAvg} 
        />
        {/* 2. Registration Growth Chart Panel */}
        <AdminRegistrationChart stats={stats} />
      </main>
    </div>
  );
}