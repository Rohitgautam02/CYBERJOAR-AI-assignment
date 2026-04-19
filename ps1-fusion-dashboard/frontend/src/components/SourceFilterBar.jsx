import React from 'react';
import { Download } from 'lucide-react';
import { NODE_COLORS } from '../utils/nodeColors';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: SourceFilterBar
 */

const SourceFilterBar = ({ active, onChange, counts, visibleCount, totalCount, onExport }) => {
  const sources = [
    { id: 'OSINT', label: 'OSINT', color: NODE_COLORS.OSINT.fill },
    { id: 'HUMINT', label: 'HUMINT', color: NODE_COLORS.HUMINT.fill },
    { id: 'IMINT', label: 'IMINT', color: NODE_COLORS.IMINT.fill },
  ];

  const toggleFilter = (id) => {
    if (active.includes(id)) {
      onChange(active.filter(t => t !== id));
    } else {
      onChange([...active, id]);
    }
  };

  const setAll = () => onChange(['OSINT', 'HUMINT', 'IMINT']);

  return (
    <div className="h-[44px] bg-bg-elevated border-b border-border-dim flex items-center px-4 gap-2">
      <span className="font-mono text-[9px] text-text-dim letter-spacing-military mr-2">
        FILTER SOURCES:
      </span>

      <button
        onClick={setAll}
        className={`px-3 py-1 text-[11px] font-mono border transition-all duration-150 rounded-[2px] ${
          active.length === 3 
            ? 'bg-accent-teal/10 border-accent-teal text-accent-teal' 
            : 'bg-transparent border-border-dim text-text-secondary hover:bg-bg-hover'
        }`}
      >
        ALL
      </button>

      {sources.map((src) => {
        const isActive = active.includes(src.id);
        const count = counts[src.id] || 0;

        return (
          <button
            key={src.id}
            onClick={() => toggleFilter(src.id)}
            className="group flex items-center gap-2 px-3 py-1 text-[11px] font-mono border transition-all duration-150 rounded-[2px]"
            style={{
              backgroundColor: isActive ? `${src.color}1a` : 'transparent',
              borderColor: isActive ? src.color : 'var(--border-dim)',
              color: isActive ? src.color : 'var(--text-secondary)'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: src.color }} 
            />
            {src.label}
            <span className="opacity-60">({count})</span>
          </button>
        );
      })}

      <div className="ml-auto flex items-center gap-4">
        <span className="font-mono text-[10px] text-text-dim">
          {visibleCount} OF {totalCount} NODES VISIBLE
        </span>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-3 py-1 border border-border-bright text-text-primary hover:bg-border-bright/20 transition-all rounded-[2px] font-mono text-[10px]"
        >
          <Download size={14} className="text-accent-teal" />
          EXPORT JSON
        </button>
      </div>
    </div>
  );
};

export default SourceFilterBar;


