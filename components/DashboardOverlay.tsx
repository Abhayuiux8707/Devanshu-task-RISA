import React, { useState, useEffect } from 'react';
import { WorkspaceMode } from '../types';
import LeftRail from './LeftRail';
import RightRail from './RightRail';
import QueueWorkspace from './workspaces/ExperimentWorkspace'; 
import TicketWorkspace from './workspaces/TriageWorkspace'; 
import AnalyticsWorkspace from './workspaces/ReleaseWorkspace'; 
import EscalationWorkspace from './workspaces/EscalationWorkspace';
import { Search, ArrowLeft, Bot, Command } from './ui/Icons';

interface DashboardOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode: WorkspaceMode;
}

const DashboardOverlay: React.FC<DashboardOverlayProps> = ({ isOpen, onClose, initialMode }) => {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>(initialMode);
  const [intentState, setIntentState] = useState<'idle' | 'listening' | 'processing'>('idle');

  useEffect(() => {
    if (isOpen) {
        setActiveMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Simulated context data that changes based on view
  const getContextData = () => {
    switch (activeMode) {
      case WorkspaceMode.QUEUE:
        return { queueLength: 32, urgentCount: 3, averageSentiment: 0.4 };
      case WorkspaceMode.TICKET:
        return { ticketId: '#4492', customer: 'Acme Corp', tier: 'Enterprise', sentiment: -0.6 };
      case WorkspaceMode.ANALYTICS:
        return { csat: 4.2, responseTime: '45m', trend: 'down' };
      case WorkspaceMode.ESCALATION:
        return { incidentId: 'new', severity: 'high' };
      default:
        return {};
    }
  };

  const renderWorkspace = () => {
    switch (activeMode) {
      case WorkspaceMode.QUEUE:
        return <QueueWorkspace />; 
      case WorkspaceMode.TICKET:
        return <TicketWorkspace />; 
      case WorkspaceMode.ANALYTICS:
        return <AnalyticsWorkspace />; 
      case WorkspaceMode.ESCALATION:
        return <EscalationWorkspace />;
      case WorkspaceMode.KNOWLEDGE:
        return <div className="flex-1 bg-slate-50 flex items-center justify-center text-slate-400">Knowledge Base Indexing...</div>;
      default:
        return <QueueWorkspace />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-slate-50 text-slate-800 font-sans flex flex-col animate-in slide-in-from-bottom-20 fade-in duration-500">
      
      {/* Top Bar (Browser Shell) */}
      <div className="h-14 flex items-center px-4 justify-between shrink-0 z-30 bg-white border-b border-slate-200 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to New Tab"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="h-6 w-px bg-slate-200"></div>

          <div className="flex items-center gap-2">
             <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <Bot size={16} className="text-white"/>
             </div>
             <span className="font-bold text-slate-900 tracking-tight hidden md:inline">Riza</span>
          </div>
        </div>

        {/* Intent Bar (Command Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl top-1/2 -translate-y-1/2">
             <div className={`relative group transition-all duration-300 ${intentState !== 'idle' ? 'scale-105' : ''}`}>
                 <div className={`absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-lg blur-md opacity-0 transition-opacity ${intentState !== 'idle' ? 'opacity-100' : 'group-focus-within:opacity-50'}`}></div>
                 <div className="relative flex items-center bg-slate-100 border border-slate-200 rounded-lg overflow-hidden group-focus-within:bg-white group-focus-within:border-teal-500/50 group-focus-within:shadow-md transition-all">
                     <div className="pl-3 text-slate-400 group-focus-within:text-teal-600">
                         {intentState === 'listening' ? <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> : <Command size={14} />}
                     </div>
                     <input 
                         type="text" 
                         placeholder="Describe a task, search, or enter a command..." 
                         onFocus={() => setIntentState('listening')}
                         onBlur={() => setIntentState('idle')}
                         className="w-full bg-transparent border-none py-1.5 px-3 text-sm text-slate-800 focus:outline-none placeholder-slate-400"
                     />
                     <div className="pr-3 flex items-center gap-2">
                         {intentState === 'listening' && <span className="text-[10px] text-teal-600 font-bold uppercase animate-pulse">Listening</span>}
                         <span className="text-[10px] text-slate-400 font-mono border border-slate-200 rounded px-1.5 bg-white">/</span>
                     </div>
                 </div>
             </div>
        </div>

        {/* User / Status */}
        <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-2 py-1 bg-green-50 rounded border border-green-100">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-green-700 uppercase">Online</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                 <div className="w-full h-full bg-gradient-to-tr from-slate-300 to-slate-100"></div>
             </div>
        </div>
      </div>

      {/* 3-Column Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Rail */}
        <LeftRail currentMode={activeMode} onNavigate={setActiveMode} />

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative z-0 shadow-inner">
            {renderWorkspace()}
        </div>

        {/* Right Rail */}
        <RightRail mode={activeMode} contextData={getContextData()} />
      </div>
    </div>
  );
};

export default DashboardOverlay;