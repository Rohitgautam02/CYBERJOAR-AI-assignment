/**
 * CyberJoar Electoral Intelligence Matrix
 * Component: Sentiment Feed (PS5 Standard)
 */

import React from 'react';
import { Twitter, Newspaper, MessageSquare, Facebook, ArrowUpRight } from 'lucide-react';

const CANDIDATE_COLORS = ['#1a4fa0', '#c0392b', '#1a7a4a', '#7b3fa0'];

const SentimentFeed = ({ items, candidates }) => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'twitter': return <Twitter size={14} className="text-[#1DA1F2]" />;
      case 'news': return <Newspaper size={14} className="text-navy" />;
      case 'forum': return <MessageSquare size={14} className="text-amber" />;
      case 'facebook': return <Facebook size={14} className="text-[#1877F2]" />;
      default: return <MessageSquare size={14} />;
    }
  };

  const getSentimentStyle = (sentiment) => {
    switch (sentiment) {
      case 'POSITIVE': return 'bg-emerald/10 text-emerald border-emerald/20';
      case 'NEGATIVE': return 'bg-crimson/10 text-crimson border-crimson/20';
      default: return 'bg-steel/10 text-steel border-steel/20';
    }
  };

  return (
    <div className="bg-bg-card border border-border rounded-lg shadow-premium flex flex-col h-[500px] animate-fade-in relative">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
           <Twitter size={18} className="text-navy" />
           <h3 className="text-[14px] font-bold text-navy tracking-tight uppercase">OSINT Digital Discourse</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald/5 border border-emerald/20 rounded-sm">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
           <span className="text-[9px] font-mono font-bold text-emerald uppercase">Live Feed</span>
        </div>
      </div>

      {/* Feed List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        <div className="divide-y divide-border/40">
          {items.map((item) => {
            const candidate = candidates.find(c => c.id === item.candidateId);
            const candColor = candidate ? CANDIDATE_COLORS[candidate.colorIndex] : '#6c7a8d';

            return (
              <div key={item.id} className="p-4 hover:bg-bg-page/50 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-bg-page border border-border rounded-sm">
                        {getPlatformIcon(item.platform)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-navy leading-none">
                          {item.source}
                        </span>
                        <span className="text-[9px] text-steel font-mono mt-1">
                          {item.timestamp}
                        </span>
                      </div>
                   </div>
                   <div className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-mono font-bold border ${getSentimentStyle(item.sentiment)}`}>
                      {item.sentiment}
                   </div>
                </div>

                <p className="text-[12.5px] text-navy font-sans leading-relaxed mb-3">
                  {item.content}
                </p>

                <div className="flex items-center justify-between pt-1">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shadow-sm" style={{ backgroundColor: candColor }} />
                      <span className="text-[10px] font-bold text-navy uppercase tracking-tighter">
                        {item.candidateName}
                      </span>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-steel">
                        {item.engagements} engagements
                      </span>
                      <ArrowUpRight size={12} className="text-steel opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-bg-page border-t border-border flex items-center justify-center">
         <button className="text-[10px] font-bold text-navy-light uppercase tracking-widest hover:underline">
           LOAD HISTORICAL ARCHIVE
         </button>
      </div>
    </div>
  );
};

export default SentimentFeed;
