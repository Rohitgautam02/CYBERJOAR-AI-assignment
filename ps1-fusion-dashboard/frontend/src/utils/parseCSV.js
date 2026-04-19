import Papa from 'papaparse';

/**
 * CyberJoar Strategic Fusion Dashboard
 * CSV Ingestion Utility
 */

/**
 * Parses CSV file using PapaParse.
 * Matches rows to the intelligence node schema.
 */
export const parseIntelligenceCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validatedNodes = results.data.map((row, index) => {
          // Precise validation
          const lat = parseFloat(row.lat);
          const lng = parseFloat(row.lng);
          const confidence = parseInt(row.confidence);

          return {
            id: row.id || `CSV-${Math.random().toString(36).substr(2, 9)}`,
            type: ['OSINT', 'HUMINT', 'IMINT'].includes(row.type) ? row.type : 'OSINT',
            label: row.label || 'Unlabeled Node',
            lat: isNaN(lat) ? 0 : lat,
            lng: isNaN(lng) ? 0 : lng,
            timestamp: row.timestamp || new Date().toISOString(),
            confidence: isNaN(confidence) ? 50 : confidence,
            priority: ['HIGH', 'MEDIUM', 'LOW'].includes(row.priority) ? row.priority : 'MEDIUM',
            source: row.source || 'Local CSV File',
            summary: row.summary || 'Intelligence report successfully ingested.',
            tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
            metadata: row.metadata ? JSON.parse(row.metadata) : {},
            reviewed: false
          };
        });
        
        resolve(validatedNodes);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};


