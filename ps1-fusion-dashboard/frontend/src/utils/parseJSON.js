/**
 * CyberJoar Strategic Fusion Dashboard
 * JSON Ingestion Utility
 */

/**
 * Validates and parses JSON files for intelligence ingestion.
 */
export const parseIntelligenceJSON = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (!Array.isArray(data)) {
          throw new Error('Intelligence payload must be a JSON array of nodes.');
        }

        const nodes = data.map(node => ({
          ...node,
          id: node.id || `JSON-${Math.random().toString(36).substr(2, 9)}`,
          type: ['OSINT', 'HUMINT', 'IMINT'].includes(node.type) ? node.type : 'OSINT',
          label: node.label || 'Unlabeled JSON Node',
          lat: parseFloat(node.lat) || 0,
          lng: parseFloat(node.lng) || 0,
          timestamp: node.timestamp || new Date().toISOString(),
          confidence: parseInt(node.confidence) || 50,
          priority: ['HIGH', 'MEDIUM', 'LOW'].includes(node.priority) ? node.priority : 'MEDIUM',
          source: node.source || 'Local JSON File',
          summary: node.summary || 'Intelligence report successfully parsed from JSON source.',
          tags: Array.isArray(node.tags) ? node.tags : (node.tags ? node.tags.split(',') : []),
          metadata: node.metadata || {},
          reviewed: false
        }));

        resolve(nodes);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Manual file read tactical failure.'));
    reader.readAsText(file);
  });
};


