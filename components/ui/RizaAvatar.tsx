import React from 'react';
import { Bot, Sparkles } from './Icons';

interface RizaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withPulse?: boolean;
  className?: string;
}

const RizaAvatar: React.FC<RizaAvatarProps> = ({ size = 'md', withPulse = false, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {/* Outer Glow / Pulse */}
      {withPulse && (
        <div className="absolute inset-0 bg-teal-500/30 rounded-full animate-pulse-slow blur-md scale-110"></div>
      )}
      
      {/* Avatar Container */}
      <div className="relative z-10 w-full h-full bg-gradient-to-br from-teal-400 to-emerald-600 rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-white/20">
        
        {/* Shine Effect */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent"></div>
        
        {/* Icon */}
        <Bot 
          size={iconSizes[size]} 
          className="text-white relative z-10 drop-shadow-md" 
          strokeWidth={2.5}
        />

        {/* Decor: Digital sparkles */}
        <div className="absolute bottom-1 right-2 opacity-50">
             <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Status Dot (Optional feeling of 'Online') */}
      <div className="absolute -bottom-0.5 -right-0.5 w-[25%] h-[25%] bg-green-500 border-2 border-white rounded-full shadow-sm z-20"></div>
    </div>
  );
};

export default RizaAvatar;