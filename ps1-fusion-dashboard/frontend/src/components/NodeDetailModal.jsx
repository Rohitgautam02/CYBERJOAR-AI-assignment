import React from 'react';
import { X, Copy, CheckCircle2, Download, Globe, Clock, Shield, BarChart3, Tag, Database } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import ConfidenceBar from './ConfidenceBar';
import NodeTypeBadge from './NodeTypeBadge';
import { formatTimestamp, formatCoords } from '../utils/formatters';
import { PRIORITY_COLORS } from '../utils/nodeColors';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: NodeDetailModal
 */

const NodeDetailModal = ({ node, onClose, onMarkReviewed }) => {
  if (!node) return null;

  const priorityStyle = (node && node.priority && PRIORITY_COLORS[node.priority]) 
    ? PRIORITY_COLORS[node.priority] 
    : PRIORITY_COLORS.MEDIUM;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Silent success as per system aesthetic
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(node, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `intel_brief_${node.id}.json`);
    linkElement.click();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[680px] max-h-[85vh] bg-bg-surface border border-border-bright rounded-[4px] shadow-[0_0_40px_rgba(0,229,192,0.1)] overflow-hidden flex flex-col animate-scale-in">
        {/* MODAL HEADER */}
        <div className="bg-bg-elevated p-5 pb-4 border-b border-border-dim">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 border border-accent-teal/40 bg-accent-teal/5 rounded-sm">
                <span className="font-mono text-[10px] text-accent-teal font-bold tracking-wider">
                  {node.id}
                </span>
              </div>
              <NodeTypeBadge type={node.type} />
              <div 
                className="px-2 py-1 border rounded-sm font-mono text-[10px] font-bold"
                style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text, borderColor: priorityStyle.border }}
              >
                {node.priority} PRIORITY
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-accent-red/20 hover:text-accent-red text-text-dim transition-all rounded-sm"
            >
              <X size={20} />
            </button>
          </div>
          
          <h2 className="text-xl font-medium text-text-primary leading-tight font-sans">
            {node.label}
          </h2>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-8">
            {/* LEFT COLUMN: Metadata & Summary */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-text-dim tracking-widest uppercase">
                    <Database size={10} /> SOURCE
                  </span>
                  <p className="text-[12px] text-text-secondary">{node.source}</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-text-dim tracking-widest uppercase">
                    <Clock size={10} /> TIMESTAMP
                  </span>
                  <p className="text-[12px] text-text-secondary">{formatTimestamp(node.timestamp)}</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-text-dim tracking-widest uppercase">
                    <Globe size={10} /> COORDINATES
                  </span>
                  <button 
                    onClick={() => copyToClipboard(`${node.lat}, ${node.lng}`)}
                    className="flex items-center gap-2 text-[12px] text-accent-teal font-mono hover:text-white transition-colors"
                  >
                    {formatCoords(node.lat, node.lng)} <Copy size={12} className="opacity-50" />
                  </button>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-text-dim tracking-widest uppercase">
                    <Shield size={10} /> REVIEW STATUS
                  </span>
                  <p className={`text-[12px] font-medium ${node.reviewed ? 'text-accent-teal' : 'text-accent-amber'}`}>
                    {node.reviewed ? 'VERIFIED' : 'PENDING REVIEW'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                 <ConfidenceBar value={node.confidence} />
              </div>

              {node.tags && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {node.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-2 py-1 bg-bg-primary border border-border-dim rounded-sm text-[10px] font-mono text-text-dim">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="h-[1px] bg-border-dim w-full" />

              <div className="space-y-3">
                <span className="text-[9px] font-mono text-text-dim tracking-widest uppercase">INTELLIGENCE SUMMARY</span>
                <p className="text-[13px] text-text-primary leading-relaxed">
                  {node.summary}
                </p>
              </div>

              {node.metadata && Object.keys(node.metadata).length > 0 && (
                <div className="mt-6 p-4 bg-bg-primary/50 border border-border-dim rounded-sm">
                  <span className="text-[9px] font-mono text-text-dim tracking-widest uppercase block mb-3">EXTENDED METADATA</span>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(node.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-[11px] font-mono border-b border-border-dim/30 pb-1">
                        <span className="text-text-dim uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-text-secondary">{Array.isArray(value) ? value.join(', ') : value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Visual Confirmation */}
            <div className="space-y-6">
               <div className="space-y-2">
                  <span className="text-[9px] font-mono text-text-dim tracking-widest uppercase">VISUAL CONFIRMATION</span>
                  {node.imageUrl ? (
                    <div className="relative border border-border-bright rounded-sm overflow-hidden group">
                      <img 
                        src={node.imageUrl} 
                        className="w-full h-[260px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700" 
                        alt="Target Satellite Feed" 
                      />
                      <div className="absolute top-2 right-2 bg-accent-teal/80 px-2 py-0.5 rounded-sm">
                         <span className="text-[8px] font-mono text-black font-bold">IMAGERY CONFIRMED</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] border border-border-dim relative bg-bg-primary overflow-hidden">
                       <MapContainer 
                          center={[node.lat, node.lng]} 
                          zoom={10} 
                          className="w-full h-full grayscale opacity-60 pointer-events-none"
                          zoomControl={false}
                          dragging={false}
                          scrollWheelZoom={false}
                        >
                          <TileLayer 
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}" 
                          />
                          <CircleMarker 
                            center={[node.lat, node.lng]}
                            radius={8}
                            fillColor="#00e5c0"
                            color="#fff"
                            weight={1}
                            fillOpacity={0.8}
                          />
                        </MapContainer>
                        <div className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none">
                            <div className="border border-accent-teal/40 bg-black/60 px-3 py-1 backdrop-blur-sm">
                              <span className="text-[9px] font-mono text-accent-teal letter-spacing-military uppercase">COORDINATES LOCKED</span>
                            </div>
                        </div>
                    </div>
                  )}
               </div>

               <div className="p-4 border border-border-dim bg-bg-elevated/40 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-border-dim bg-bg-primary flex items-center justify-center">
                      <BarChart3 size={18} className="text-text-dim" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-text-primary uppercase tracking-wider">Tactical Value</h4>
                      <p className="text-[10px] text-text-dim">Priority rating: {node.priority}</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-text-secondary italic leading-snug">
                     "This node indicates a potential correlation with higher level strategic shifts observed in sector 4. Monitoring recommended."
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-5 bg-bg-elevated border-t border-border-dim flex justify-between items-center">
          <button 
             onClick={() => onMarkReviewed && onMarkReviewed(node.id)}
             disabled={node.reviewed}
             className={`flex items-center gap-2 px-4 py-2 border transition-all rounded-sm font-mono text-[11px] tracking-widest ${
               node.reviewed 
               ? 'bg-accent-teal/10 border-accent-teal text-accent-teal cursor-default' 
               : 'bg-transparent border-border-bright text-text-primary hover:bg-border-bright/20'
             }`}
          >
            {node.reviewed ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 border border-current rounded-full" />}
            {node.reviewed ? 'VERIFIED DISPATCH' : 'MARK AS REVIEWED'}
          </button>

          <button 
             onClick={downloadJSON}
             className="flex items-center gap-2 px-4 py-2 bg-transparent border border-border-dim text-text-secondary hover:text-text-primary hover:border-text-primary transition-all rounded-sm font-mono text-[11px] tracking-widest"
          >
            <Download size={14} /> EXPORT INTELLIGENCE
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default NodeDetailModal;


