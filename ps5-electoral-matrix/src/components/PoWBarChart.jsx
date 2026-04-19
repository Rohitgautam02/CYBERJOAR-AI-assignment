/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: PoW Probability Bar Chart (PS5 Standard)
 */

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-navy p-3 border border-white/20 shadow-hero rounded-sm">
        <p className="text-[10px] font-mono text-white/60 mb-1 uppercase tracking-tighter">Candidate Win Probability</p>
        <p className="text-[14px] font-bold text-white mb-0.5">{data.name}</p>
        <p className="text-[11px] font-bold text-gold">{data.party}</p>
        <div className="h-[1px] bg-white/10 my-2" />
        <div className="flex items-center justify-between gap-4">
          <span className="text-[12px] font-mono text-white">PoW METRIC</span>
          <span className="text-[16px] font-mono font-bold text-gold">{data.pow}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const PoWBarChart = ({ powResults }) => {
  // Sort by index for consistent display regardless of lead
  const sortedData = [...powResults].sort((a,b) => {
     return a.colorIndex - b.colorIndex;
  });

  return (
    <div className="bg-bg-card border border-border rounded-lg shadow-premium p-6 h-[460px] animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[14px] font-bold text-navy tracking-tight uppercase">Probability of Win (PoW) Index</h3>
          <p className="text-[11px] text-steel">Aggregated win percentage based on weighted matrix scores</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-navy/5 border border-navy/20 rounded-sm">
          <div className="w-2 h-2 rounded-full bg-navy animate-pulse" />
          <span className="text-[9px] font-mono font-bold text-navy uppercase">LIVE MODEL</span>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={sortedData} 
            layout="vertical" 
            margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="2 2" horizontal={false} stroke="#dde3ed" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              hide 
            />
            <YAxis 
              dataKey="party" 
              type="category" 
              tick={{ fill: '#1a2f5a', fontSize: 11, fontWeight: 700 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            
            <Bar dataKey="pow" radius={[0, 4, 4, 0]}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CANDIDATE_COLORS[entry.colorIndex]} />
              ))}
              <LabelList 
                dataKey="pow" 
                position="right" 
                formatter={(val) => `${val}%`}
                style={{ fill: '#1a2f5a', fontSize: 13, fontWeight: 800, fontFamily: 'JetBrains Mono' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center gap-6 justify-center overflow-x-auto whitespace-nowrap">
        {sortedData.map((cand) => (
          <div key={cand.candidateId} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CANDIDATE_COLORS[cand.colorIndex] }} />
            <span className="text-[10px] font-bold text-navy uppercase tracking-tighter">
              {cand.name}
            </span>
            <span className="text-[10px] text-steel opacity-50">({cand.party})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoWBarChart;
