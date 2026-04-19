import React from 'react';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: MapLegend
 */

const MapLegend = () => {
  const legendItems = [
    { label: 'OSINT', color: '#3b82f6', pulse: false },
    { label: 'HUMINT', color: '#f59e0b', pulse: false },
    { label: 'IMINT', color: '#10b981', pulse: true },
  ];

  return (
    <div className="absolute bottom-6 right-4 z-[1000] bg-bg-surface/95 border border-border-dim rounded-sm p-3 w-[140px] shadow-2xl pointer-events-none">
      <div className="text-[9px] font-mono font-bold text-text-dim letter-spacing-military mb-2">
        LEGEND
      </div>
      
      <div className="space-y-2 mb-3">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              {item.pulse && (
                <div 
                  className="absolute w-4 h-4 rounded-full border border-accent-emerald/40 animate-node-pulse" 
                />
              )}
            </div>
            <span className="text-[10px] font-mono text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border-dim pt-2 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse-red" />
          <span className="text-[10px] font-mono text-text-secondary">HIGH PRIORITY</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full border border-dashed border-text-dim" />
          <span className="text-[10px] font-mono text-text-secondary">ESTIMATED</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;


