/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Winner Projection Hero (PS5 Standard)
 */

import React, { useState, useEffect } from 'react';
import { Trophy, Target, ShieldCheck, Zap } from 'lucide-react';
import { formatProbability, formatVoterCount } from '../utils/formatters';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const WinnerProjection = ({ powResults, candidates, constituency, turnout }) => {
  const winner = powResults[0];
  const runnerUp = powResults[1];
  const margin = (winner.pow - runnerUp.pow).toFixed(1);
  const candColor = CANDIDATE_COLORS[winner.colorIndex];
  
  // Animation for the PoW number
  const [displayPoW, setDisplayPoW] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = winner.pow;
    const duration = 1200;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayPoW(end);
        clearInterval(timer);
      } else {
        setDisplayPoW(parseFloat(start.toFixed(1)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [winner.pow]);

  return (
    <div 
      className="bg-bg-card border border-border rounded-lg shadow-hero overflow-hidden animate-fade-in relative h-full flex flex-col"
      style={{ borderLeft: `8px solid ${candColor}` }}
    >
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-navy/[0.02] -mr-32 -mt-32 rounded-full pointer-events-none" />
      
      {/* TOP: Identification */}
      <div className="p-6 border-b border-border/40 relative z-10">
        <div className="flex items-center gap-3 mb-2">
           <Trophy size={20} className="text-gold" />
           <span className="font-mono text-[11px] text-steel font-bold uppercase tracking-[0.2em]">
             Projection Protocol: {constituency.id.toUpperCase()}-MATRIX
           </span>
        </div>
        <h2 className="text-[28px] font-bold text-navy tracking-tight leading-tight">
          Current Projected Winner
        </h2>
        <div className="flex items-center gap-2 mt-2">
           <span className="text-[14px] text-steel">Base Constituency:</span>
           <span className="text-[14px] font-bold text-navy">{constituency.name}</span>
           <span className="mx-2 text-border-dark">|</span>
           <span className="text-[14px] text-steel">Turnout Model:</span>
           <span className="text-[14px] font-bold text-navy">{Math.round(turnout * 100)}%</span>
        </div>
      </div>

      {/* MIDDLE: Hero Section */}
      <div className="p-8 flex-1 flex flex-col items-center justify-center relative z-10 text-center">
         
         <div className="mb-6 relative">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-[48px] font-bold shadow-xl shadow-navy/20 animate-scale-in"
              style={{ backgroundColor: candColor }}
            >
               {winner.party[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg border border-border">
               <ShieldCheck size={20} className="text-emerald" />
            </div>
         </div>

         <div className="animate-count-up">
            <h1 className="text-[36px] font-bold text-navy tracking-tight leading-tight">
              {winner.name}
            </h1>
            <div className="inline-block px-3 py-1 bg-navy/5 border border-navy/20 rounded-sm mt-1">
               <span className="font-mono text-[14px] font-bold text-navy tracking-widest">
                 {winner.party}
               </span>
            </div>
         </div>

         <div className="mt-10 flex flex-col items-center">
            <span className="text-[11px] font-mono text-steel font-bold uppercase tracking-widest mb-1">
              WIN PROBABILITY (PoW)
            </span>
            <div className="flex items-baseline gap-2">
               <span 
                 className="text-[84px] font-mono font-bold leading-none tracking-tighter"
                 style={{ color: candColor }}
               >
                 {displayPoW}%
               </span>
            </div>
         </div>

         <div className="mt-8 flex items-center gap-4 py-3 px-6 bg-gold/10 border border-gold/30 rounded-full animate-pulse-badge">
            <Zap size={16} className="text-gold" />
            <span className="text-[13px] font-bold text-navy uppercase tracking-tight">
              Lead Margin: <span className="text-gold">{margin}%</span> over runner-up
            </span>
         </div>
      </div>

      {/* BOTTOM: Quantitative Summary */}
      <div className="grid grid-cols-2 border-t border-border">
         <div className="p-5 border-r border-border bg-bg-page/50">
            <div className="flex items-center gap-2 mb-1">
               <Target size={14} className="text-steel" />
               <span className="text-[10px] font-mono font-bold text-steel uppercase">Est. Vote Gap</span>
            </div>
            <span className="text-[20px] font-mono font-bold text-navy">
              ~{formatVoterCount(Math.round(constituency.totalVoters * turnout * (margin/100)))}
            </span>
            <span className="block text-[10px] text-steel mt-1 uppercase font-bold">Absolute Votes</span>
         </div>
         <div className="p-5 bg-bg-page/50">
            <div className="flex items-center gap-2 mb-1">
               <ShieldCheck size={14} className="text-steel" />
               <span className="text-[10px] font-mono font-bold text-steel uppercase">Confidence Rating</span>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[20px] font-mono font-bold text-emerald">HIGH</span>
               <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-3 h-1.5 rounded-sm ${i < 5 ? 'bg-emerald' : 'bg-steel/30'}`} />
                  ))}
               </div>
            </div>
            <span className="block text-[10px] text-steel mt-1 uppercase font-bold">System Validation</span>
         </div>
      </div>

    </div>
  );
};

export default WinnerProjection;
