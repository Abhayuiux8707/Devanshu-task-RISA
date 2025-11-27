import React, { useState, useEffect, useRef } from 'react';
import { WorkspaceMode, ChatMessage, AgentContext } from '../types';
import { initializeChat, sendMessageToAgent } from '../services/geminiService';
import { MessageSquare, Zap, Terminal, Bot } from './ui/Icons';

interface AgentSidebarProps {
  mode: WorkspaceMode;
  contextData: any;
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({ mode, contextData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when mode changes
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await initializeChat(mode, { mode, ...contextData });
        const greeting = getGreeting(mode);
        setMessages([{
          id: 'system-init',
          role: 'model',
          text: greeting,
          timestamp: new Date()
        }]);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    
    init();
  }, [mode]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getGreeting = (m: WorkspaceMode) => {
    switch (m) {
      case WorkspaceMode.QUEUE: return "Queue Manager Online. 3 critical tickets detected. How can I help sort them?";
      case WorkspaceMode.TICKET: return "Case Assistant Ready. I have analyzed the customer history. Need a draft?";
      case WorkspaceMode.ANALYTICS: return "Operations Analyst here. CSAT is stable. Query me for specific agent stats.";
      case WorkspaceMode.KNOWLEDGE: return "Knowledge Architect. I can draft articles or search documentation.";
      default: return "Riza Agent Online.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToAgent(userMsg.text);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 w-96 shrink-0 shadow-lg">
      {/* Header */}
      <div className="h-16 border-b border-slate-100 flex items-center px-4 justify-between bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-teal-600 font-bold">
          <Bot size={18} />
          <span>Riza Agent</span>
        </div>
        <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
          {mode}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
              }`}
            >
              <div className={`whitespace-pre-wrap font-mono text-[10px] mb-1 uppercase tracking-wider opacity-70 ${msg.role === 'user' ? 'text-teal-100' : 'text-slate-400'}`}>
                {msg.role === 'user' ? 'YOU' : 'RIZA'}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
             <div className="bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-none p-3 text-sm animate-pulse shadow-sm">
               <span className="font-mono text-xs text-teal-600">&gt; THINKING...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${mode.toLowerCase()} agent...`}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/10 resize-none h-24 font-sans placeholder-slate-400 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="absolute bottom-3 right-3 text-slate-400 hover:text-teal-600 disabled:opacity-50 transition-colors"
          >
            <Terminal size={18} />
          </button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
           {/* Quick Prompts based on Mode */}
           {mode === WorkspaceMode.QUEUE && (
             <button onClick={() => setInputValue("Identify tickets with anger sentiment > 0.7")} className="whitespace-nowrap px-3 py-1 bg-slate-50 hover:bg-slate-100 text-xs rounded-full border border-slate-200 text-slate-600 transition-colors">Find Urgent</button>
           )}
           {mode === WorkspaceMode.TICKET && (
             <button onClick={() => setInputValue("Draft a polite apology for the delay")} className="whitespace-nowrap px-3 py-1 bg-slate-50 hover:bg-slate-100 text-xs rounded-full border border-slate-200 text-slate-600 transition-colors">Draft Apology</button>
           )}
           {mode === WorkspaceMode.ANALYTICS && (
              <button onClick={() => setInputValue("Summarize CSAT trends for this week")} className="whitespace-nowrap px-3 py-1 bg-slate-50 hover:bg-slate-100 text-xs rounded-full border border-slate-200 text-slate-600 transition-colors">CSAT Summary</button>
           )}
        </div>
      </div>
    </div>
  );
};

export default AgentSidebar;