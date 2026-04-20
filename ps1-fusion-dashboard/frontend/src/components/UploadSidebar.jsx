import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  UploadCloud, 
  Database, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileJson, 
  RefreshCw,
  Plus
} from 'lucide-react';
import axios from 'axios';
import SidebarSection from './SidebarSection';
import { parseIntelligenceCSV } from '../utils/parseCSV';
import { parseIntelligenceJSON } from '../utils/parseJSON';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: UploadSidebar
 */

const UploadSidebar = ({ isOpen, onNodesAdded, onToast, onToggle, currentNodes, onExportJSON, onExportCSV }) => {
  const [syncing, setSyncing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(null);
  
  // IMINT Node Registration State
  const [imintForm, setImintForm] = useState({ lat: '', lng: '', label: '', imageUrl: '' });
  const [uploadedImages, setUploadedImages] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleSyncOSINT = async () => {
    setSyncing(true);
    try {
      const response = await axios.get(`${API_URL}/api/osint`);
      onNodesAdded(response.data);
      onToast({ message: `Sync complete: ${response.data.length} OSINT nodes loaded`, type: 'success' });
    } catch (err) {
      onToast({ message: 'Primary Link Failure: Metadata sync failed', type: 'error' });
    } finally {
      setTimeout(() => setSyncing(false), 800);
    }
  };

  const onDropFieldReport = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    try {
      let ingestedNodes = [];
      if (file.name.endsWith('.csv')) {
        ingestedNodes = await parseIntelligenceCSV(file);
      } else if (file.name.endsWith('.json')) {
        ingestedNodes = await parseIntelligenceJSON(file);
      } else {
        throw new Error('Unsupported tactical format');
      }

      onNodesAdded(ingestedNodes);
      onToast({ message: `Successfully ingested ${ingestedNodes.length} nodes from field report`, type: 'success' });
    } catch (err) {
      onToast({ message: `Ingestion Failure: ${err.message}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  }, [onNodesAdded, onToast]);

  const onDropImagery = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file || !file.type.startsWith('image/')) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${API_URL}/api/upload/image`, formData);
      setImintForm(prev => ({ ...prev, imageUrl: `${API_URL}${res.data.url}` }));
      setUploadedImages(prev => [{ url: `${API_URL}${res.data.url}`, id: res.data.nodeId }, ...prev]);
      onToast({ message: 'Tactical imagery uploaded. Awaiting coordinate registration.', type: 'info' });
    } catch (err) {
      onToast({ message: 'IMINT Upload Failure: Communication blocked', type: 'error' });
    } finally {
      setUploading(false);
    }
  }, [API_URL, onToast]);

  const { getRootProps: getHumintRootProps, getInputProps: getHumintInputProps, isDragActive: isHumintDragActive } = useDropzone({ 
    onDrop: onDropFieldReport,
    multiple: false,
    accept: { 'text/csv': ['.csv'], 'application/json': ['.json'] }
  });

  const { getRootProps: getImintRootProps, getInputProps: getImintInputProps, isDragActive: isImintDragActive } = useDropzone({ 
    onDrop: onDropImagery,
    multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] }
  });

  const handleRegisterImint = () => {
    if (!imintForm.lat || !imintForm.lng) {
      onToast({ message: 'Registration Failure: Coordinates required', type: 'error' });
      return;
    }

    const newNode = {
      id: `IMINT-${Date.now()}`,
      type: 'IMINT',
      label: imintForm.label || 'New IMINT Acquisition',
      lat: parseFloat(imintForm.lat),
      lng: parseFloat(imintForm.lng),
      timestamp: new Date().toISOString(),
      confidence: 100,
      priority: 'HIGH',
      source: 'Human Field Upload',
      summary: 'Manually registered IMINT node from field acquisition.',
      imageUrl: imintForm.imageUrl,
      tags: ['field', 'imagery', 'manual'],
      reviewed: false
    };

    onNodesAdded([newNode]);
    setImintForm({ lat: '', lng: '', label: '', imageUrl: '' });
    onToast({ message: 'IMINT node successfully registered and locked.', type: 'success' });
  };

  return (
    <div 
      className={`relative h-full bg-bg-elevated border-r border-border-dim transition-all duration-300 flex flex-col overflow-hidden z-[500]`}
      style={{ width: isOpen ? '280px' : '0px' }}
    >
      <button 
        onClick={onToggle}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-12 bg-bg-elevated border border-l-0 border-border-dim rounded-r flex items-center justify-center hover:bg-bg-hover transition-colors z-50 shadow-xl"
      >
        {isOpen ? <ChevronLeft size={10} className="text-accent-teal" /> : <ChevronRight size={10} className="text-accent-teal" />}
      </button>

      {isOpen && (
        <>
          <div className="p-4 border-b border-border-dim bg-bg-primary/20">
            <h2 className="font-mono text-[10px] text-text-dim letter-spacing-military uppercase font-bold flex items-center gap-2">
              <Database size={12} className="text-accent-teal" />
              INTELLIGENCE INGESTION
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {/* SECTION 1: OSINT SYNC */}
            <SidebarSection title="OSINT AUTO-SYNC">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                      <span className="text-text-secondary">MongoDB Atlas</span>
                    </div>
                    <span className="text-accent-teal-dim bg-accent-teal/5 px-1 border border-accent-teal/20">CONNECTED</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse" />
                      <span className="text-text-secondary">AWS S3 Bucket</span>
                    </div>
                    <span className="text-accent-amber/70 bg-accent-amber/5 px-1 border border-accent-amber/20">STANDBY</span>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-text-dim text-center py-1">
                  LAST SYNC: {new Date().toLocaleTimeString('en-GB')} UTC
                </div>

                <button 
                  onClick={handleSyncOSINT}
                  disabled={syncing}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-accent-teal text-[#030712] font-bold text-[10px] uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
                  {syncing ? 'Syncing...' : 'Sync Now'}
                </button>
              </div>
            </SidebarSection>

            {/* SECTION 2: HUMINT REPORTS */}
            <SidebarSection title="HUMINT FIELD REPORTS">
              <div className="pt-2">
                <div 
                  {...getHumintRootProps()}
                  className={`h-24 border border-dashed rounded-sm transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                    isHumintDragActive ? 'border-accent-teal bg-accent-teal/5' : 'border-border-bright/40 hover:border-accent-teal/60'
                  }`}
                >
                  <input {...getHumintInputProps()} />
                  <UploadCloud size={20} className={`text-text-dim group-hover:text-accent-teal transition-colors ${uploading ? 'animate-bounce' : ''}`} />
                  <span className="font-mono text-[9px] text-text-dim group-hover:text-text-secondary text-center">
                    DROP CSV OR JSON<br />FROM FIELD ASSETS
                  </span>
                </div>
                
                <div className="mt-3 flex flex-col gap-2">
                  <a 
                    href="/sample-nodes.csv" 
                    download 
                    className="flex items-center gap-2 text-[9px] font-mono text-text-dim hover:text-accent-teal transition-colors"
                  >
                    <Download size={10} /> DOWNLOAD SAMPLE CSV
                  </a>
                </div>
              </div>
            </SidebarSection>

            {/* SECTION 3: IMINT IMAGERY */}
            <SidebarSection title="IMINT IMAGERY">
              <div className="space-y-4 pt-2">
                <div 
                   {...getImintRootProps()}
                   className={`h-24 border border-dashed rounded-sm transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                     isImintDragActive ? 'border-accent-teal bg-accent-teal/5' : 'border-border-bright/40 hover:border-accent-teal/60'
                   }`}
                >
                  <input {...getImintInputProps()} />
                  <ImageIcon size={20} className="text-text-dim group-hover:text-accent-emerald transition-colors" />
                  <span className="font-mono text-[9px] text-text-dim group-hover:text-text-secondary text-center text-center">
                    DROP IMAGERY (JPG)<br />FOR TAGGING
                  </span>
                </div>

                {imintForm.imageUrl && (
                  <div className="space-y-2 p-2 bg-bg-primary/40 border border-border-dim rounded-sm animate-slide-in">
                    <img src={imintForm.imageUrl} className="w-full h-20 object-cover border border-border-dim" alt="Tagging Preview" />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="LAT"
                        value={imintForm.lat}
                        onChange={(e) => setImintForm({...imintForm, lat: e.target.value})}
                        className="bg-transparent border border-border-dim px-2 py-1 font-mono text-[10px] focus:border-accent-teal outline-none"
                      />
                      <input 
                        type="text" 
                        placeholder="LNG"
                        value={imintForm.lng}
                        onChange={(e) => setImintForm({...imintForm, lng: e.target.value})}
                        className="bg-transparent border border-border-dim px-2 py-1 font-mono text-[10px] focus:border-accent-teal outline-none"
                      />
                    </div>
                    <input 
                      type="text" 
                      placeholder="IDENTIFIER / LABEL"
                      value={imintForm.label}
                      onChange={(e) => setImintForm({...imintForm, label: e.target.value})}
                      className="w-full bg-transparent border border-border-dim px-2 py-1 font-mono text-[10px] focus:border-accent-teal outline-none"
                    />
                    <button 
                      onClick={handleRegisterImint}
                      className="w-full py-1.5 bg-accent-emerald text-[#030712] font-bold text-[9px] uppercase hover:brightness-110 active:scale-95"
                    >
                      REGISTER NODE
                    </button>
                  </div>
                )}

                {uploadedImages.length > 0 && !imintForm.imageUrl && (
                  <div className="grid grid-cols-4 gap-1">
                    {uploadedImages.slice(0, 4).map((img, i) => (
                      <div key={i} className="aspect-square bg-bg-hover border border-border-dim overflow-hidden opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                        <img src={img.url} className="w-full h-full object-cover" alt="History" />
                      </div>
                    ))}
                    {uploadedImages.length > 4 && (
                      <div className="aspect-square bg-bg-hover flex items-center justify-center font-mono text-[9px] text-text-dim border border-border-dim">
                        +{uploadedImages.length - 4}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </SidebarSection>
          </div>

          {/* EXPORT SECTION */}
          <div className="p-4 border-t border-border-dim bg-bg-surface space-y-2">
             <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[8px] text-text-dim uppercase tracking-widest">EXPORT UTILITIES</span>
                <span className="font-mono text-[8px] text-accent-teal">ALL NODES STORED: {currentNodes.length}</span>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={onExportJSON}
                  className="flex items-center justify-center gap-2 py-1.5 border border-border-dim text-[9px] font-mono text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all rounded-[2px]"
                >
                  <FileJson size={10} /> JSON
                </button>
                <button 
                  onClick={onExportCSV}
                  className="flex items-center justify-center gap-2 py-1.5 border border-border-dim text-[9px] font-mono text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all rounded-[2px]"
                >
                  <Download size={10} /> CSV
                </button>
             </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadSidebar;


