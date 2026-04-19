/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Factor Slider (PS5 Standard)
 */

import React from 'react';

const FactorSlider = ({ label, value, onChange, candidateColor }) => {
  // Determine text color based on score severity
  const getBadgeColor = (val) => {
    if (val >= 8) return 'text-emerald';
    if (val >= 6) return 'text-emerald opacity-70';
    if (val >= 4) return 'text-amber';
    return 'text-crimson';
  };

  const factorId = `slider-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="space-y-1.5 factor-slider">
      <div className="flex justify-between items-center px-0.5">
        <label 
          htmlFor={factorId}
          className="text-[12px] font-sans font-medium text-steel"
        >
          {label}
        </label>
        <div className={`font-mono text-[13px] font-bold ${getBadgeColor(value)}`}>
          {value.toFixed(1)}
        </div>
      </div>

      <div className="relative flex items-center h-5">
        <input
          id={factorId}
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-navy z-10"
          style={{
            background: `linear-gradient(to right, ${candidateColor} 0%, ${candidateColor} ${value * 10}%, #dde3ed ${value * 10}%, #dde3ed 100%)`
          }}
        />
        
        {/* Shadow Track for consistency */}
        <div className="absolute inset-x-0 h-[4px] bg-border rounded-full -z-0" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #${factorId}::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: ${candidateColor};
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        #${factorId}::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: ${candidateColor};
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}} />
    </div>
  );
};

export default FactorSlider;
