import React, { useState, useEffect } from 'react';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: Header
 */

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLocal = (date) => {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const d = date.getDate().toString().padStart(2, '0');
    const m = months[date.getMonth()];
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    
    return {
      date: `${d} ${m} ${y}`,
      time: `${h}:${min}:${s} SYSTEM`
    };
  };

  const { date: dateStr, time: timeStr } = formatLocal(time);

  return (
    <header className="h-[52px] sticky top-0 z-[100] bg-bg-elevated border-b border-border-dim classified-header flex items-center justify-between px-4">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* Shield Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H12.01" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Title */}
        <div className="flex flex-col">
          <h1 className="font-orbitron text-[13px] text-accent-teal leading-none tracking-[0.3em]">
            CYBERJOAR
          </h1>
          <span className="font-orbitron text-[10px] text-text-secondary mt-1 tracking-[0.2em]">
            STRATEGIC FUSION DASHBOARD
          </span>
        </div>

        <div className="h-6 w-[1px] bg-border-dim mx-4" />

        {/* Classification */}
        <div className="px-2 py-0.5 border border-accent-amber/30 rounded-sm">
          <span className="font-mono text-[9px] text-accent-amber">
            CLASSIFICATION: RESTRICTED
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* Clock */}
        <div className="flex flex-col items-end">
          <span className="font-mono text-[11px] text-text-secondary leading-none">
            {dateStr}
          </span>
          <span className="font-mono text-[13px] text-text-primary mt-1 font-medium">
            {timeStr}
          </span>
        </div>

        {/* LIVE Indicator */}
        <div className="flex items-center gap-2 px-3 h-8 bg-bg-primary/50 border border-border-dim rounded-sm">
          <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse-red" />
          <span className="font-mono text-[10px] text-accent-red tracking-[0.2em] font-bold">
            LIVE
          </span>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="font-mono text-[9px] text-[#22c55e] letter-spacing-military">
            ALL SYSTEMS NOMINAL
          </span>
        </div>

        <span className="font-mono text-[9px] text-text-dim">
          OC.41335.2026
        </span>
      </div>
    </header>
  );
};

export default Header;


