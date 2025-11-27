import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import BrowserNewTab from './components/BrowserNewTab';
import DashboardOverlay from './components/DashboardOverlay';
import RizaAvatar from './components/ui/RizaAvatar';
import { WorkspaceMode } from './types';
import { Sparkles } from './components/ui/Icons';

function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<WorkspaceMode>(WorkspaceMode.QUEUE);
  const [showFloatingIsland, setShowFloatingIsland] = useState(false);

  // Trigger floating island slide-in after mount or onboarding
  useEffect(() => {
    if (isOnboarded && !isDashboardOpen) {
        const timer = setTimeout(() => setShowFloatingIsland(true), 500);
        return () => clearTimeout(timer);
    } else {
        setShowFloatingIsland(false);
    }
  }, [isOnboarded, isDashboardOpen]);

  const handleOpenDashboard = (mode: WorkspaceMode = WorkspaceMode.QUEUE) => {
    setInitialMode(mode);
    setIsDashboardOpen(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={() => setIsOnboarded(true)} />;
  }

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-slate-50 overflow-hidden font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Underlying Browser Landing Page */}
      <BrowserNewTab onNavigate={handleOpenDashboard} />

      {/* 2. Floating Character Island (Entry Point) */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
            showFloatingIsland ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
      >
        <div 
            onClick={() => handleOpenDashboard(WorkspaceMode.QUEUE)}
            className="group relative cursor-pointer"
        >
            {/* Speech Bubble Tooltip */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-max bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                <div className="text-xs font-bold text-slate-600 flex items-center gap-2">
                    <Sparkles size={12} className="text-teal-500" />
                    Open Risa Dashboard
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-100 transform rotate-45"></div>
            </div>

            {/* The Character */}
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <RizaAvatar size="lg" withPulse />
            </div>

            {/* Label Pill */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risa AI</span>
            </div>
        </div>
      </div>

      {/* 3. The Dashboard Overlay */}
      <DashboardOverlay 
        isOpen={isDashboardOpen} 
        onClose={() => setIsDashboardOpen(false)} 
        initialMode={initialMode}
      />
    </div>
  );
}

export default App;