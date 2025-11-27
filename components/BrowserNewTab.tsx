import React from 'react';
import { Search, Globe, Plus, Command, Sparkles, ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, MessageSquare, Users, BookOpen, Smile, Bot, Inbox, Activity } from './ui/Icons';
import { WorkspaceMode } from '../types';

interface BrowserNewTabProps {
  onNavigate: (mode: WorkspaceMode) => void;
}

const BrowserNewTab: React.FC<BrowserNewTabProps> = ({ onNavigate }) => {
  const quickLinks = [
    { name: "Zendesk", icon: <MessageSquare size={18} />, color: "bg-green-100 text-green-600 border-green-200" },
    { name: "Salesforce", icon: <Users size={18} />, color: "bg-blue-100 text-blue-600 border-blue-200" },
    { name: "Intercom", icon: <Smile size={18} />, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
    { name: "Confluence", icon: <BookOpen size={18} />, color: "bg-sky-100 text-sky-600 border-sky-200" },
  ];

  const suggestions = [
    { icon: <AlertTriangle size={12} className="text-red-500" />, text: "3 Urgent Enterprise Tickets", mode: WorkspaceMode.QUEUE },
    { icon: <Bot size={12} className="text-teal-600" />, text: "Review Draft for Ticket #4492", mode: WorkspaceMode.TICKET },
    { icon: <Activity size={12} className="text-yellow-600" />, text: "CSAT dropped 5% in EMEA", mode: WorkspaceMode.ANALYTICS },
  ];

  return (
    <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col font-sans">
      {/* Browser Chrome */}
      <div className="h-10 bg-white border-b border-slate-200 flex items-center px-4 gap-4 w-full z-10 shrink-0 shadow-sm">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300"></div>
         </div>
         
         {/* Navigation Controls */}
         <div className="flex gap-3 text-slate-400">
            <button className="hover:text-slate-600 transition-colors"><ArrowLeft size={16} /></button>
            <button className="hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed"><ArrowRight size={16} /></button>
            <button className="hover:text-slate-600 transition-colors"><RotateCcw size={14} /></button>
         </div>

         {/* URL Bar */}
         <div className="flex-1 max-w-2xl mx-auto bg-slate-100 rounded-lg h-7 flex items-center px-3 text-xs text-slate-500 border border-transparent font-mono group hover:border-teal-500/50 hover:bg-white transition-all cursor-text shadow-inner">
            <Globe size={12} className="mr-2 text-teal-600 group-hover:text-teal-500 transition-colors"/>
            <span className="text-slate-400">riza://</span>
            <span className="text-slate-600">support.dashboard</span>
         </div>
         <div className="w-20"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
         
         {/* Background Decoration */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
         </div>

         <div className="z-10 w-full max-w-2xl flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4 animate-fade-in-down">
                <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Bot size={40} className="text-slate-400 group-hover:text-teal-500 transition-colors duration-500" />
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Riza Support AI</h1>
                <p className="text-slate-500">How can I assist you today?</p>
            </div>

            <div className="w-full relative group flex flex-col gap-5 animate-fade-in-up delay-100">
                {/* Search Bar */}
                <div className="relative w-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-xl z-10 transition-transform focus-within:scale-[1.01]">
                        <div className="pl-4 text-teal-600">
                            <Command size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search tickets, customers, or knowledge base..." 
                            className="w-full bg-transparent p-4 text-slate-900 focus:outline-none placeholder-slate-400"
                        />
                        <div className="pr-4 text-xs text-slate-400 font-mono border-l border-slate-100 pl-4 py-1">
                            CMD+K
                        </div>
                    </div>
                </div>

                {/* AI Suggestions Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 px-4">
                    {suggestions.map((item, idx) => (
                        <button 
                            key={idx}
                            onClick={() => onNavigate(item.mode)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-500 hover:border-teal-500/50 hover:text-teal-700 hover:bg-teal-50 transition-all cursor-pointer active:scale-95 group shadow-sm"
                        >
                            <span className="opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                            <span>{item.text}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 mt-8 animate-fade-in-up delay-200">
                {quickLinks.map((link, i) => (
                    <button key={i} className={`flex flex-col items-center justify-center w-24 h-24 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all gap-3 group relative overflow-hidden`}>
                         <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${link.color.split(' ')[0]} opacity-20`}></div>
                        <div className="group-hover:scale-110 transition-transform duration-300 text-slate-400 group-hover:text-slate-600">{link.icon}</div>
                        <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700">{link.name}</span>
                    </button>
                ))}
                <button className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl border border-dashed border-slate-300 text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all gap-3 hover:bg-white">
                    <Plus size={18} />
                    <span className="text-xs font-medium">Add App</span>
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BrowserNewTab;