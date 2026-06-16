'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult, ChatMessage } from '../types';
import { getQuickPrompts, getSimulatedResponse } from '../services/chat';
import MessageBubble from './chat/MessageBubble';
import ChatHeader from './chat/ChatHeader';
import ChatInput from './chat/ChatInput';

interface MentorChatProps {
  result: AnalysisResult;
}

let msgCounter = 0;
const nextId = () => {
  msgCounter += 1;
  return `msg-id-${msgCounter}`;
};

export default function MentorChat({ result }: MentorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'greet',
      sender: 'mentor',
      text: result.chatGreeting,
      timestamp: 'Session Started'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseData = getSimulatedResponse(text, result.repoName);
      const mentorMsg: ChatMessage = {
        id: nextId(),
        sender: 'mentor',
        text: responseData.response,
        code: responseData.code,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, mentorMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 flex flex-col h-[550px] font-mono text-xs card-hover">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages Window */}
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto p-5 space-y-5 bg-[#131D21]/20 scrollbar-thin"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="space-y-1.5 animate-pulse">
            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1">
              [AI_ARCHITECT]
            </div>
            <div className="rounded border border-[#243740] bg-zinc-950/20 px-3.5 py-3 text-zinc-650 font-semibold tracking-wider">
              typing...
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-5 pb-3.5 pt-2.5 shrink-0 flex flex-wrap gap-2 bg-[#18252C] border-t border-[#243740]/40">
        {getQuickPrompts(result.repoName).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isTyping}
            className="text-[9px] font-bold text-zinc-500 hover:text-accent bg-[#18252C] hover:bg-[#1C2C32] border border-[#243740] hover:border-accent px-2.5 py-1 rounded transition duration-200 cursor-pointer select-none uppercase tracking-wider"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form Footer */}
      <ChatInput onSubmit={handleSendMessage} isTyping={isTyping} />
    </div>
  );
}
