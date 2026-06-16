import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnalysisResult } from '../types';
import { presets } from '../data/presets';
import { generateMockAnalysis } from '../services/analyzer';

export type AppState = 'landing' | 'loading' | 'dashboard';
export type TabId = 'overview' | 'suggestions' | 'quiz' | 'chat';

export function useAppState() {
  const router = useRouter();
  const [appState, setAppState] = useState<AppState>('landing');
  const [repoUrl, setRepoUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const email = localStorage.getItem('user_email');
    if (!token) {
      router.push('/login');
    } else if (email) {
      setTimeout(() => {
        setUserEmail(email);
      }, 0);
    }
  }, [router]);

  const handleStartAnalysis = (url: string, presetKey?: string) => {
    setRepoUrl(url);
    setAppState('loading');

    // Determine the result dataset
    if (presetKey && presets[presetKey]) {
      setAnalysisResult(presets[presetKey]);
    } else {
      // Custom URL entry
      const customResult = generateMockAnalysis(url);
      setAnalysisResult(customResult);
    }
  };

  const handleFinishedLoading = () => {
    setAppState('dashboard');
  };

  const handleReset = () => {
    setAppState('landing');
    setRepoUrl('');
    setAnalysisResult(null);
    setActiveTab('overview');
  };

  const handleSignOut = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_email');
    setUserEmail(null);
    router.push('/login');
  };

  return {
    appState,
    repoUrl,
    analysisResult,
    activeTab,
    setActiveTab,
    userEmail,
    handleStartAnalysis,
    handleFinishedLoading,
    handleReset,
    handleSignOut
  };
}

