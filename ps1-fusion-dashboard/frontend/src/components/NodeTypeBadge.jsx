import React from 'react';
import { NODE_COLORS } from '../utils/nodeColors';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: NodeTypeBadge
 */

const NodeTypeBadge = ({ type }) => {
  const colors = NODE_COLORS[type] || NODE_COLORS.OSINT;

  return (
    <span 
      className="inline-flex items-center px-2 py-0.5 border text-center font-mono text-[9px] font-medium letter-spacing-military"
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        borderRadius: '2px'
      }}
    >
      {type}
    </span>
  );
};

export default NodeTypeBadge;


