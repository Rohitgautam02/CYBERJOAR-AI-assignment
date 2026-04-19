import React from 'react';
import { getConfidenceColor } from '../utils/nodeColors';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: ConfidenceBar
 */

const ConfidenceBar = ({ value, showLabel = true }) => {
  const color = getConfidenceColor(value);
  const isHighPerformance = value >= 85;

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between items-center text-[9px] font-mono font-medium text-text-dim">
          <span className="letter-spacing-military">CONFIDENCE</span>
          <span style={{ color }}>{value}%</span>
        </div>
      )}
      <div className="w-full h-1 bg-border-dim rounded-[2px] overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out animate-fill-bar ${isHighPerformance ? 'glow-teal' : ''}`}
          style={{ 
            width: `${value}%`, 
            backgroundColor: color,
            '--target-width': `${value}%`
          }}
        />
      </div>
    </div>
  );
};

export default ConfidenceBar;


