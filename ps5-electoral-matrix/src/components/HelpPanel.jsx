/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Help Panel (PS5 Standard)
 */

import React from 'react';

const HelpPanel = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-bg-card border-b border-border shadow-sm animate-slide-in overflow-hidden z-[900] pt-16">
      <div className="max-w-[1440px] mx-auto p-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-bold text-navy uppercase tracking-wider">How to Use</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-navy text-white text-[9px] flex items-center justify-center rounded-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <p className="text-[12px] text-steel leading-snug">Select a constituency to load regional historical voting patterns and intelligence weights.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-navy text-white text-[9px] flex items-center justify-center rounded-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <p className="text-[12px] text-steel leading-snug">Adjust factor scores for each candidate based on latest OSINT briefings or field reports.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 bg-navy text-white text-[9px] flex items-center justify-center rounded-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <p className="text-[12px] text-steel leading-snug">Monitor the Probability of Win (PoW) matrix as real-time variables shift the projection.</p>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-bold text-navy uppercase tracking-wider">Factor Weights</h3>
            <p className="text-[12px] text-steel leading-relaxed">
              Factors like <span className="font-semibold text-navy">Caste/Religious Base</span> or <span className="font-semibold text-navy-light">Digital Sentiment</span> carry different weights depending on the region's historical behavior. Use the configuration panel to model custom scenarios.
            </p>
            <div className="p-3 bg-bg-page border-l-2 border-gold rounded-sm">
              <p className="text-[11px] italic text-steel">Note: Weights are auto-normalized to ensure the total influence remains exactly 100%.</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-bold text-navy uppercase tracking-wider">PoW Calculation</h3>
            <p className="text-[12px] text-steel leading-relaxed">
              The Probability of Win (PoW) is derived from the normalized weighted sum of all intelligence factors, adjusted by the <span className="font-semibold text-crimson">Turnout Bias Engine</span>.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-steel">SCORE × WEIGHT</span>
                <div className="h-[1px] bg-border-dark my-0.5" />
                <span className="text-[10px] font-mono font-bold text-steel">TURNOUT BIAS</span>
              </div>
              <span className="text-xl text-border-dark">→</span>
              <span className="text-[14px] font-mono font-bold text-navy">PoW %</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpPanel;
