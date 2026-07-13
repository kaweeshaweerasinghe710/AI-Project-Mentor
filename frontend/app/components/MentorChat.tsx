'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnalysisResult, ChatMessage } from '../types';
import { getQuickPrompts } from '../services/chat';
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
    const loadChatHistory = async () => {
      if (!result.id) return;
      try {
        const token = localStorage.getItem('user_token');
        const response = await fetch(`http://localhost:5000/api/chat/${result.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch chat history');
        
        const data = await response.json();

        
        if (data && data.length > 0) {
          const mappedHistory: ChatMessage[] = data.map((msg: any) => ({
            id: msg.id,
            sender: msg.role === 'user' ? 'user' : 'mentor',
            text: msg.content,
            timestamp: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));

          
          setMessages([
            {
              id: 'greet',
              sender: 'mentor',
              text: result.chatGreeting,
              timestamp: 'Session Started'
            },
            ...mappedHistory
          ]);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    };

    loadChatHistory();
  }, [result.id, result.chatGreeting]);

  
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !result.id) return;

    
    const userMsg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const token = localStorage.getItem('user_token');
      
      
      const response = await fetch(`http://localhost:5000/api/chat/${result.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to send message');
      }

      const data = await response.json();

     
      const mentorMsg: ChatMessage = {
        id: nextId(),
        sender: 'mentor',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (error: any) {
      console.error(error);
      
      
      const errorMsg: ChatMessage = {
        id: nextId(),
        sender: 'mentor',
        text: `[SYSTEM_ERROR] Failed to contact AI Architect. Details: ${error.message || error}`,
        timestamp: 'Error'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(true); // reset
      setIsTyping(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#243740] bg-[#18252C]/40 flex flex-col h-[550px] font-mono text-xs card-hover">
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