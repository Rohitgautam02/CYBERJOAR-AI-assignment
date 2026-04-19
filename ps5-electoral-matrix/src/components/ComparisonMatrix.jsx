/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Comparison Matrix (PS5 Standard)
 */

import React from 'react';
import { formatProbability, formatVoterCount } from '../utils/formatters';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const ComparisonMatrix = ({ candidates, weights, powResults, constituency }) => {
  const factors = Object.keys(weights);

  // Helper to find the winner of a specific factor
  const getFactorWinnerId = (factor) => {
    return candidates.reduce((a, b) => (a.scores[factor] > b.scores[factor] ? a : b)).id;
  };

  // Helper to find the lowest of a specific factor
  const getFactorLowestId = (factor) => {
    return candidates.reduce((a, b) => (a.scores[factor] < b.scores[factor] ? a : b)).id;
  };

  const leaderId = powResults[0].candidateId;

  return (
    <div className="bg-bg-card border border-border rounded-lg shadow-premium overflow-hidden animate-fade-in relative">
      
      {/* Scroll Hint for Desktop */}
      <div className="absolute top-0 right-0 p-2 opacity-30 flex items-center gap-1 pointer-events-none md:hidden">
        <span className="text-[10px] uppercase font-mono tracking-tighter">Swipe Left</span>
        <div className="w-4 h-[1px] bg-navy" />
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-navy text-white font-mono text-[11px] uppercase tracking-wider">
              <th className="px-6 py-4 text-left border-r border-white/10 min-w-[220px] sticky left-0 bg-navy z-20">
                INTELLIGENCE FACTOR
              </th>
              {candidates.map((cand) => (
                <th 
                  key={cand.id} 
                  className="px-6 py-4 text-center min-w-[180px] border-r border-white/5 relative"
                  style={{ borderBottom: `4px solid ${CANDIDATE_COLORS[cand.colorIndex]}` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CANDIDATE_COLORS[cand.colorIndex] }} />
                       <span className="font-bold">{cand.name.split(' ')[0]}</span>
                    </div>
                    <span className="text-[9px] opacity-60">{cand.partyShortCode}</span>
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-center w-[100px] border-l border-white/20">
                WEIGHT
              </th>
            </tr>
          </thead>
          
          <tbody className="font-sans">
            {factors.map((factor) => {
              const winnerId = getFactorWinnerId(factor);
              const lowestId = getFactorLowestId(factor);
              
              return (
                <tr key={factor} className="border-b border-border transition-colors hover:bg-bg-page/40">
                  {/* Factor Info */}
                  <td className="px-6 py-4 border-r border-border sticky left-0 bg-white z-10">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-navy">
                        {factor.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </span>
                      <span className="text-[10px] text-steel italic mt-0.5 leading-tight">
                        Impact on constituency stability
                      </span>
                    </div>
                  </td>

                  {/* Candidate Scores */}
                  {candidates.map((cand) => {
                    const isWinner = cand.id === winnerId;
                    const isLowest = cand.id === lowestId;
                    const score = cand.scores[factor];
                    const candColor = CANDIDATE_COLORS[cand.colorIndex];

                    return (
                      <td 
                        key={cand.id} 
                        className={`px-6 py-4 text-center border-r border-border/40 transition-all ${
                          isWinner ? 'bg-gold/10' : ''
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <div className={`font-mono text-[22px] font-bold ${
                            isWinner ? 'text-gold' : isLowest ? 'text-crimson/70' : 'text-navy'
                          }`}>
                            {score.toFixed(1)}
                          </div>
                          
                          {/* Intensity Bar */}
                          <div className="w-full h-1 bg-border/40 rounded-full mt-2 overflow-hidden max-w-[100px]">
                            <div 
                              className="h-full transition-all duration-1000" 
                              style={{ width: `${score * 10}%`, backgroundColor: candColor }}
                            />
                          </div>

                          {isWinner && (
                            <span className="text-[8px] font-mono font-bold text-gold uppercase mt-1 tracking-tighter">
                              ▲ LEADING
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}

                  {/* Weight column */}
                  <td className="px-6 py-4 text-center bg-bg-page/50 border-l border-border">
                    <span className="font-mono text-[12px] text-steel font-bold">
                      ×{(weights[factor] || 0).toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            })}

            {/* WEIGHTED SCORE TOTALS */}
            <tr className="bg-navy/5 border-t-4 border-navy">
              <td className="px-6 py-5 border-r border-border sticky left-0 bg-bg-page/50 z-10">
                <span className="text-[14px] font-bold text-navy uppercase tracking-tight">
                  WEIGHTED ANALYTIC SCORE
                </span>
              </td>
              {powResults.sort((a,b) => {
                const aIdx = candidates.findIndex(c => c.id === a.candidateId);
                const bIdx = candidates.findIndex(c => c.id === b.candidateId);
                return aIdx - bIdx;
              }).map((result) => {
                const isLeader = result.candidateId === leaderId;
                const candColor = CANDIDATE_COLORS[result.colorIndex];

                return (
                  <td key={result.candidateId} className={`px-6 py-5 text-center ${isLeader ? 'bg-gold/5' : ''}`}>
                    <div 
                      className={`font-mono text-[18px] font-bold inline-block px-3 py-1 rounded w-full ${
                        isLeader ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'text-navy'
                      }`}
                    >
                      {result.adjustedScore.toFixed(2)}
                    </div>
                  </td>
                );
              })}
              <td className="bg-navy bg-opacity-5"></td>
            </tr>

            {/* PROBABILITY OF WIN */}
            <tr className="bg-navy text-white">
              <td className="px-6 py-6 border-r border-white/10 sticky left-0 bg-navy z-10">
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold tracking-widest uppercase">
                    PROBABILITY OF WIN
                  </span>
                  <span className="text-[10px] text-white/50 font-mono mt-1 uppercase">
                    Aggregated Metric (PoW)
                  </span>
                </div>
              </td>
              {powResults.map((result) => {
                const isLeader = result.candidateId === leaderId;
                const candColor = CANDIDATE_COLORS[result.colorIndex];

                return (
                  <td 
                    key={result.candidateId} 
                    className={`px-6 py-6 text-center border-r border-white/5 relative ${
                      isLeader ? 'bg-navy-light shadow-inner' : ''
                    }`}
                  >
                    {isLeader && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gold animate-pulse" />
                    )}
                    <span className={`font-mono text-[28px] font-bold block ${isLeader ? 'text-gold' : 'text-white'}`}>
                      {result.pow}%
                    </span>
                    {isLeader && (
                      <span className="text-[9px] font-bold tracking-widest text-gold opacity-90 mt-1 uppercase block">
                        Projected Leader
                      </span>
                    )}
                  </td>
                );
              })}
              <td className="bg-navy"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Matrix Note */}
      <div className="p-3 bg-bg-page border-t border-border flex items-center justify-between">
        <span className="text-[10px] text-steel font-sans italic">
          * Matrix weights are dynamically calibrated to {constituency.name}'s historical electoral patterns.
        </span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gold" />
          <span className="text-[10px] font-bold text-navy uppercase tracking-tighter">LEADER BIAS APPLIED</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMatrix;
