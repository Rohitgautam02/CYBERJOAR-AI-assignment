/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Constituency Selector (PS5 Standard)
 */

import React from 'react';
import { formatVoterCount } from '../utils/formatters';

const ConstituencySelector = ({ constituencies, selected, onSelect }) => {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-6 shadow-premium animate-fade-in mt-4 lg:mt-8">
      <div className="flex flex-col gap-6">
        
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-[10px] text-steel letter-spacing-military uppercase font-bold">
            SELECT TACTICAL CONSTITUENCY
          </h2>
          <div className="h-[1px] flex-1 bg-border/60 mx-4" />
        </div>

        {/* Pill Row - Scrollable */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {constituencies.map((c) => {
            const isSelected = selected.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c)}
                className={`flex-shrink-0 px-5 py-3 rounded-[4px] border transition-all duration-200 text-left min-w-[140px] group ${
                  isSelected 
                    ? 'bg-navy border-navy text-white shadow-lg shadow-navy/20' 
                    : 'bg-white border-border text-steel hover:border-navy-light hover:text-navy'
                }`}
              >
                <span className="block font-sans text-[13px] font-bold leading-tight truncate">
                  {c.name}
                </span>
                <span className={`block font-sans text-[10px] ${isSelected ? 'text-white/70' : 'text-steel/70'}`}>
                  {c.state}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 pt-2 border-t border-border/40">
          
          <div className="px-4 border-r border-border/40 last:border-0">
            <span className="block text-[9px] font-mono text-steel uppercase mb-1">TOTAL VOTERS</span>
            <span className="block text-[14px] font-mono font-bold text-navy">
              {formatVoterCount(selected.totalVoters)}
            </span>
          </div>

          <div className="px-4 border-r border-border/40 last:border-0">
            <span className="block text-[9px] font-mono text-steel uppercase mb-1">HISTORICAL TURNOUT</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-mono font-bold text-navy">{selected.historicalTurnout}%</span>
              <div className="flex-1 h-1 bg-border/40 rounded-full overflow-hidden min-w-[40px]">
                <div 
                  className="h-full bg-navy-light" 
                  style={{ width: `${selected.historicalTurnout}%` }}
                />
              </div>
            </div>
          </div>

          <div className="px-4 border-r border-border/40 last:border-0">
            <span className="block text-[9px] font-mono text-steel uppercase mb-1">DOMINANT FACTOR</span>
            <span className="inline-block px-2 py-0.5 bg-navy/5 border border-navy/20 rounded-sm text-[10px] font-sans font-bold text-navy uppercase tracking-tight">
              {selected.dominantFactor.replace(/([A-Z])/g, ' $1')}
            </span>
          </div>

          <div className="px-4 border-r border-border/40 last:border-0">
            <span className="block text-[9px] font-mono text-steel uppercase mb-1">KEY ISSUES</span>
            <div className="flex flex-wrap gap-1">
              {selected.keyIssues.slice(0, 3).map(issue => (
                <span key={issue} className="text-[10px] text-steel bg-bg-page px-1.5 py-0.5 rounded-sm border border-border/60">
                  {issue}
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 border-r border-border/40 last:border-0">
            <span className="block text-[9px] font-mono text-steel uppercase mb-1">LAST RESULT (2024)</span>
            <span className="block text-[11px] font-sans font-medium text-navy leading-tight">
              {selected.incumbentParty}
              <span className="block text-[10px] font-mono text-emerald font-bold">
                +{formatVoterCount(selected.lastResult.margin)} GAP
              </span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ConstituencySelector;
