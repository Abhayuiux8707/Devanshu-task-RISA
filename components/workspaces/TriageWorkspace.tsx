import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Bot, Sparkles, Zap, CheckCircle2, AlertTriangle, BookOpen, Clock, XCircle, Database, FileText, Image, Paperclip, Search, Plus, Loader2 } from '../ui/Icons';
import { WorkspaceMode, WorkspaceProps } from '../../types';
import { searchKnowledgeBase } from '../../services/geminiService';

const TicketWorkspace: React.FC<WorkspaceProps> = ({ onNavigate }) => {
  const [ticketState, setTicketState] = useState<'draft' | 'sending' | 'sent'>('draft');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolContent, setToolContent] = useState<string>("");
  const [kbQuery, setKbQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSend = () => {
      setTicketState('sending');
      setTimeout(() => setTicketState('sent'), 1500);
  };

  const handleToolClick = async (tool: string) => {
      if (activeTool === tool) {
          setActiveTool(null);
          return;
      }
      setActiveTool(tool);
      setToolContent("Loading data...");
      
      if (tool === 'CRM') {
          setTimeout(() => setToolContent("Customer: Acme Corp\nARR: $120,000\nRenewal: Nov 2024\nTech Stack: AWS, React, Node.js"), 500);
      } else if (tool === 'Logs') {
          setTimeout(() => setToolContent("User ID: 8821\nError 502 Bad Gateway @ 10:41 AM\nRegion: us-east-1\nTrace ID: req-9921-aa"), 500);
      } else if (tool === 'KB') {
          setToolContent(""); // Allow manual search
      }
  };

  const handleKBSearch = async () => {
      if (!kbQuery) return;
      setIsSearching(true);
      const result = await searchKnowledgeBase(kbQuery);
      setToolContent(result);
      setIsSearching(false);
  };

  return (
    <div className="flex-1 overflow-hidden bg-white flex flex-col relative font-sans min-h-0">
       
       {/* 4.1 TicketTabs - Advanced States */}
       <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-end px-2 gap-1 overflow-x-auto no-scrollbar shrink-0">
           {/* Active Ticket */}
           <div className="px-4 py-2 bg-white border-t border-l border-r border-slate-200 rounded-t-lg text-xs font-bold text-slate-800 flex items-center gap-2 min-w-[160px] shadow-sm relative z-10 group cursor-default">
               <div className={`w-2 h-2 rounded-full ${ticketState === 'sent' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
               <span className="truncate max-w-[100px]">Ticket #4492</span>
               {/* AI Ready Indicator */}
               <span className="ml-auto text-teal-500" title="AI Draft Ready"><Sparkles size={10}/></span>
               <button onClick={() => onNavigate(WorkspaceMode.QUEUE)} className="text-slate-300 hover:text-slate-500 transition-colors ml-1"><XCircle size={12}/></button>
               {/* Active Line */}
               <div className="absolute top-0 left-0 w-full h-0.5 bg-teal-500 rounded-t-lg"></div>
           </div>

           {/* Background Ticket - Unsaved Changes */}
           <div className="px-4 py-2 bg-slate-200/50 border border-transparent rounded-t-lg text-xs font-medium text-slate-500 flex items-center gap-2 min-w-[140px] hover:bg-slate-200 transition-colors cursor-pointer group">
               <span className="truncate max-w-[100px]">Ticket #4490</span>
               <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" title="Unsaved Changes"></div>
               <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity"><XCircle size={12}/></button>
           </div>
       </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* 4.2 ConversationView */}
        <div className="flex-1 flex flex-col relative bg-slate-50/30 min-h-0">
            {/* Thread Header */}
            <div className="h-14 border-b border-slate-200 flex items-center px-6 justify-between bg-white z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                        Ticket #4492: Refund Request
                        {ticketState !== 'sent' && <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 uppercase">Critical</span>}
                        {ticketState === 'sent' && <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold border border-green-100 uppercase">Resolved</span>}
                    </h2>
                    <span className="text-slate-400 text-xs flex items-center gap-1"><Mail size={12}/> via Email</span>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 hover:bg-slate-100 rounded border border-slate-200 text-slate-600 text-xs font-medium transition-colors">Mark Resolved</button>
                    <button onClick={() => onNavigate(WorkspaceMode.ESCALATION)} className="px-3 py-1.5 hover:bg-slate-100 rounded border border-slate-200 text-slate-600 text-xs font-medium transition-colors flex items-center gap-1">
                        <AlertTriangle size={12}/> Escalate
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Customer Message */}
                <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200 shadow-sm shrink-0">JD</div>
                    <div className="flex-1 max-w-3xl">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-slate-900">John Doe (Acme Corp)</span>
                            <span className="text-xs text-slate-400">10:42 AM</span>
                        </div>
                        <div className="bg-white p-5 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-700 leading-relaxed shadow-sm group-hover:shadow-md transition-shadow">
                            <p>Hi,</p>
                            <p className="mt-2">I am extremely frustrated. We've had downtime three times this week. This is unacceptable for the price we are paying. I want a partial refund for this month's billing immediately, or we will look for other providers.</p>
                            <p className="mt-2">Fix this.</p>
                        </div>
                        
                        {/* 6.1 Triage Agent Output */}
                        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-200 flex items-center gap-1"><AlertTriangle size={10}/> Sentiment: Negative (-0.8)</span>
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-200">Category: Billing</span>
                        </div>
                    </div>
                </div>

                {/* System / AI Event Card */}
                <div className="flex justify-center">
                    <div className="bg-slate-100 rounded-full px-4 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wide border border-slate-200 flex items-center gap-2">
                        <Zap size={10} className="text-amber-500"/>
                        Playbook "Churn Risk" Auto-Triggered
                    </div>
                </div>

                {/* 6.2 Reply Copilot Draft */}
                {ticketState !== 'sent' ? (
                    <div className="flex gap-4 opacity-100">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold border border-teal-200 shadow-sm shrink-0">
                            <Bot size={20} />
                        </div>
                        <div className="flex-1 max-w-3xl">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold text-teal-600 flex items-center gap-2">Risa Draft <Sparkles size={12}/></span>
                            </div>
                            <div className="bg-white p-5 rounded-2xl rounded-tl-none border-2 border-teal-100 text-sm text-slate-700 leading-relaxed relative overflow-hidden shadow-sm">
                                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                                <p>Hi John,</p>
                                <p className="mt-2">I completely understand your frustration, and I sincerely apologize for the interruptions you've experienced this week. We know how critical uptime is for your business.</p>
                                <p className="mt-2">I have escalated this to our engineering team to ensure stability. Regarding the refund, I have applied a 20% credit to your account for this month as a gesture of goodwill.</p>
                                <p className="mt-2">We value you as an Enterprise partner and are committed to doing better.</p>
                            </div>
                            <div className="flex gap-3 mt-3">
                                <button 
                                    onClick={handleSend}
                                    disabled={ticketState === 'sending'}
                                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-md shadow-teal-500/20 flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {ticketState === 'sending' ? <Loader2 size={14} className="animate-spin"/> : <Send size={14}/>}
                                    {ticketState === 'sending' ? 'Sending...' : 'Approve & Send'}
                                </button>
                                <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold rounded-lg transition-colors shadow-sm">
                                    Edit Draft
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center my-8">
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={24} />
                            </div>
                            <span className="text-sm font-bold text-green-700">Reply Sent Successfully</span>
                            <span className="text-xs">10:43 AM via Email</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                <div className="relative border border-slate-200 rounded-xl bg-slate-50 focus-within:bg-white focus-within:border-teal-500/50 transition-colors shadow-sm">
                    <textarea 
                        className="w-full bg-transparent p-3 text-sm focus:outline-none resize-none h-16"
                        placeholder="Type a reply or command..."
                    />
                    <div className="flex items-center justify-between px-3 pb-2">
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors" title="Attach File">
                                <Paperclip size={16}/>
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-teal-600 rounded hover:bg-teal-50 transition-colors flex items-center gap-1" title="Analyze Screenshot">
                                <Image size={16}/>
                            </button>
                        </div>
                        <button className="p-1.5 bg-slate-200 text-slate-400 rounded-lg text-xs font-bold px-3 hover:bg-teal-600 hover:text-white transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 4.3 ToolStrip & Side Panel */}
        <div className="flex shrink-0 z-20 h-full">
            {/* Expanded Tool Panel */}
            {activeTool && (
                <div className="w-72 bg-white border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-sm text-slate-700">{activeTool === 'KB' ? 'Knowledge Base' : activeTool}</h3>
                        <button onClick={() => setActiveTool(null)}><XCircle size={16} className="text-slate-400 hover:text-slate-600"/></button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                        {activeTool === 'KB' ? (
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input 
                                        className="w-full text-xs border border-slate-200 rounded p-2" 
                                        placeholder="Search docs..." 
                                        value={kbQuery}
                                        onChange={(e) => setKbQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleKBSearch()}
                                    />
                                    <button onClick={handleKBSearch} className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700">
                                        {isSearching ? <Loader2 size={12} className="animate-spin"/> : <Search size={12}/>}
                                    </button>
                                </div>
                                <div className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed mt-4">
                                    {toolContent || "Search for a policy or troubleshooting guide."}
                                </div>
                            </div>
                        ) : (
                            <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono bg-slate-50 p-2 rounded border border-slate-100">
                                {toolContent}
                            </pre>
                        )}
                    </div>
                </div>
            )}

            {/* Icons Rail */}
            <div className="w-14 bg-white border-l border-slate-200 flex flex-col items-center py-4 gap-4 z-10">
                <button 
                    onClick={() => handleToolClick('CRM')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border shadow-sm relative group ${activeTool === 'CRM' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`} 
                    title="CRM"
                >
                    <Database size={18}/>
                </button>
                
                <button 
                    onClick={() => handleToolClick('KB')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border shadow-sm relative group ${activeTool === 'KB' ? 'bg-teal-100 text-teal-600 border-teal-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    title="Knowledge Base"
                >
                    <BookOpen size={18}/>
                </button>
                
                <button 
                    onClick={() => handleToolClick('Logs')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors border shadow-sm relative group ${activeTool === 'Logs' ? 'bg-amber-100 text-amber-600 border-amber-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                    title="Logs"
                >
                    <FileText size={18}/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TicketWorkspace;