/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Global Header (PS5 Standard)
 */

import React from 'react';
import { Shield, HelpCircle } from 'lucide-react';

const Header = ({ onHelpToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-bg-card border-b-2 border-navy z-[1000] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between">
        
        {/* LEFT: Branding */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-navy" strokeWidth={2.5} />
            <div className="flex flex-col -space-y-1">
              <span className="font-sans text-[10px] text-steel letter-spacing-military uppercase font-bold">
                CYBERJOAR
              </span>
              <h1 className="font-sans text-[17px] text-navy font-bold tracking-tight">
                ELECTORAL INTELLIGENCE MATRIX
              </h1>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-border mx-2 hidden md:block" />
          
          <div className="hidden lg:block">
            <span className="font-sans text-[11px] text-steel font-medium">
              PS5 — PREDICTIVE ELECTORAL ANALYTICS
            </span>
          </div>
        </div>

        {/* RIGHT: Status & Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-gold/10 border border-gold rounded-[2px] animate-pulse-badge">
              <span className="font-mono text-[9px] text-gold font-bold">CLASSIFIED BETA</span>
            </div>
            <div className="px-2 py-0.5 bg-navy/5 border border-navy/30 rounded-[2px] hidden sm:block">
              <span className="font-mono text-[9px] text-navy font-bold uppercase">OSINT-POWERED</span>
            </div>
          </div>

          <button 
            onClick={onHelpToggle}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-bg-page hover:bg-navy hover:text-white border border-border transition-all group"
            title="Operational Help"
          >
            <HelpCircle size={18} className="transition-transform group-hover:scale-110" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
