'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface AnalyzerLoadingProps {
  repoUrl: string;
  onFinished: () => void;
}

const LOG_MESSAGES = [
  { text: 'Connecting to github.com API endpoint...', delay: 400 },
  { text: 'Resolving repositories parameters...', delay: 800 },
  { text: 'Cloning file trees into local buffer memory...', delay: 1300 },
  { text: 'Scanning configuration items...', delay: 1800 },
  { text: 'Parsing Abstract Syntax Trees (AST)...', delay: 2300 },
  { text: 'Auditing authentication security configurations...', delay: 2800 },
  { text: 'Testing database pooling parameters...', delay: 3500 },
  { text: 'Analyzing concurrent read/write locks...', delay: 4200 },
  { text: 'Evaluating container setup properties...', delay: 4800 },
  { text: 'Compiling scorecard results...', delay: 5500 },
  { text: 'Generating comprehension quiz keys...', delay: 6200 },
  { text: 'Initializing Mentor chatbot logs...', delay: 6800 },
  { text: 'All audits complete. Initializing dashboard...', delay: 7200 }
];

export default function AnalyzerLoading({ repoUrl, onFinished }: AnalyzerLoadingProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 72);

    const timeouts = LOG_MESSAGES.map((msg, index) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, `[AUDIT] ${new Date().toLocaleTimeString()} - ${msg.text}`]);
        if (index === LOG_MESSAGES.length - 1) {
          setTimeout(() => {
            onFinished();
          }, 400);
        }
      }, msg.delay);
    });

    return () => {
      clearInterval(progressInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [onFinished]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
      {/* Monospaced Loading Indicator */}
      <div className="text-center mb-8 font-mono">
        <div className="text-accent text-sm font-extrabold uppercase tracking-widest animate-pulse">
          [ SCANNING_CODEBASE ]
        </div>
        <div className="text-[10px] text-zinc-500 mt-2 select-none truncate max-w-full">
          {repoUrl}
        </div>
      </div>

      {/* Progress Bar (Flat) */}
      <div className="w-full bg-[#18252C] border border-[#243740] rounded-lg h-2.5 mb-8 overflow-hidden">
        <div
          className="bg-accent h-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Terminal Output (Flat) */}
      <div className="w-full rounded-lg border border-[#243740] bg-[#18252C]/30 p-4 font-mono text-[10px] text-zinc-400 shadow-xl h-60 flex flex-col">
        <div className="flex items-center justify-between border-b border-[#243740]/55 pb-2.5 mb-3">
          <div className="flex items-center gap-2 text-zinc-500">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-bold uppercase tracking-wider">Audit Console</span>
          </div>
          <span className="text-accent font-bold">{progress}%</span>
        </div>
        
        <div className="flex-grow overflow-y-auto space-y-1.5 scrollbar-thin">
          {logs.length === 0 && (
            <div className="text-zinc-600 animate-pulse">{"// Booting analyzer engines..."}</div>
          )}
          {logs.map((log, index) => (
            <div
              key={index}
              className={`${
                index === logs.length - 1 ? 'text-zinc-200' : 'text-zinc-500'
              } break-all`}
            >
              {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
