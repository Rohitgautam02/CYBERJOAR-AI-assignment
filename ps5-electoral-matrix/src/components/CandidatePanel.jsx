/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Candidate Panel (PS5 Standard)
 */

import React from 'react';
import { Plus, Users } from 'lucide-react';
import CandidateCard from './CandidateCard';

const CandidatePanel = ({ candidates, onScoreChange, onAddCandidate, onRemoveCandidate }) => {
  return (
    <div className="space-y-6">
      {/* Section Sub-header */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-navy rounded-sm text-white">
             <Users size={16} />
           </div>
           <div>
              <h2 className="text-[18px] font-bold text-navy tracking-tight">
                Candidate Intelligence Profiles
              </h2>
              <p className="text-[13px] text-steel">
                Refine factor scores based on latest OSINT and field intelligence
              </p>
           </div>
         </div>

         {candidates.length < 4 && (
           <button 
             onClick={onAddCandidate}
             className="flex items-center gap-2 px-4 py-2 bg-white border border-border-dark text-[12px] font-bold text-navy hover:bg-navy hover:text-white hover:border-navy transition-all rounded-sm shadow-premium group"
           >
             <Plus size={14} className="group-hover:rotate-90 transition-transform" />
             ADD CANDIDATE MATRIX
           </button>
         )}
      </div>

      {/* Grid of Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate}
            onScoreChange={onScoreChange}
            onRemove={onRemoveCandidate}
            isRemovable={candidates.length > 2}
          />
        ))}

        {/* Dash-bordered placeholder for adding new candidate if < 3 (to always show grid fill) */}
        {candidates.length < 3 && (
          <div 
            onClick={onAddCandidate}
            className="flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-border-dark rounded-lg bg-bg-page/50 hover:bg-white hover:border-navy-light transition-all cursor-pointer group"
          >
             <div className="w-12 h-12 rounded-full border-2 border-border-dark flex items-center justify-center text-steel group-hover:border-navy-light group-hover:text-navy group-hover:scale-110 transition-all">
               <Plus size={24} />
             </div>
             <span className="mt-4 font-mono text-[11px] text-steel font-bold tracking-widest uppercase group-hover:text-navy">
               REGISTER NEW CANDIDATE
             </span>
             <p className="mt-1 text-[10px] text-steel/60">Limit: 4 intelligence profiles per matrix</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatePanel;
