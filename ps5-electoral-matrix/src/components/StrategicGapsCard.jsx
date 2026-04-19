/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Strategic Gaps Card (PS5 Standard)
 */

import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { getSeverityColor } from '../utils/scoreEngine';
import { formatFactorLabel } from '../utils/formatters';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const StrategicGapsCard = ({ strategicGaps }) => {
  // Show top 4 gaps
  const topGaps = strategicGaps.slice(0, 4);

  return (
    <div className="bg-bg-card border border-border rounded-lg shadow-premium p-6 flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber" />
          <h3 className="text-[14px] font-bold text-navy tracking-tight uppercase">Strategic Opportunity Gaps</h3>
        </div>
        <div className="px-2 py-0.5 border border-border rounded-sm">
           <span className="text-[9px] font-mono text-steel font-bold uppercase tracking-widest">Analytics Mode</span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {topGaps.map((gap, index) => {
          const color = getSeverityColor(gap.severity);
          
          return (
            <div key={index} className="p-4 bg-bg-page border border-border/60 rounded-sm relative overflow-hidden group hover:border-navy-light transition-all">
              {/* Severity Bar */}
              <div 
                className="absolute top-0 bottom-0 left-0 w-1" 
                style={{ backgroundColor: color }}
              />

              <div className="flex justify-between items-start mb-3">
                 <div>
                    <span className="block text-[12px] font-bold text-navy uppercase tracking-tight">
                       {formatFactorLabel(gap.factor)}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <span 
                         className="text-[9px] font-mono font-bold uppercase px-1 py-0.5 rounded-sm"
                         style={{ backgroundColor: `${color}15`, color: color }}
                       >
                         {gap.severity}
                       </span>
                       <span className="text-[10px] text-steel font-medium">Gap Score: {gap.gap.toFixed(1)}</span>
                    </div>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[14px] font-mono font-bold text-navy">
                      {(gap.gap * 10).toFixed(0)}%
                    </span>
                    <span className="text-[8px] font-mono text-steel uppercase">Variance</span>
                 </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2 border-t border-border/20">
                 <div className="flex items-center gap-2">
                    <TrendingUp size={10} className="text-emerald" />
                    <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CANDIDATE_COLORS[gap.leader.colorIndex] }} />
                       <span className="text-[10px] font-bold text-navy">{gap.leader.name.split(' ')[0]}</span>
                       <span className="text-[10px] font-mono text-emerald font-bold">({gap.leader.score.toFixed(1)})</span>
                    </div>
                 </div>
                 
                 <ChevronRight size={10} className="text-border-dark" />
                 
                 <div className="flex items-center gap-2">
                    <TrendingDown size={10} className="text-crimson" />
                    <div className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CANDIDATE_COLORS[gap.trailer.colorIndex] }} />
                       <span className="text-[10px] font-bold text-navy">{gap.trailer.name.split(' ')[0]}</span>
                       <span className="text-[10px] font-mono text-crimson font-bold">({gap.trailer.score.toFixed(1)})</span>
                    </div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-navy/5 border border-navy/10 rounded-sm">
         <p className="text-[11px] text-navy-light leading-relaxed">
           <span className="font-bold">Operational Insight:</span> {topGaps[0].leader.name.split(' ')[0]} holds a significant tactical advantage in <span className="font-bold">{(topGaps[0].gap * 10).toFixed(0)}%</span> of the primary influence variables compared to trailing candidates.
         </p>
      </div>
    </div>
  );
};

export default StrategicGapsCard;
