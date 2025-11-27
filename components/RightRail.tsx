import React, { useState, useRef, useEffect } from 'react';
import { WorkspaceMode, ChatMessage, AgentContext } from '../types';
import { initializeChat, sendMessageToAgent } from '../services/geminiService';
import { Bot, User, CheckCircle2, Send, Sparkles, BookOpen, Clock, Activity, BarChart2 } from './ui/Icons';
import RizaAvatar from './ui/RizaAvatar';

interface RightRailProps {
  mode: WorkspaceMode;
  contextData: any;
}

const RightRail: React.FC<RightRailProps> = ({ mode, contextData }) => {
  const [activeTab, setActiveTab] = useState<'copilot' | '360' | 'playbooks' | 'analytics'>('copilot');
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const getGreeting = (m: WorkspaceMode) => {
    switch (m) {
      case WorkspaceMode.QUEUE: return "Queue Intelligence Active. Detecting 3 anomalies in ticket volume.";
      case WorkspaceMode.TICKET: return "Copilot Ready. I've drafted a reply based on the SLA policy.";
      case WorkspaceMode.ESCALATION: return "Escalation Protocols Loaded. Please provide the incident summary.";
      default: return "Risa Agent Online.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    try {
      const responseText = await sendMessageToAgent(userMsg.text);
      const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
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

  // --- Render Tabs Content ---

  const renderCopilot = () => (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'}`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.role === 'user' ? 'You' : 'Risa AI'}</span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-2">
             <RizaAvatar size="sm" withPulse />
             <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 text-xs text-slate-500 shadow-sm">
               Thinking...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Copilot..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-10 text-sm text-slate-800 focus:outline-none focus:border-teal-500/50 resize-none h-20 placeholder-slate-400"
          />
          <button onClick={handleSend} disabled={isLoading || !inputValue.trim()} className="absolute bottom-3 right-3 text-teal-600 hover:text-teal-700 disabled:opacity-30">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const render360 = () => (
    <div className="p-6 overflow-y-auto h-full bg-white">
        <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md mb-3">
                AC
            </div>
            <h3 className="text-lg font-bold text-slate-900">Acme Corp</h3>
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold mt-1">ENTERPRISE</span>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Health Score</h4>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full border-4 border-yellow-400 flex items-center justify-center font-bold text-slate-700">72</div>
                   <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">At Risk</div>
                      <div className="text-xs text-slate-500">Dropped 5pts this week</div>
                   </div>
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Metrics</h4>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm p-2 hover:bg-slate-50 rounded">
                        <span className="text-slate-500">ARR</span>
                        <span className="text-slate-900 font-mono font-bold">$120,000</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 hover:bg-slate-50 rounded">
                        <span className="text-slate-500">CSAT (L90D)</span>
                        <span className="text-slate-900 font-bold">4.2/5.0</span>
                    </div>
                    <div className="flex justify-between text-sm p-2 hover:bg-slate-50 rounded">
                        <span className="text-slate-500">Open Tickets</span>
                        <span className="text-slate-900 font-bold">3</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderPlaybooks = () => (
    <div className="p-4 h-full bg-slate-50 overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen size={16} className="text-teal-600"/> Active Playbook
        </h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
             <div className="p-3 bg-teal-50 border-b border-teal-100 flex justify-between items-center">
                <span className="text-xs font-bold text-teal-800">SLA Breach Mitigation</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded text-teal-600 font-bold">RUNNING</span>
             </div>
             <div className="divide-y divide-slate-100">
                 {[
                     { step: "Analyze Severity", status: "done", time: "2m ago" },
                     { step: "Check Status Page", status: "done", time: "1m ago" },
                     { step: "Draft Apology", status: "current", time: "Now" },
                     { step: "Notify Account Mgr", status: "pending", time: "" },
                     { step: "Apply Credit", status: "pending", time: "" }
                 ].map((s, i) => (
                     <div key={i} className={`p-3 flex items-start gap-3 ${s.status === 'current' ? 'bg-teal-50/30' : ''}`}>
                         <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${
                             s.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 
                             s.status === 'current' ? 'bg-white border-teal-500 text-teal-600 animate-pulse' : 
                             'bg-slate-100 border-slate-300 text-slate-300'
                         }`}>
                             {s.status === 'done' && <CheckCircle2 size={12}/>}
                             {s.status === 'current' && <div className="w-2 h-2 bg-teal-500 rounded-full"></div>}
                         </div>
                         <div className="flex-1">
                             <div className={`text-sm ${s.status === 'done' ? 'text-slate-500 line-through' : s.status === 'current' ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                                 {s.step}
                             </div>
                             {s.time && <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1"><Clock size={8}/> {s.time}</div>}
                         </div>
                     </div>
                 ))}
             </div>
             <div className="p-3 bg-slate-50 border-t border-slate-100">
                 <button className="w-full py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors">
                     View Full Workflow
                 </button>
             </div>
        </div>
    </div>
  );

  const renderAnalytics = () => (
      <div className="p-4 h-full bg-slate-50 overflow-y-auto">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-teal-600"/> Session Stats
          </h3>
          <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">Handling Time</div>
                  <div className="text-2xl font-bold text-slate-800">4m 12s</div>
                  <div className="text-xs text-green-600 font-bold mt-1">-30s vs Avg</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">AI Usage</div>
                  <div className="text-2xl font-bold text-slate-800">85%</div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                      <div className="bg-teal-500 h-1.5 rounded-full w-[85%]"></div>
                  </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs text-slate-500 uppercase font-bold mb-1">Sentiment Shift</div>
                  <div className="flex items-center justify-between">
                      <span className="text-red-500 font-bold text-sm">Negative</span>
                      <span className="text-slate-300">→</span>
                      <span className="text-green-500 font-bold text-sm">Neutral</span>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 w-80 shrink-0 z-20">
      {/* Tabs Header */}
      <div className="h-12 border-b border-slate-200 flex items-center bg-white">
          <button 
            onClick={() => setActiveTab('copilot')}
            className={`flex-1 h-full flex items-center justify-center transition-colors border-b-2 ${activeTab === 'copilot' ? 'text-teal-600 border-teal-600 bg-teal-50/50' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
            title="Copilot"
          >
            <Bot size={16}/>
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button 
            onClick={() => setActiveTab('360')}
            className={`flex-1 h-full flex items-center justify-center transition-colors border-b-2 ${activeTab === '360' ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
            title="Customer 360"
          >
            <User size={16}/>
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button 
            onClick={() => setActiveTab('playbooks')}
            className={`flex-1 h-full flex items-center justify-center transition-colors border-b-2 ${activeTab === 'playbooks' ? 'text-purple-600 border-purple-600 bg-purple-50/50' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
            title="Playbooks"
          >
            <Sparkles size={16}/>
          </button>
          <div className="w-px h-4 bg-slate-200"></div>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 h-full flex items-center justify-center transition-colors border-b-2 ${activeTab === 'analytics' ? 'text-orange-600 border-orange-600 bg-orange-50/50' : 'text-slate-400 border-transparent hover:bg-slate-50'}`}
            title="Session Analytics"
          >
            <BarChart2 size={16}/>
          </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
          {activeTab === 'copilot' && renderCopilot()}
          {activeTab === '360' && render360()}
          {activeTab === 'playbooks' && renderPlaybooks()}
          {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default RightRail;