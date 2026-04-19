import { useState, useMemo } from 'react';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Custom Hook: Intelligence Node Management
 */

export const useNodes = () => {
  const [nodes, setNodes] = useState([]);

  /**
   * Adds new nodes while deduplicating by ID.
   */
  const addNodes = (newNodes) => {
    setNodes(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const filteredNew = newNodes.filter(n => !existingIds.has(n.id));
      return [...prev, ...filteredNew];
    });
  };

  /**
   * Removes a node from the state.
   */
  const removeNode = (id) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  /**
   * Updates a specific node's data.
   */
  const updateNode = (id, patch) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...patch } : n));
  };

  /**
   * Computes intelligence statistics globally.
   */
  const stats = useMemo(() => {
    return {
      total: nodes.length,
      osint: nodes.filter(n => n.type === 'OSINT').length,
      humint: nodes.filter(n => n.type === 'HUMINT').length,
      imint: nodes.filter(n => n.type === 'IMINT').length,
      highPriority: nodes.filter(n => n.priority === 'HIGH').length,
      reviewed: nodes.filter(n => n.reviewed).length,
      lastSync: new Date().toISOString()
    };
  }, [nodes]);

  /**
   * Export all nodes as a formatted JSON file.
   */
  const exportAsJSON = () => {
    const dataStr = JSON.stringify(nodes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `cyberjoar_export_${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  /**
   * Export all nodes as a CSV file.
   */
  const exportAsCSV = () => {
    if (nodes.length === 0) return;
    
    const headers = Object.keys(nodes[0]).filter(k => k !== 'metadata').join(',');
    const rows = nodes.map(n => {
      return Object.entries(n)
        .filter(([k]) => k !== 'metadata')
        .map(([_, v]) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',');
    });
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cyberjoar_export_${Date.now()}.csv`);
    link.click();
  };

  return {
    nodes,
    setNodes,
    addNodes,
    removeNode,
    updateNode,
    exportAsJSON,
    exportAsCSV,
    stats
  };
};


