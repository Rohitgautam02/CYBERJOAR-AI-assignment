import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: SidebarSection
 */

const SidebarSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border-dim">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-bg-hover transition-colors"
      >
        <span className="font-mono text-[10px] text-text-dim letter-spacing-military uppercase font-bold">
          {title}
        </span>
        {isOpen ? <ChevronDown size={14} className="text-text-dim" /> : <ChevronRight size={14} className="text-text-dim" />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarSection;


