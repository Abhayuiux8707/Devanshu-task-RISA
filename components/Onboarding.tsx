import React, { useState, useEffect } from 'react';
import { 
  Zap, ArrowRight, Inbox, Smile, TrendingUp, 
  BarChart2, MessageSquare, ChevronRight, CheckCircle2, Sparkles 
} from './ui/Icons';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import RizaAvatar from './ui/RizaAvatar';

interface OnboardingProps {
  onComplete: () => void;
}

// --- Design System Components ---

const Card = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, color = 'slate' }: { children?: React.ReactNode; color?: 'slate' | 'red' | 'green' | 'teal' }) => {
    const colors = {
        slate: 'bg-slate-100 text-slate-600',
        red: 'bg-red-50 text-red-600',
        green: 'bg-green-50 text-green-600',
        teal: 'bg-teal-50 text-teal-600',
    };
    return (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${colors[color]}`}>
            {children}
        </span>
    );
};

// --- Demos ---

const TriageDemo = () => {
  const [tickets, setTickets] = useState([
    { id: 1, text: "Where is my refund?", sentiment: 'neutral', isUrgent: false },
    { id: 2, text: "Login failed again.", sentiment: 'neutral', isUrgent: false },
    { id: 3, text: "I love this tool!", sentiment: 'neutral', isUrgent: false },
  ]);

  useEffect(() => {
    // Sequence: Analyze -> Flag Urgent -> Reorder
    const t1 = setTimeout(() => {
        setTickets(prev => prev.map(t => t.id === 1 ? { ...t, sentiment: 'negative', isUrgent: true } : t));
    }, 1000);
    const t2 = setTimeout(() => {
        setTickets(prev => prev.map(t => t.id === 3 ? { ...t, sentiment: 'positive' } : t));
    }, 2000);
    const t3 = setTimeout(() => {
        setTickets(prev => [prev[0], prev[1], prev[2]]); // Keep order logic simple for demo
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <Card className="w-80 p-4">
      <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2">
        <span className="text-xs font-bold text-slate-400 uppercase">Incoming Queue</span>
        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div><div className="w-2 h-2 rounded-full bg-slate-200"></div></div>
      </div>
      <div className="space-y-3">
        {tickets.map((t) => (
           <div key={t.id} className={`p-3 rounded-xl border transition-all duration-500 flex items-center justify-between ${
               t.isUrgent ? 'bg-red-50 border-red-100 shadow-sm translate-x-1' : 'bg-slate-50 border-transparent'
           }`}>
               <div className="flex items-center gap-3">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                       t.sentiment === 'negative' ? 'bg-red-100 text-red-600' : 
                       t.sentiment === 'positive' ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400'
                   }`}>
                       {t.sentiment === 'negative' ? <Zap size={12}/> : t.sentiment === 'positive' ? <Smile size={12}/> : <Inbox size={12}/>}
                   </div>
                   <div className="text-xs font-medium text-slate-700 w-32 truncate">{t.text}</div>
               </div>
               {t.isUrgent && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
           </div>
        ))}
      </div>
    </Card>
  );
};

const DraftDemo = () => {
    const [text, setText] = useState("");
    const fullText = "Hi Jane, sorry about the login trouble. I've reset your session. Try now!";
    
    useEffect(() => {
        let idx = 0;
        const interval = setInterval(() => {
            if (idx <= fullText.length) {
                setText(fullText.slice(0, idx));
                idx++;
            }
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="w-80 p-4">
             <div className="flex gap-3 mb-4 opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3 text-xs text-slate-500">
                    I can't log in! Fix this asap.
                </div>
             </div>
             <div className="flex gap-3">
                <div className="shrink-0"><RizaAvatar size="sm" /></div>
                <div className="bg-teal-50 rounded-2xl rounded-tl-none p-3 text-xs text-slate-700 w-full shadow-sm border border-teal-100 relative">
                     {text}
                     <span className="animate-pulse text-teal-500 ml-0.5">|</span>
                </div>
             </div>
        </Card>
    );
};

const LiveGraphDemo = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const initial = Array.from({ length: 20 }, (_, i) => ({ time: i, value: 50 + Math.random() * 10 }));
        setData(initial);
        const interval = setInterval(() => {
            setData(prev => {
                const last = prev[prev.length - 1];
                const nextVal = Math.min(100, Math.max(20, last.value + (Math.random() - 0.4) * 10)); 
                return [...prev.slice(1), { time: last.time + 1, value: nextVal }];
            });
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="w-80 p-4">
             <div className="flex justify-between items-end mb-4">
                <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live CSAT</div>
                    <div className="text-2xl font-bold text-slate-800 tabular-nums">
                        {data.length > 0 ? (data[data.length-1].value / 20).toFixed(1) : "0.0"}
                        <span className="text-slate-300 text-sm ml-1">/ 5.0</span>
                    </div>
                </div>
                <Badge color="green">+12%</Badge>
             </div>
             <div className="h-24 w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} fill="url(#g1)" isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </Card>
    );
};

// --- Main Component ---

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Riza",
      subtitle: "The AI-Native OS for Support.",
      description: "Replace your helpdesk clutter with an intelligent, agent-first browser designed for speed and empathy.",
      demo: (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in-up">
             <RizaAvatar size="xl" withPulse />
             <div className="mt-8 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-xs font-mono text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                System Online
             </div>
          </div>
      )
    },
    {
      title: "Intelligent Triage",
      subtitle: "Focus on what matters.",
      description: "Riza automatically detects sentiment and urgency, reordering your queue so you tackle critical issues first.",
      demo: <div className="flex items-center justify-center h-full animate-fade-in-up"><TriageDemo /></div>
    },
    {
      title: "Automated Drafting",
      subtitle: "Write faster, sound better.",
      description: "Our LLM understands context and drafts empathetic, policy-compliant responses instantly.",
      demo: <div className="flex items-center justify-center h-full animate-fade-in-up"><DraftDemo /></div>
    },
    {
      title: "Self-Driving Analytics",
      subtitle: "Data Science included.",
      description: "Forget spreadsheets. Riza monitors CSAT and Ops metrics in real-time, proactively flagging operational risks.",
      demo: <div className="flex items-center justify-center h-full animate-fade-in-up"><LiveGraphDemo /></div>
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-50 font-sans text-slate-800">
      <div className="w-full max-w-5xl h-[600px] bg-white rounded-[32px] shadow-2xl flex overflow-hidden ring-1 ring-slate-100">
        
        {/* Left: Interactive Demo Stage */}
        <div className="w-1/2 bg-slate-50/50 flex flex-col relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            
            {/* Demo Container */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-12">
                {steps[step].demo}
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                {steps.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-teal-500' : 'w-1.5 bg-slate-300'}`}
                    ></div>
                ))}
            </div>
        </div>

        {/* Right: Narrative Content */}
        <div className="w-1/2 p-16 flex flex-col justify-center relative">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
                    {steps[step].title}
                </h1>
                <h2 className="text-xl font-medium text-teal-600 mb-6 flex items-center gap-2">
                    {steps[step].subtitle}
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                    {steps[step].description}
                </p>
            </div>

            <div className="flex items-center gap-4 mt-8">
                <button 
                    onClick={handleNext}
                    className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                    {step === steps.length - 1 ? "Launch Riza Browser" : "Continue"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                {step < steps.length - 1 && (
                    <button 
                        onClick={onComplete}
                        className="text-sm font-semibold text-slate-400 hover:text-slate-600 px-6 py-4"
                    >
                        Skip
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;