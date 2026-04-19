/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Export & Operations Panel (PS5 Standard)
 */

import React, { useState } from 'react';
import { Download, Share2, ClipboardCheck, FileJson, FileSpreadsheet } from 'lucide-react';

const ExportPanel = ({ onExportJSON, onGetURL }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = onGetURL();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    // Basic CSV implementation for demonstrate
    const data = "Candidate,Party,PoW%\nLeader,NDA,42.5\nRunnerUp,UOB,31.2";
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'cyberjoar_intelligence_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleJSONExport = () => {
    const data = onExportJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'cyberjoar_matrix_export.json');
    a.click();
  };

  return (
    <div className="bg-bg-card border border-border rounded-lg shadow-premium p-6 animate-fade-in h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Download size={18} className="text-navy" />
          <h3 className="text-[14px] font-bold text-navy tracking-tight uppercase">Operational Intelligence Export</h3>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleShare}
            className="w-full flex items-center justify-between p-4 bg-navy text-white rounded-sm hover:bg-navy-light transition-all shadow-lg group"
          >
            <div className="flex items-center gap-3">
              {copied ? <ClipboardCheck size={18} className="text-gold" /> : <Share2 size={18} />}
              <span className="text-[12px] font-bold uppercase tracking-wider">
                {copied ? 'LINK COPIED TO CLIPBOARD' : 'GENERATE SHAREABLE INTEL URL'}
              </span>
            </div>
            {!copied && <span className="text-[10px] font-mono opacity-50 px-2 py-0.5 border border-white/20 rounded">HTTPS</span>}
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleJSONExport}
              className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-border hover:border-navy-light hover:bg-bg-page transition-all group"
            >
              <div className="p-3 bg-navy/5 text-navy group-hover:bg-navy group-hover:text-white transition-all rounded-full">
                <FileJson size={20} />
              </div>
              <span className="text-[10px] font-bold text-navy uppercase tracking-widest">EXPORT RAW JSON</span>
            </button>
            <button 
              onClick={downloadCSV}
              className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-border hover:border-navy-light hover:bg-bg-page transition-all group"
            >
              <div className="p-3 bg-emerald/5 text-emerald group-hover:bg-emerald group-hover:text-white transition-all rounded-full">
                <FileSpreadsheet size={20} />
              </div>
              <span className="text-[10px] font-bold text-navy uppercase tracking-widest">TECHNICAL CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/40 text-center">
         <p className="text-[10px] text-steel italic leading-snug">
           Exports include encrypted factor weights and current turnout scenarios for offline synthesis.
         </p>
         <div className="mt-4 flex flex-col items-center gap-1 opacity-20">
            <div className="w-12 h-[1px] bg-navy" />
            <span className="font-mono text-[8px] font-bold text-navy uppercase">CyberJoar Protocol 5G</span>
         </div>
      </div>
    </div>
  );
};

export default ExportPanel;
