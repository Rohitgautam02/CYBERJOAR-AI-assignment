/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Weight Configuration Panel (PS5 Standard)
 */

import React, { useState } from 'react';
import { Settings2, RotateCcw, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { FACTOR_DESCRIPTIONS } from '../data/historicalWeights';
import { getFactorAbbr } from '../utils/formatters';

const WeightConfigPanel = ({ weights, onWeightChange, onReset, constituency, isValid }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const factors = Object.keys(weights);
  const factorColors = {
    incumbencyEffect: '#1a2f5a',
    partyStrength: '#2d4a7a',
    pastWork: '#1a7a4a',
    personalBase: '#c9a84c',
    casteReligiousBase: '#c0392b',
    digitalSentiment: '#7b3fa0'
  };

  return (
    <div className="mt-6 animate-fade-in">
      {/* Toggle Header */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white border border-border rounded-lg shadow-premium hover:border-navy-light transition-all group"
      >
        <div className="flex items-center gap-3">
          <Settings2 size={18} className="text-navy group-hover:rotate-45 transition-transform" />
          <span className="font-mono text-[11px] text-navy font-bold tracking-widest uppercase">
            CONFIGURE FACTOR WEIGHTS — BASED ON {constituency.name.toUpperCase()} HISTORICAL DATA
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!isValid && <span className="text-[10px] text-crimson font-bold uppercase animate-pulse">FIX NORMALIZATION</span>}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-2 p-6 bg-white border border-border rounded-lg shadow-xl animate-slide-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <p className="text-[12px] text-steel max-w-xl leading-relaxed">
              Factor weights determine how much each variable influences the final Probability of Win (PoW). 
              Adjusting one factor will proportionally scale others to maintain a 100% total influence.
            </p>
            <button 
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-1.5 border border-border text-[10px] font-bold text-steel hover:text-navy hover:border-navy transition-all"
            >
              <RotateCcw size={12} /> RESET TO HISTORICAL
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {factors.map(factor => (
              <div key={factor} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 group relative">
                    <span className="text-[13px] font-bold text-navy">
                      {factor.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                    </span>
                    <div className="cursor-help text-border-dark hover:text-navy">
                      <Info size={12} />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-navy text-white text-[11px] rounded shadow-hero opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 leading-snug border border-white/10">
                      {FACTOR_DESCRIPTIONS[factor]}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[13px]">
                    <span className="text-steel font-bold">{weights[factor].toFixed(2)}</span>
                    <span className="px-1.5 py-0.5 bg-navy/5 text-navy-light font-bold rounded">
                      {Math.round(weights[factor] * 100)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.01"
                    value={weights[factor]}
                    onChange={(e) => onWeightChange(factor, parseFloat(e.target.value))}
                    className="flex-1 h-1.5 bg-border rounded-lg appearance-none cursor-pointer"
                    style={{
                       background: `linear-gradient(to right, ${factorColors[factor]} 0%, ${factorColors[factor]} ${weights[factor] * 125}%, #dde3ed ${weights[factor] * 125}%, #dde3ed 100%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* VISUALIZATION SUMMARY */}
          <div className="mt-10 pt-6 border-t border-border/60">
            <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-mono text-steel font-bold uppercase tracking-widest">WEIGHT DISTRIBUTION MATRIX</span>
               <div className="flex items-center gap-2">
                 <span className="text-[11px] text-steel uppercase font-bold">TOTAL INFLUENCE:</span>
                 <span className={`text-[12px] font-mono font-bold ${isValid ? 'text-emerald' : 'text-crimson'}`}>
                   {isValid ? '100% VALIDATED' : 'ERR: SYSTEM MISMATCH'}
                 </span>
               </div>
            </div>

            {/* Stacked Percentage Bar */}
            <div className="h-8 flex rounded overflow-hidden shadow-inner bg-border/20">
              {factors.map(factor => (
                <div 
                  key={factor}
                  className="h-full flex items-center justify-center transition-all duration-300 relative group"
                  style={{ 
                    width: `${weights[factor] * 100}%`,
                    backgroundColor: factorColors[factor]
                  }}
                >
                  <span className="text-[9px] font-mono font-bold text-white/90 truncate px-1">
                    {weights[factor] > 0.08 ? getFactorAbbr(factor) : ''}
                  </span>
                  
                  {/* Floating Info */}
                  <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center z-50">
                    <div className="w-2 h-2 bg-navy rotate-45 -mb-1" />
                    <div className="bg-navy text-white px-2 py-1 rounded text-[10px] font-mono border border-white/20 whitespace-nowrap">
                      {Math.round(weights[factor] * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between p-3 bg-bg-page border border-border rounded-sm">
               <div className="flex items-center gap-2">
                  <span className="text-[11px] text-steel">Dominant Influence Factor:</span>
                  <span className="text-[12px] font-bold text-navy uppercase tracking-tight">
                    {factors.reduce((a, b) => weights[a] > weights[b] ? a : b).replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </span>
               </div>
               <span className="text-[10px] text-steel italic">
                 Aligned to {constituency.name} historical voting patterns
               </span>
            </div>
          </div>

        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #1a2f5a;
          cursor: pointer;
          border: 1px solid white;
        }
      `}} />
    </div>
  );
};

export default WeightConfigPanel;
