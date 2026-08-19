'use client';

import React, { useEffect, useRef } from 'react';
import { AnalysisResult } from '../types';
import MessageBubble from './chat/MessageBubble';
import ChatHeader from './chat/ChatHeader';
import ChatInput from './chat/ChatInput';
import TypingIndicator from './chat/TypingIndicator';
import QuickPrompts from './chat/QuickPrompts';
import { useChatMessages } from '../hooks/useChatMessages';

interface MentorChatProps {
  result: AnalysisResult;
}

export default function MentorChat({ result }: MentorChatProps) {
  const { messages, isTyping, handleSendMessage } = useChatMessages(result);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="rounded-lg border border-border bg-panel/40 flex flex-col h-[550px] font-sans text-sm">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages Window */}
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto p-5 flex flex-col space-y-5 bg-[#131D21]/20 scrollbar-thin"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Quick Prompts Chips */}
      <QuickPrompts 
        repoName={result.repoName} 
        onSend={handleSendMessage} 
        disabled={isTyping} 
      />

      {/* Chat Input Area */}
      <ChatInput onSubmit={handleSendMessage} isTyping={isTyping} />
    </div>
  );
}
