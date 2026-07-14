'use client';

import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AnalyzerLoading from './components/AnalyzerLoading';
import DashboardOverview from './components/DashboardOverview';
import ImprovementsList from './components/ImprovementsList';
import ReviewQuestions from './components/ReviewQuestions';
import MentorChat from './components/MentorChat';
import { useAppState, TabId } from './hooks/useAppState';
import { LayoutDashboard, Sparkles, HelpCircle, Bot } from 'lucide-react';

export default function Home() {
  const {
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
  } = useAppState();

  const renderActiveTabContent = () => {
    if (!analysisResult) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <DashboardOverview
            result={analysisResult}
            onNavigateToTab={(tabId) => setActiveTab(tabId as TabId)}
          />
        );
      case 'suggestions':
        return <ImprovementsList suggestions={analysisResult.suggestions} />;
      case 'quiz':
        return <ReviewQuestions questions={analysisResult.reviewQuestions} />;
      case 'chat':
        return <MentorChat key={analysisResult.repoName} result={analysisResult} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent-muted selection:text-white">
      {/* Header */}
      <Header
        repoName={appState === 'dashboard' ? analysisResult?.repoName : undefined}
        onReset={handleReset}
        userEmail={userEmail}
        onSignOut={handleSignOut}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-h-0">
        {appState === 'landing' && (
          <LandingPage onStartAnalysis={handleStartAnalysis} />
        )}

        {appState === 'loading' && (
          <div className="flex-1 flex items-center justify-center py-12">
            <AnalyzerLoading repoUrl={repoUrl} onFinished={handleFinishedLoading} />
          </div>
        )}

        {appState === 'dashboard' && analysisResult && (
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col flex-1 gap-6 min-h-0">
            {/* Dashboard Tabs Bar */}
            <div className="flex border-b border-border overflow-x-auto scrollbar-none gap-6 shrink-0">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
                { id: 'suggestions', label: 'Review Suggestions', icon: Sparkles },
                { id: 'quiz', label: 'Review Questions', icon: HelpCircle },
                { id: 'chat', label: 'AI Architect Chat', icon: Bot }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabId)}
                    className={`flex items-center gap-2 py-3 px-1.5 border-b-2 text-xs font-mono uppercase tracking-wider transition cursor-pointer select-none ${
                      isSelected
                        ? 'border-accent text-accent font-bold'
                        : 'border-transparent text-zinc-500 hover:text-zinc-400'
                    }`}
                  >
                    <TabIcon className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Body View */}
            <div className="flex-grow min-h-0">
              {renderActiveTabContent()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
