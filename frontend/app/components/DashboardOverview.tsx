'use client';

import React from 'react';
import { AnalysisResult } from '../types';
import { ShieldCheck, Cpu, Code2, Server } from 'lucide-react';
import GradeRing from './dashboard/GradeRing';
import StatsCard from './dashboard/StatsCard';
import MetricCard from './dashboard/MetricCard';
import ComparisonChart from './dashboard/ComparisonChart';
import SummaryHighlights from './dashboard/SummaryHighlights';

interface DashboardOverviewProps {
  result: AnalysisResult;
  onNavigateToTab: (tab: string) => void;
}

export default function DashboardOverview({ result, onNavigateToTab }: DashboardOverviewProps) {
  const { scores, stats, overallGrade, overallScore } = result;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GradeRing overallGrade={overallGrade} overallScore={overallScore} />
        <StatsCard stats={stats} />
      </div>

      {/* Metrics Section */}
      <div>
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 font-mono">
          Dimension Scores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Structure Layout"
            score={scores.structure}
            description="Evaluates code separation, namespace packaging, routing configuration, and project architecture layouts."
            limitText="Limit: 85%"
            statusText={scores.structure >= 85 ? 'Valid' : 'Refactor'}
            isStatusPositive={scores.structure >= 85}
            icon={Code2}
          />
          <MetricCard
            title="Security Parameters"
            score={scores.security}
            description="Checks for exposed secret parameters, plaintext passwords, CSRF cookie gaps, and injection holes."
            limitText="Limit: 90%"
            statusText={scores.security >= 90 ? 'Secure' : 'Alert'}
            isStatusPositive={scores.security >= 90}
            icon={ShieldCheck}
          />
          <MetricCard
            title="Clustering & Pool"
            score={scores.loadBalance}
            description="Scans replica configurations, postgres connection pools, container settings, and horizontal state sync."
            limitText="Limit: 80%"
            statusText={scores.loadBalance >= 80 ? 'Scaled' : 'Bound'}
            isStatusPositive={scores.loadBalance >= 80}
            icon={Server}
          />
          <MetricCard
            title="Performance & Lock"
            score={scores.performance}
            description="Audits runtime map race panics, execution routines, memory models, cache hooks, and async delays."
            limitText="Limit: 85%"
            statusText={scores.performance >= 85 ? 'Optimized' : 'Warning'}
            isStatusPositive={scores.performance >= 85}
            icon={Cpu}
          />
        </div>
      </div>

      {/* Visual Comparison Chart Panel */}
      <ComparisonChart scores={scores} />

      {/* Quick Summary Highlights */}
      <SummaryHighlights result={result} onNavigateToTab={onNavigateToTab} />
    </div>
  );
}
