import React from 'react';
import { formatTimestamp } from '../utils/formatters';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: StatsBar
 */

const StatsBar = ({ stats }) => {
  const { total, osint, humint, imint, highPriority, reviewed, lastSync } = stats;

  const StatItem = ({ label, value, colorClass, isLast = false }) => (
    <div className="flex items-center">
      <div className="flex items-center gap-2 px-6">
        <span className="font-mono text-[9px] text-text-dim tracking-widest uppercase">
          {label}
        </span>
        <span className={`font-mono text-[12px] font-bold ${colorClass}`}>
          {value}
        </span>
      </div>
      {!isLast && <div className="h-4 w-[1px] bg-border-dim" />}
    </div>
  );

  return (
    <div className="h-[36px] bg-bg-surface border-b border-border-dim flex items-center justify-center">
      <StatItem 
        label="Total Nodes" 
        value={total.toString().padStart(2, '0')} 
        colorClass="text-text-primary" 
      />
      <StatItem 
        label="OSINT" 
        value={osint.toString().padStart(2, '0')} 
        colorClass="text-accent-blue" 
      />
      <StatItem 
        label="HUMINT" 
        value={humint.toString().padStart(2, '0')} 
        colorClass="text-accent-amber" 
      />
      <StatItem 
        label="IMINT" 
        value={imint.toString().padStart(2, '0')} 
        colorClass="text-accent-emerald" 
      />
      <StatItem 
        label="High Priority" 
        value={highPriority.toString().padStart(2, '0')} 
        colorClass="text-accent-red" 
      />
      <StatItem 
        label="Reviewed" 
        value={reviewed.toString().padStart(2, '0')} 
        colorClass="text-accent-teal" 
      />
      <StatItem 
        label="Last Sync" 
        value={lastSync ? lastSync.split('T')[1].split('.')[0] + ' UTC' : 'PENDING'} 
        colorClass="text-text-dim"
        isLast={true}
      />
    </div>
  );
};

export default StatsBar;


