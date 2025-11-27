import React from 'react';
import { 
  Inbox, Users, AlertTriangle, Command, Layers, 
  MessageSquare, Phone, Mail, Hash, Star, Plus 
} from './ui/Icons';
import { WorkspaceMode } from '../types';

interface LeftRailProps {
  currentMode: WorkspaceMode;
  onNavigate: (mode: WorkspaceMode) => void;
}

const LeftRail: React.FC<LeftRailProps> = ({ currentMode, onNavigate }) => {
  const queues = [
    { label: 'My Tickets', icon: <Inbox size={16} />, count: 5, active: currentMode === WorkspaceMode.TICKET },
    { label: 'Team Queue', icon: <Users size={16} />, count: 12, active: currentMode === WorkspaceMode.QUEUE },
    { label: 'Escalations', icon: <AlertTriangle size={16} />, count: 3, active: currentMode === WorkspaceMode.ESCALATION, isUrgent: true },
    { label: 'Macros', icon: <Command size={16} />, count: 0, active: false },
  ];

  const channels = [
    { label: 'Email', icon: <Mail size={14} />, active: true },
    { label: 'Chat', icon: <MessageSquare size={14} />, active: true },
    { label: 'Phone', icon: <Phone size={14} />, active: false },
    { label: 'Slack', icon: <Hash size={14} />, active: false },
  ];

  const views = [
    'Churn Risk > 80%',
    'Enterprise SLA',
    'Pending Engineering',
  ];

  return (
    <div className="w-60 bg-slate-50 border-r border-slate-200 flex flex-col h-full font-sans">
      {/* Queue Nav */}
      <div className="p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Queues</h3>
        <div className="space-y-1">
          {queues.map((q, i) => (
            <button
              key={i}
              onClick={() => q.label === 'Escalations' ? onNavigate(WorkspaceMode.ESCALATION) : q.label === 'Team Queue' ? onNavigate(WorkspaceMode.QUEUE) : onNavigate(WorkspaceMode.TICKET)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group ${
                q.active 
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${q.active ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'} ${q.isUrgent ? 'text-red-500' : ''}`}>
                  {q.icon}
                </span>
                <span className="font-medium">{q.label}</span>
              </div>
              {q.count > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  q.isUrgent 
                    ? 'bg-red-100 text-red-600' 
                    : q.active ? 'bg-teal-50 text-teal-600' : 'bg-slate-200 text-slate-500'
                }`}>
                  {q.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200 mx-4 my-2"></div>

      {/* Channel Filters */}
      <div className="p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Channels</h3>
        <div className="flex flex-wrap gap-2 px-1">
          {channels.map((c, i) => (
            <button 
              key={i}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-all ${
                c.active 
                  ? 'bg-white border-slate-300 text-slate-700 shadow-sm' 
                  : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-100'
              }`}
            >
              {c.icon}
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-200 mx-4 my-2"></div>

      {/* Saved Views */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saved Views</h3>
            <button className="text-slate-400 hover:text-teal-600"><Plus size={14}/></button>
        </div>
        <div className="space-y-1">
          {views.map((v, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors text-left group">
              <Star size={14} className="text-slate-300 group-hover:text-yellow-400 transition-colors" />
              <span className="truncate">{v}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom Action */}
      <div className="p-4 border-t border-slate-200">
         <button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 rounded-lg text-sm font-bold transition-colors">
            <Layers size={14}/> Manage Views
         </button>
      </div>
    </div>
  );
};

export default LeftRail;