import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Paperclip, ChevronDown, Activity, Server, Shield, Loader2 } from '../ui/Icons';

const EscalationWorkspace: React.FC = () => {
    const [severity, setSeverity] = useState('SEV-2');
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleLinkTicket = () => {
        setDescription(prev => prev + "\n\nReferencing Ticket #4492 (Refund Request)\n- Customer: Acme Corp\n- Issue: Repeated downtime & 502 errors.");
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };
    
    if (isSubmitted) {
        return (
            <div className="flex-1 bg-slate-50 p-8 flex items-center justify-center font-sans">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32}/>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Incident Escalated</h2>
                    <p className="text-slate-500 mb-6">Engineering has been notified. The Incident ID is <span className="font-mono font-bold text-slate-800">INC-2024-002</span>.</p>
                    <button 
                        onClick={() => { setIsSubmitted(false); setDescription(""); }}
                        className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                    >
                        Create Another Report
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-slate-50 p-8 overflow-y-auto font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">Escalation Mode</span>
                             <span className="text-slate-400 text-sm font-mono">INC-2024-002</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Create Incident Report</h2>
                        <p className="text-slate-500 mt-1">Escalate customer issue to Engineering/Product teams.</p>
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                        {isSubmitting ? <Loader2 size={18} className="animate-spin"/> : <AlertTriangle size={18} />}
                        {isSubmitting ? 'Submitting...' : 'Submit Incident'}
                    </button>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 space-y-8">
                        
                        {/* Summary & Severity */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Incident Summary</label>
                                <input type="text" defaultValue="Enterprise Customer experiencing repeated 502 Errors" className="w-full text-lg font-medium border-b-2 border-slate-200 focus:border-slate-900 focus:outline-none py-2 bg-transparent text-slate-900 placeholder-slate-300 transition-colors" />
                            </div>
                            <div className="col-span-1 space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</label>
                                <div className="relative">
                                    <select 
                                        value={severity}
                                        onChange={(e) => setSeverity(e.target.value)}
                                        className={`w-full appearance-none px-4 py-3 rounded-lg font-bold border-2 cursor-pointer outline-none transition-colors ${
                                            severity === 'SEV-1' ? 'bg-red-50 border-red-500 text-red-700' :
                                            severity === 'SEV-2' ? 'bg-orange-50 border-orange-500 text-orange-700' :
                                            'bg-slate-50 border-slate-200 text-slate-700'
                                        }`}
                                    >
                                        <option value="SEV-1">SEV-1 (Critical)</option>
                                        <option value="SEV-2">SEV-2 (Major)</option>
                                        <option value="SEV-3">SEV-3 (Minor)</option>
                                    </select>
                                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${severity === 'SEV-1' ? 'text-red-700' : severity === 'SEV-2' ? 'text-orange-700' : 'text-slate-500'}`} size={16}/>
                                </div>
                            </div>
                        </div>

                        {/* Impact Assessment */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Impact Areas</label>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: 'perf', label: 'Performance', icon: <Activity size={18}/>, checked: true },
                                    { id: 'sec', label: 'Security', icon: <Shield size={18}/>, checked: false },
                                    { id: 'infra', label: 'Infrastructure', icon: <Server size={18}/>, checked: true }
                                ].map(area => (
                                    <label key={area.id} className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${area.checked ? 'border-slate-900 bg-slate-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}>
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${area.checked ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'}`}>
                                            {area.checked && <CheckCircle2 size={12}/>}
                                        </div>
                                        <div className={area.checked ? 'text-slate-900 font-bold' : 'text-slate-500'}>{area.icon}</div>
                                        <span className={`font-medium ${area.checked ? 'text-slate-900' : 'text-slate-500'}`}>{area.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detailed Description & Repro Steps</label>
                             <div className="relative">
                                 <textarea 
                                    className="w-full h-40 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 resize-none font-mono leading-relaxed" 
                                    placeholder="1. User logs in..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                 ></textarea>
                                 <button className="absolute bottom-3 right-3 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                                     <Paperclip size={12}/> Attach Logs
                                 </button>
                             </div>
                        </div>

                    </div>
                    
                    {/* Footer AI Suggestions */}
                    <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600"><Activity size={16}/></div>
                             <div>
                                 <div className="text-xs font-bold text-teal-700 uppercase tracking-wide">AI Recommendation</div>
                                 <div className="text-sm text-slate-600">Based on logs, this matches <span className="font-mono text-slate-800 bg-slate-200 px-1 rounded">ERR-502-Gateway</span> seen last week.</div>
                             </div>
                        </div>
                        <button onClick={handleLinkTicket} className="text-teal-600 text-sm font-bold hover:underline">Link to previous ticket</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EscalationWorkspace;