import React, { useState } from 'react';
import {  Inbox, AlertTriangle, Clock, Smile, Meh, Frown, CheckCircle2, Filter, Loader2 } from '../ui/Icons';
import { Ticket, WorkspaceProps, WorkspaceMode } from '../../types';

// Mock Ticket Data
const initialTickets: Ticket[] = [
  { id: '4492', subject: 'Refund Request - Unhappy with Service', customer: 'Acme Corp', sentimentScore: -0.8, urgency: 'CRITICAL', status: 'new', channel: 'email', lastUpdated: '10m ago' },
  { id: '4491', subject: 'How do I add a user?', customer: 'StartUp Inc', sentimentScore: 0.5, urgency: 'LOW', status: 'new', channel: 'chat', lastUpdated: '15m ago' },
  { id: '4490', subject: 'API Latency Issues', customer: 'TechGiant', sentimentScore: -0.2, urgency: 'HIGH', status: 'open', channel: 'email', lastUpdated: '1h ago' },
  { id: '4489', subject: 'Billing Inquiry', customer: 'Mom&Pop Shop', sentimentScore: 0.1, urgency: 'MEDIUM', status: 'pending', channel: 'phone', lastUpdated: '2h ago' },
  { id: '4488', subject: 'Feature Request: Dark Mode', customer: 'DevUser', sentimentScore: 0.8, urgency: 'LOW', status: 'resolved', channel: 'email', lastUpdated: '1d ago' },
];

const QueueWorkspace: React.FC<WorkspaceProps> = ({ onNavigate }) => {
  const [tickets, setTickets] = useState(initialTickets);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [assignedCount, setAssignedCount] = useState(0);

  const handleAutoAssign = () => {
      setIsAssigning(true);
      // Simulate API call
      setTimeout(() => {
          setTickets(prev => prev.slice(0, 3)); // Remove 2 tickets as "assigned"
          setAssignedCount(prev => prev + 2);
          setIsAssigning(false);
      }, 1500);
  };

  const handleFilterToggle = () => {
      setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-slate-50 relative">
      
      {/* Toast Notification for Auto-Assign */}
      {assignedCount > 0 && (
          <div className="absolute top-4 right-8 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-300">
              <CheckCircle2 size={16}/>
              <span className="text-sm font-bold">{assignedCount} Tickets assigned to you by Risa AI.</span>
          </div>
      )}

      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Support Queue</h2>
          <div className="flex gap-6 text-sm text-slate-500 font-mono">
            <span className="flex items-center gap-2"><Inbox size={14}/> {tickets.length} New Tickets</span>
            <span className="flex items-center gap-2 text-red-600"><AlertTriangle size={14}/> 1 Critical</span>
          </div>
        </div>
        <div className="flex gap-3 relative">
            <button 
                onClick={handleFilterToggle}
                className={`px-4 py-2 bg-white hover:bg-slate-50 border ${isFilterOpen ? 'border-teal-500 text-teal-600' : 'border-slate-200 text-slate-700'} rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2`}
            >
                <Filter size={16}/> Filter View
            </button>
            
            {/* Filter Dropdown */}
            {isFilterOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-slate-200 rounded-xl shadow-xl w-48 z-20 p-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="text-xs font-bold text-slate-400 uppercase px-2 py-1">Sort By</div>
                    <button className="w-full text-left px-2 py-1.5 hover:bg-slate-50 rounded text-sm text-slate-700">Urgency (High to Low)</button>
                    <button className="w-full text-left px-2 py-1.5 hover:bg-slate-50 rounded text-sm text-slate-700">Newest First</button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <div className="text-xs font-bold text-slate-400 uppercase px-2 py-1">Filter</div>
                    <button className="w-full text-left px-2 py-1.5 hover:bg-slate-50 rounded text-sm text-slate-700 flex items-center justify-between">
                        Email Only <span className="bg-slate-100 text-[10px] px-1 rounded text-slate-500">3</span>
                    </button>
                </div>
            )}

            <button 
                onClick={handleAutoAssign}
                disabled={isAssigning}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-bold shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
                {isAssigning ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle2 size={16}/>}
                {isAssigning ? 'Analzying Workload...' : 'Auto-Assign Tickets'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
            { label: 'Avg Wait Time', value: '12m', sub: '-2m vs last week', color: 'text-slate-900', bg: 'bg-white' },
            { label: 'Queue Sentiment', value: 'Neutral', sub: 'Score: 0.2', color: 'text-yellow-600', bg: 'bg-white' },
            { label: 'Agent Availability', value: '8/12', sub: 'High Load', color: 'text-teal-600', bg: 'bg-white' },
            { label: 'CSAT Prediction', value: '4.8/5', sub: 'Based on queue', color: 'text-green-600', bg: 'bg-white' }
        ].map((stat, i) => (
            <div key={i} className={`${stat.bg} p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-sm`}>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                    {stat.sub}
                </div>
            </div>
        ))}
      </div>

      {/* Ticket List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
            <div className="col-span-4">Subject / Customer</div>
            <div className="col-span-2">Urgency</div>
            <div className="col-span-2">Sentiment</div>
            <div className="col-span-2">Channel</div>
            <div className="col-span-2 text-right">Updated</div>
        </div>
        
        {tickets.map((ticket) => (
            <div 
                key={ticket.id} 
                onClick={() => onNavigate(WorkspaceMode.TICKET)}
                className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 items-center hover:bg-slate-50 transition-colors cursor-pointer group last:border-0"
            >
                <div className="col-span-4">
                    <div className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{ticket.subject}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1">#{ticket.id} • {ticket.customer}</div>
                </div>
                <div className="col-span-2">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                        ticket.urgency === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-200' :
                        ticket.urgency === 'HIGH' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                        'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                        {ticket.urgency}
                    </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                    {ticket.sentimentScore < -0.5 ? <Frown size={16} className="text-red-500"/> : 
                     ticket.sentimentScore > 0.5 ? <Smile size={16} className="text-green-500"/> :
                     <Meh size={16} className="text-yellow-500"/>}
                     <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${ticket.sentimentScore < 0 ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{width: `${Math.abs(ticket.sentimentScore) * 100}%`}}
                        ></div>
                     </div>
                </div>
                <div className="col-span-2 text-xs text-slate-500 capitalize">
                    {ticket.channel}
                </div>
                <div className="col-span-2 text-right text-xs text-slate-400 font-mono flex items-center justify-end gap-2">
                    <Clock size={12}/> {ticket.lastUpdated}
                </div>
            </div>
        ))}
      </div>
      
      {/* AI Insight */}
      <div className="mt-6 bg-red-50 p-6 rounded-xl border border-red-100">
        <h4 className="text-red-700 font-bold text-sm mb-2 flex items-center gap-2">
            <AlertTriangle size={16}/> RISA PRIORITY ALERT
        </h4>
        <p className="text-sm text-red-900/80 leading-relaxed font-mono">
            Ticket #4492 (Acme Corp) has a sentiment score of -0.8 (Critical). 
            Keywords detected: "Refund", "Unacceptable", "Manager". 
            This customer is Enterprise Tier ($120k ARR). 
            Recommendation: Assign to Senior Agent immediately.
        </p>
      </div>
    </div>
  );
};

export default QueueWorkspace;