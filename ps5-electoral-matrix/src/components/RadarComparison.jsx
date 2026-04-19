/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Radar Comparison Chart (PS5 Standard)
 */

import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatFactorLabel } from '../utils/formatters';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const RadarComparison = ({ candidates }) => {
  // Map factors to Recharts format
  const factors = Object.keys(candidates[0].scores);
  
  const data = factors.map(factor => {
    const entry = { subject: formatFactorLabel(factor).toUpperCase() };
    candidates.forEach(cand => {
      entry[cand.id] = cand.scores[factor];
    });
    return entry;
  });

  return (
    <div className="bg-bg-card border border-border rounded-lg shadow-premium p-6 h-[460px] animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[14px] font-bold text-navy tracking-tight uppercase">Factor Distribution Radar</h3>
          <p className="text-[11px] text-steel">Intelligence footprint comparison across all operational variables</p>
        </div>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#dde3ed" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#6c7a8d', fontSize: 9, fontWeight: 700 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 10]} 
              tick={{ fill: '#6c7a8d', fontSize: 10 }}
            />
            
            {candidates.map((cand) => (
              <Radar
                key={cand.id}
                name={cand.name.split(' ')[0]}
                dataKey={cand.id}
                stroke={CANDIDATE_COLORS[cand.colorIndex]}
                fill={CANDIDATE_COLORS[cand.colorIndex]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
            
            <Legend 
              verticalAlign="bottom" 
              height={36}
              content={({ payload }) => (
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                  {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                       <span className="text-[10px] font-bold text-navy uppercase tracking-tighter">
                         {entry.value}
                       </span>
                    </div>
                  ))}
                </div>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border/40 text-center">
        <span className="text-[10px] text-steel font-mono italic">
          * Tactical footprint identifies asymmetric strengths and vulnerability gaps.
        </span>
      </div>
    </div>
  );
};

export default RadarComparison;
