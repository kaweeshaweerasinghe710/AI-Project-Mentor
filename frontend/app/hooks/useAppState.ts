import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnalysisResult } from '../types';
import { analyzeRepositoryAPI } from '../services/analyzer';

export type AppState = 'landing' | 'loading' | 'dashboard';
export type TabId = 'overview' | 'suggestions' | 'quiz' | 'chat';

export function useAppState() {
  const router = useRouter();
  const [appState, setAppState] = useState<AppState>('landing');
  const [repoUrl, setRepoUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [animationFinished, setAnimationFinished] = useState(false);

  // Helper: JWT token expired check
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const email = localStorage.getItem('user_email');

    if (!token || isTokenExpired(token)) {
      // Token missing or expired — clear storage and redirect to login
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_email');
      router.push('/login');
      return;
    }

    if (email) {
      setTimeout(() => {
        setUserEmail(email);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (appState !== 'loading' || !repoUrl) return;

    let active = true;

    async function triggerAnalysis() {
      try {
        const result = await analyzeRepositoryAPI(repoUrl);
        if (active) {
          setAnalysisResult(result);
        }
      } catch (err: any) {
        console.error(err);
        if (active) {
          setAppState('landing');
          alert('Analysis failed: ' + (err.message || 'Unknown error'));
        }
      }
    }

    triggerAnalysis();

    return () => {
      active = false;
    };
  }, [appState, repoUrl]);

  
  useEffect(() => {
    if (animationFinished && analysisResult && appState === 'loading') {
      setAppState('dashboard');
      setAnimationFinished(false); // Reset animation state for future analyses
    }
  }, [animationFinished, analysisResult, appState]);

  const handleStartAnalysis = (url: string) => {
    setRepoUrl(url);
    setAppState('loading');
    setAnalysisResult(null);
  };

  const handleFinishedLoading = () => {
    setAnimationFinished(true); 
  };

  const handleReset = () => {
    setAppState('landing');
    setRepoUrl('');
    setAnalysisResult(null);
    setAnimationFinished(false); 
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

