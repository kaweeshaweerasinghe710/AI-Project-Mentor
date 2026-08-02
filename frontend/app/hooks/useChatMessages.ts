import { useState, useEffect } from 'react';
import { AnalysisResult, ChatMessage } from '../types';

let msgCounter = 0;
const nextId = () => {
  msgCounter += 1;
  return `msg-id-${msgCounter}`;
};

export function useChatMessages(result: AnalysisResult) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'greet',
      sender: 'mentor',
      text: result.chatGreeting,
      timestamp: 'Session Started'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
      setIsTyping(false);
    }
  };

  return { messages, isTyping, handleSendMessage };
}
