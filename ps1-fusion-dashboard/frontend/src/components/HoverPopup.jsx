import React from 'react';
import { formatTimestamp, formatCoords, truncate } from '../utils/formatters';
import { NODE_COLORS, PRIORITY_COLORS } from '../utils/nodeColors';
import NodeTypeBadge from './NodeTypeBadge';
import ConfidenceBar from './ConfidenceBar';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: HoverPopup
 */

const HoverPopup = ({ node }) => {
  if (!node) return null;

  const priorityStyle = PRIORITY_COLORS[node.priority] || PRIORITY_COLORS.MEDIUM;

  return (
    <div className="fixed top-[132px] right-4 z-[500] w-[320px] bg-bg-surface border border-border-bright rounded-[4px] shadow-2xl animate-slide-in overflow-hidden">
      {/* HEADER */}
      <div className="bg-bg-elevated p-3 border-b border-border-dim">
        <div className="flex justify-between items-center mb-2">
          <NodeTypeBadge type={node.type} />
          <span 
            className="text-[9px] font-mono px-2 py-0.5 border letter-spacing-military font-bold"
            style={{ 
              color: priorityStyle.text, 
              borderColor: priorityStyle.border,
              backgroundColor: priorityStyle.bg
            }}
          >
            {node.priority} PRIORITY
          </span>
        </div>
        <h3 className="text-[13px] font-medium text-text-primary leading-tight">
          {node.label}
        </h3>
      </div>

      {/* BODY */}
      <div className="p-3 space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-mono text-accent-teal">
            {formatCoords(node.lat, node.lng)}
          </span>
          <span className="text-[9px] font-mono text-text-dim">
            {formatTimestamp(node.timestamp).split(' | ')[1]}
          </span>
        </div>

        <ConfidenceBar value={node.confidence} />

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-text-dim uppercase tracking-tighter">SOURCE</span>
            <span className="text-[10px] text-text-secondary truncate">{node.source}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-mono text-text-dim uppercase tracking-tighter">TIMESTAMP</span>
            <span className="text-[10px] text-text-secondary">{formatTimestamp(node.timestamp).split(' | ')[0]}</span>
          </div>
        </div>

        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {node.tags.map(tag => (
              <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 bg-bg-primary border border-border-dim text-text-dim">
                 #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-border-dim">
          <p className="text-[11px] text-text-secondary italic leading-normal">
            {truncate(node.summary, 120)}
          </p>
        </div>
      </div>

      {/* IMAGE / PATTERN AREA */}
      <div className="h-[120px] bg-bg-primary border-t border-border-dim relative overflow-hidden">
        {node.imageUrl ? (
          <img 
            src={node.imageUrl} 
            alt="Intelligence Brief Imagery" 
            className="w-full h-full object-cover grayscale brightness-75"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-grid-pattern">
            <span className="font-mono text-[9px] text-text-dim uppercase letter-spacing-military text-center">
              NO DIRECT IMAGERY<br />AVAILABLE
            </span>
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-surface/60 to-transparent" />
      </div>

      {/* FOOTER */}
      <div className="p-2 bg-bg-surface text-center border-t border-border-dim">
        <span className="text-[9px] text-text-dim italic font-mono">
          Click marker for full intelligence brief
        </span>
      </div>
    </div>
  );
};

export default HoverPopup;


