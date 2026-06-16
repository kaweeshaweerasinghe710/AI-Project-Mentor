'use client';

import React from 'react';

interface GradeRingProps {
  overallGrade: string;
  overallScore: number;
}

export default function GradeRing({ overallGrade, overallScore }: GradeRingProps) {
  const radius = 62;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray * (1 - overallScore / 100);

  const getComplianceText = (score: number) => {
    if (score >= 80) return 'standard';
    if (score >= 65) return 'acceptable';
    return 'suboptimal';
  };

  return (
    <div className="lg:col-span-1 rounded-lg border border-[#243740] bg-[#18252C]/50 p-6 flex flex-col items-center justify-center text-center relative card-hover">
      <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 font-mono">Overall Grade</h3>
      
      <div className="relative flex items-center justify-center mb-6">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-[#243740] fill-none"
            strokeWidth="6"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-accent fill-none transition-all duration-1000 ease-out"
            strokeWidth="6"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center font-mono">
          <span className="text-2xl font-extrabold text-[#ECE9E4]">{overallGrade}</span>
          <span className="text-[9px] font-bold text-zinc-500 mt-0.5">{overallScore}% SCORE</span>
        </div>
      </div>

      <p className="text-[11px] text-zinc-550 max-w-[200px] leading-relaxed font-mono">
        Complies with {getComplianceText(overallScore)} software principles.
      </p>
    </div>
  );
}
