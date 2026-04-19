/**
 * CyberJoar Strategic Fusion Dashboard
 * Color Utility for Intelligence Nodes
 */

export const NODE_COLORS = {
  OSINT: {
    fill: '#3b82f6', // Tailwind blue-500
    border: '#1d4ed8', // Tailwind blue-700
    text: '#93c5fd', // Tailwind blue-300
    bg: 'rgba(59, 130, 246, 0.1)',
  },
  HUMINT: {
    fill: '#f59e0b', // Tailwind amber-500
    border: '#b45309', // Tailwind amber-700
    text: '#fcd34d', // Tailwind amber-300
    bg: 'rgba(245, 158, 11, 0.1)',
  },
  IMINT: {
    fill: '#10b981', // Tailwind emerald-500
    border: '#047857', // Tailwind emerald-700
    text: '#6ee7b7', // Tailwind emerald-300
    bg: 'rgba(16, 185, 129, 0.1)',
  },
};

export const PRIORITY_COLORS = {
  HIGH: {
    text: '#ef4444', // Tailwind red-500
    bg: 'rgba(239, 68, 68, 0.1)',
    border: '#ef4444',
  },
  MEDIUM: {
    text: '#f59e0b', // Tailwind amber-500
    bg: 'rgba(245, 158, 11, 0.1)',
    border: '#f59e0b',
  },
  LOW: {
    text: '#64748b', // Tailwind slate-500
    bg: 'rgba(100, 116, 139, 0.1)',
    border: '#64748b',
  },
};

/**
 * Returns a hex color string based on confidence score.
 * @param {number} value - Confidence score (0-100)
 */
export const getConfidenceColor = (value) => {
  if (value >= 85) return '#00e5c0'; // Cyan/Teal
  if (value >= 67) return '#22c55e'; // Green
  if (value >= 34) return '#f59e0b'; // Amber
  return '#ef4444'; // Red
};


