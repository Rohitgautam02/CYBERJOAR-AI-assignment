import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import SourceFilterBar from './components/SourceFilterBar';
import UploadSidebar from './components/UploadSidebar';
import MapView from './components/MapView';
import HoverPopup from './components/HoverPopup';
import NodeDetailModal from './components/NodeDetailModal';
import ToastNotification from './components/ToastNotification';
import MapLegend from './components/MapLegend';
import { useNodes } from './hooks/useNodes';

/**
 * CyberJoar Strategic Fusion Dashboard
 * ROOT APPLICATION COMPONENT
 * AUTHOR: Antigravity AI
 */

const App = () => {
  const { 
    nodes, 
    setNodes, 
    addNodes, 
    updateNode, 
    exportAsJSON, 
    exportAsCSV,
    stats 
  } = useNodes();

  const [filteredTypes, setFilteredTypes] = useState(['OSINT', 'HUMINT', 'IMINT']);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  // Initial Data Sync
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [osintRes, humintRes] = await Promise.all([
          axios.get(`${API_URL}/api/osint`),
          axios.get(`${API_URL}/api/humint`)
        ]);
        
        const initialNodes = [...osintRes.data, ...humintRes.data];
        setNodes(initialNodes);
        
        setToast({ 
          message: `Intel link established — ${initialNodes.length} nodes synchronized`, 
          type: 'success' 
        });
      } catch (err) {
        setToast({ 
          message: 'Tactical Sync Error: Could not connect to primary intelligence database', 
          type: 'error' 
        });
      }
    };

    fetchInitialData();
    
    // Auto-collapse sidebar on smaller screens
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [setNodes, API_URL]);

  // Combined Filtering Logic
  const visibleNodes = useMemo(() => {
    return nodes.filter(n => filteredTypes.includes(n.type));
  }, [nodes, filteredTypes]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg-primary font-sans text-text-primary">
      {/* GLOBAL HEADER */}
      <Header />

      {/* TACTICAL STATS BAR */}
      <StatsBar stats={stats} />

      {/* FILTER CONTROLS */}
      <SourceFilterBar 
        active={filteredTypes}
        onChange={setFilteredTypes}
        counts={{
          OSINT: stats.osint,
          HUMINT: stats.humint,
          IMINT: stats.imint
        }}
        visibleCount={visibleNodes.length}
        totalCount={stats.total}
        onExport={exportAsJSON}
      />

      <main className="flex flex-1 overflow-hidden relative">
        {/* INGESTION SIDEBAR */}
        <UploadSidebar 
          isOpen={sidebarOpen}
          onNodesAdded={addNodes}
          onToast={setToast}
          onToggle={() => setSidebarOpen(prev => !prev)}
          currentNodes={nodes}
          onExportJSON={exportAsJSON}
          onExportCSV={exportAsCSV}
        />

        {/* GEOSPATIAL OPERATIONAL VIEW */}
        <div className="flex-1 relative">
          <MapView 
            nodes={visibleNodes}
            onHover={setHoveredNode}
            onNodeClick={setSelectedNode}
          />
          
          <MapLegend />

          {/* QUICK BRIEF OVERLAY */}
          {hoveredNode && (
            <HoverPopup node={hoveredNode} />
          )}
        </div>
      </main>

      {/* FULL INTELLIGENCE MODAL */}
      {selectedNode && (
        <NodeDetailModal 
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onMarkReviewed={(id) => {
            updateNode(id, { reviewed: true });
            setSelectedNode(prev => ({ ...prev, reviewed: true }));
            setToast({ message: `Intelligence node ${id} marked as verified.`, type: 'success' });
          }}
        />
      )}

      {/* SYSTEM NOTIFICATIONS */}
      {toast && (
        <ToastNotification 
          toast={toast}
          onDone={() => setToast(null)}
        />
      )}

      {/* GLOBAL BG DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-[-10] opacity-[0.03]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--accent-teal)_1px,_transparent_1px)] bg-[length:32px_32px]" />
      </div>
    </div>
  );
};

export default App;


