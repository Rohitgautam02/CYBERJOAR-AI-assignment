/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Turnout Simulator (PS5 Standard)
 */

import React from 'react';
import { PlayCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatTurnoutLabel } from '../utils/formatters';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const TurnoutSimulator = ({ turnout, winScenarios, onTurnoutChange }) => {
  return (
    <div className="bg-bg-dark text-white rounded-lg shadow-hero overflow-hidden animate-fade-in flex flex-col h-full border border-white/5">
      
      {/* Simulation Header */}
      <div className="p-6 bg-navy-light/20 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white shadow-lg">
               <PlayCircle size={22} className="animate-pulse" />
             </div>
             <div>
                <h3 className="text-[16px] font-bold tracking-tight">Voter Turnout Simulation</h3>
                <p className="text-[11px] text-white/50 uppercase font-mono tracking-widest">Adjust turnout to model anti-incumbency bias</p>
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[13px] font-bold text-white/80">PROJECTED TURNOUT</span>
            <span className="text-[28px] font-mono font-bold text-gold">{Math.round(turnout * 100)}%</span>
          </div>
          
          <div className="relative pt-2 pb-6">
            <input 
              type="range"
              min="0.30"
              max="0.95"
              step="0.01"
              value={turnout}
              onChange={(e) => onTurnoutChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              style={{
                background: `linear-gradient(to right, #c9a84c 0%, #c9a84c ${((turnout - 0.3) / (0.95 - 0.3)) * 100}%, rgba(255,255,255,0.1) ${((turnout - 0.3) / (0.95 - 0.3)) * 100}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
            <div className="flex justify-between mt-2 px-1 text-[9px] font-mono text-white/40 uppercase font-bold tracking-tighter">
               <span>LOW (30%)</span>
               <span>MEDIUM (65%)</span>
               <span>HIGH (95%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Matrix */}
      <div className="p-6 flex-1 space-y-4">
        <span className="block text-[10px] font-mono text-white/40 font-bold uppercase tracking-widest mb-2">SCENARIO ANALYSIS</span>
        
        <div className="grid grid-cols-1 gap-3">
          {winScenarios.map((scenario, idx) => {
            const isSelected = Math.abs(turnout - scenario.turnout) < 0.08;
            const winnerColor = CANDIDATE_COLORS[scenario.winner.colorIndex];

            return (
              <div 
                key={idx}
                className={`p-4 rounded-sm border transition-all duration-300 flex items-center justify-between ${
                  isSelected 
                    ? 'bg-white/10 border-gold/50 shadow-lg' 
                    : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white uppercase">{scenario.label}</span>
                    <span className="text-[9px] font-mono text-white/40">{formatTurnoutLabel(scenario.turnout)}</span>
                  </div>
                  
                  <div className="h-8 w-[1px] bg-white/10 mx-2" />
                  
                  <div className="flex flex-col">
                     <span className="text-[10px] text-white/50 uppercase font-bold tracking-tighter">Projected Winner</span>
                     <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: winnerColor }} />
                       <span className={`text-[13px] font-bold ${isSelected ? 'text-gold' : 'text-white'}`}>
                         {scenario.winner.name.split(' ')[0]}
                       </span>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-white/5 mb-1">
                     {scenario.turnout > 0.7 ? (
                       <>
                         <TrendingUp size={10} className="text-crimson" />
                         <span className="text-[9px] font-bold text-crimson uppercase">VolatiltyRisk</span>
                       </>
                     ) : scenario.turnout < 0.55 ? (
                       <>
                         <TrendingDown size={10} className="text-emerald" />
                         <span className="text-[9px] font-bold text-emerald uppercase">CadreLocked</span>
                       </>
                     ) : (
                       <>
                         <Minus size={10} className="text-steel" />
                         <span className="text-[9px] font-bold text-steel uppercase">Neutral</span>
                       </>
                     )}
                   </div>
                   <span className="text-[11px] font-mono font-bold text-white/80">+{(scenario.winner.pow - (scenario.runnerUp?.pow || 0)).toFixed(1)}% GAP</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-navy/40 border border-white/5 rounded-sm">
           <p className="text-[11px] text-white/60 leading-relaxed italic">
             "Scenario modeling suggests that high turnout in {winScenarios[0].winner.name.split(' ')[0]}'s pockets increases risk for incumbents by 
             <span className="text-gold font-bold"> ~15%</span> compared to standard turnout."
           </p>
        </div>
      </div>

    </div>
  );
};

export default TurnoutSimulator;
