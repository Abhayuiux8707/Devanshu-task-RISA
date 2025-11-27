import React from 'react';
import { Mail, Phone, MessageSquare, Send, Bot, Sparkles, Zap, CheckCircle2, AlertTriangle, BookOpen, Clock, XCircle, Database, FileText, Image, Paperclip, Search, Plus } from '../ui/Icons';

const TicketWorkspace: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden bg-white flex flex-col relative font-sans min-h-0">
       
       {/* 4.1 TicketTabs - Advanced States */}
       <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-end px-2 gap-1 overflow-x-auto no-scrollbar shrink-0">
           {/* Active Ticket */}
           <div className="px-4 py-2 bg-white border-t border-l border-r border-slate-200 rounded-t-lg text-xs font-bold text-slate-800 flex items-center gap-2 min-w-[160px] shadow-sm relative z-10 group cursor-default">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
               <span className="truncate max-w-[100px]">Ticket #4492</span>
               {/* AI Ready Indicator */}
               <span className="ml-auto text-teal-500" title="AI Draft Ready"><Sparkles size={10}/></span>
               <button className="text-slate-300 hover:text-slate-500 transition-colors ml-1"><XCircle size={12}/></button>
               {/* Active Line */}
               <div className="absolute top-0 left-0 w-full h-0.5 bg-teal-500 rounded-t-lg"></div>
           </div>

           {/* Background Ticket - Unsaved Changes */}
           <div className="px-4 py-2 bg-slate-200/50 border border-transparent rounded-t-lg text-xs font-medium text-slate-500 flex items-center gap-2 min-w-[140px] hover:bg-slate-200 transition-colors cursor-pointer group">
               <span className="truncate max-w-[100px]">Ticket #4490</span>
               <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" title="Unsaved Changes"></div>
               <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity"><XCircle size={12}/></button>
           </div>

           {/* Background Ticket - Normal */}
           <div className="px-4 py-2 bg-slate-200/50 border border-transparent rounded-t-lg text-xs font-medium text-slate-500 flex items-center gap-2 min-w-[140px] hover:bg-slate-200 transition-colors cursor-pointer group">
               <span className="truncate max-w-[100px]">Acme Renewal</span>
               <button className="opacity-0 group-hover:opacity-100 ml-auto text-slate-400 hover:text-slate-600 transition-opacity"><XCircle size={12}/></button>
           </div>
           
           <button className="px-2 py-2 text-slate-400 hover:text-slate-600"><Plus size={16}/></button>
       </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* 4.2 ConversationView */}
        <div className="flex-1 flex flex-col relative bg-slate-50/30 min-h-0">
            {/* Thread Header */}
            <div className="h-14 border-b border-slate-200 flex items-center px-6 justify-between bg-white z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <h2 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                        Ticket #4492: Refund Request
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold border border-red-100 uppercase">Critical</span>
                    </h2>
                    <span className="text-slate-400 text-xs flex items-center gap-1"><Mail size={12}/> via Email</span>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 hover:bg-slate-100 rounded border border-slate-200 text-slate-600 text-xs font-medium transition-colors">Mark Resolved</button>
                    <button className="px-3 py-1.5 hover:bg-slate-100 rounded border border-slate-200 text-slate-600 text-xs font-medium transition-colors">Escalate</button>
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
                            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-md shadow-teal-500/20 flex items-center gap-2 transition-colors">
                                <Send size={14}/> Approve & Send
                            </button>
                            <button className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold rounded-lg transition-colors shadow-sm">
                                Edit Draft
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area with Vision Input */}
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
                            {/* 7.4 Vision Input Trigger */}
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

        {/* 4.3 ToolStrip */}
        <div className="w-14 bg-white border-l border-slate-200 flex flex-col items-center py-4 gap-4 z-10 shrink-0">
            {/* Auto-Open Tool (Active) */}
            <button className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm relative group" title="CRM">
                <Database size={18}/>
                <span className="absolute left-full ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">CRM</span>
            </button>
            
            <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors relative group" title="Knowledge Base">
                <BookOpen size={18}/>
                <span className="absolute left-full ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">KB</span>
            </button>
            
            <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors relative group" title="Logs">
                <FileText size={18}/>
                <span className="absolute left-full ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">Logs</span>
            </button>
            
            <div className="h-px w-8 bg-slate-200 my-2"></div>
            
            <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-colors relative group" title="History">
                <Clock size={18}/>
                <span className="absolute left-full ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">History</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default TicketWorkspace;