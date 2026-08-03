'use client';

import { useState, useEffect } from 'react';

interface RegistrationStat {
  date: string;
  count: number;
}

export function useAdminStats(router: any) {
  const [stats, setStats] = useState<RegistrationStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const handleSignOut = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    router.push('/login');
  };

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

  const dailyAvg = stats.length > 0 ? (totalUsers / stats.length).toFixed(1) : '0';

  return { stats, loading, error, totalUsers, dailyAvg, handleSignOut };
}
