/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Candidate Card (PS5 Standard)
 */

import React from 'react';
import { X, Award, Info, History, ShieldCheck, Zap } from 'lucide-react';
import FactorSlider from './FactorSlider';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const CandidateCard = ({ candidate, onScoreChange, onRemove, isRemovable }) => {
  const color = CANDIDATE_COLORS[candidate.colorIndex] || '#1a2f5a';

  return (
    <div 
      className="bg-bg-card border border-border rounded-lg shadow-premium overflow-hidden transition-all duration-300 animate-scale-in flex flex-col h-full"
      style={{ borderTop: `4px solid ${color}` }}
    >
      {/* HEADER */}
      <div className="p-4 bg-white border-b border-border/60">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[14px]"
              style={{ backgroundColor: color }}
            >
              {candidate.partyShortCode[0]}
            </div>
            <div>
              <h3 className="font-sans font-bold text-[15px] text-navy leading-tight">
                {candidate.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                 <span 
                   className="text-[10px] font-bold px-1.5 py-0.5 border rounded-sm"
                   style={{ backgroundColor: `${color}15`, color: color, borderColor: `${color}40` }}
                 >
                   {candidate.party}
                 </span>
                 {candidate.isIncumbent && (
                   <span className="flex items-center gap-1 text-[9px] font-bold text-gold bg-gold/10 px-1.5 py-0.5 border border-gold/30 rounded-sm">
                     <Award size={10} /> INCUMBENT
                   </span>
                 )}
              </div>
            </div>
          </div>
          {isRemovable && (
            <button 
              onClick={() => onRemove(candidate.id)}
              className="p-1 text-steel/40 hover:text-crimson hover:bg-crimson/5 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">
           <div className="flex items-center gap-1 text-[10px] text-steel">
             <span className="opacity-60 uppercase font-mono tracking-tighter">AGE</span>
             <span className="font-bold">{candidate.age}</span>
           </div>
           <div className="flex items-center gap-1 text-[10px] text-steel">
             <span className="opacity-60 uppercase font-mono tracking-tighter">EDU</span>
             <span className="font-bold truncate max-w-[100px]">{candidate.education}</span>
           </div>
           <div className="flex items-center gap-1 text-[10px] text-steel">
             <span className="opacity-60 uppercase font-mono tracking-tighter">EXP</span>
             <span className="font-bold">{candidate.yearsInPolitics}Y</span>
           </div>
        </div>
      </div>

      {/* FACTOR SCORES */}
      <div className="p-4 space-y-4 bg-white flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={12} className="text-navy" />
          <span className="font-mono text-[9px] text-steel uppercase font-bold tracking-widest">
            FACTOR SCORES
          </span>
        </div>
        
        <div className="space-y-4">
          {Object.entries(candidate.scores).map(([factor, value]) => (
            <FactorSlider
              key={factor}
              label={factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              value={value}
              onChange={(val) => onScoreChange(candidate.id, factor, val)}
              candidateColor={color}
            />
          ))}
        </div>
      </div>

      {/* OSINT BRIEF */}
      <div className="px-4 py-3 bg-bg-page border-y border-border/40">
        <div className="flex items-center gap-1.5 mb-1">
          <Info size={11} className="text-navy-light" />
          <span className="font-mono text-[9px] text-navy-light font-bold uppercase tracking-widest">
            OSINT BRIEF
          </span>
        </div>
        <p className="text-[11.5px] text-steel leading-relaxed italic font-sans">
          "{candidate.osintSummary}"
        </p>
      </div>

      {/* RECORD SECTION */}
      <div className="p-4 bg-white border-b border-border/40">
        <div className="flex items-center gap-1.5 mb-3">
          <History size={11} className="text-steel" />
          <span className="font-mono text-[9px] text-steel font-bold uppercase tracking-widest">
            VICTORY HISTORY
          </span>
        </div>
        <div className="relative flex items-center justify-between px-2">
          <div className="absolute left-0 right-0 h-[1px] bg-border z-0" />
          {candidate.victoryHistory.length > 0 ? (
            candidate.victoryHistory.map((v, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center group">
                <div 
                  className={`w-3 h-3 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-125 cursor-help ${
                    v.result === 'WON' ? 'bg-emerald' : 'bg-crimson'
                  }`}
                  title={`${v.year}: ${v.result} by ${v.margin} votes`}
                />
                <span className="text-[9px] font-mono text-steel mt-2 font-bold">{v.year}</span>
              </div>
            ))
          ) : (
            <span className="text-[10px] text-steel italic w-full text-center py-1">No historical matrix data available</span>
          )}
        </div>
      </div>

      {/* ANALYSIS SECTION */}
      <div className="p-4 bg-white space-y-3">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 text-emerald flex-shrink-0">
            <ShieldCheck size={14} />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-emerald uppercase tracking-tighter">KEY STRENGTH</span>
            <p className="text-[11px] text-steel leading-snug">{candidate.keyStrength}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-1 w-3.5 h-3.5 border border-crimson rounded-full flex items-center justify-center text-crimson text-[10px] font-bold flex-shrink-0">
            !
          </div>
          <div>
            <span className="block text-[10px] font-bold text-crimson uppercase tracking-tighter">KEY WEAKNESS</span>
            <p className="text-[11px] text-steel leading-snug">{candidate.keyWeakness}</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto p-3 bg-bg-page flex items-center justify-between border-t border-border/40 font-mono text-[9px] text-steel">
        <span className="hover:text-navy-light cursor-pointer transition-colors">{candidate.socialMediaHandle}</span>
        <div className="flex items-center gap-1.5">
           <span className="opacity-60 uppercase">SUPPORT BASE:</span>
           <span className="text-navy font-bold">{candidate.estimatedSupportBase}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
