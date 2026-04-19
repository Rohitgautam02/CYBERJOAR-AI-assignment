const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { v4: uuidv4 } = require('uuid');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
const imageDir = path.join(uploadDir, 'images');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, imageDir);
    } else {
      cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * POST /api/upload/csv
 */
router.post('/csv', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CSV file uploaded' });
  }

  try {
    const fileContent = fs.readFileSync(req.file.path, 'utf8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    const validatedNodes = [];
    const errors = [];

    records.forEach((row, index) => {
      const lat = parseFloat(row.lat);
      const lng = parseFloat(row.lng);
      const confidence = parseInt(row.confidence);

      if (isNaN(lat) || isNaN(lng)) {
        errors.push(`Row ${index + 1}: Invalid coordinates`);
        return;
      }

      if (!['OSINT', 'HUMINT', 'IMINT'].includes(row.type)) {
        errors.push(`Row ${index + 1}: Invalid intelligence type`);
        return;
      }

      validatedNodes.push({
        id: row.id || `UPLOAD-${uuidv4().slice(0, 8)}`,
        type: row.type,
        label: row.label || 'Unlabeled Node',
        lat,
        lng,
        timestamp: row.timestamp || new Date().toISOString(),
        confidence: isNaN(confidence) ? 50 : confidence,
        priority: ['HIGH', 'MEDIUM', 'LOW'].includes(row.priority) ? row.priority : 'MEDIUM',
        source: row.source || 'CSV Upload',
        summary: row.summary || 'No summary provided',
        tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
        reviewed: false
      });
    });

    res.json({ 
      success: true, 
      nodes: validatedNodes, 
      count: validatedNodes.length,
      errors 
    });

  } catch (error) {
    console.error('CSV Parsing error:', error);
    res.status(500).json({ error: 'Failed to parse CSV intelligence data' });
  }
});

/**
 * POST /api/upload/json
 */
router.post('/json', upload.single('file'), (req, res) => {
  let nodesData;
  
  try {
    if (req.file) {
      nodesData = JSON.parse(fs.readFileSync(req.file.path, 'utf8'));
    } else {
      nodesData = req.body;
    }

    if (!Array.isArray(nodesData)) {
      return res.status(400).json({ error: 'JSON payload must be an array of nodes' });
    }

    const validatedNodes = nodesData.map(node => ({
      ...node,
      id: node.id || `JSON-${uuidv4().slice(0, 8)}`,
      timestamp: node.timestamp || new Date().toISOString(),
      reviewed: false
    }));

    res.json({ success: true, nodes: validatedNodes, count: validatedNodes.length });
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON payload' });
  }
});

/**
 * POST /api/upload/image
 */
router.post('/image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  res.json({ 
    success: true, 
    url: `/uploads/images/${path.basename(req.file.path)}`,
    nodeId: uuidv4() 
  });
});

/**
 * GET /api/upload/samples
 */
router.get('/samples', (req, res) => {
  const csvSample = "id,type,label,lat,lng,timestamp,confidence,priority,source,summary,tags\n" +
    "SML-001,OSINT,Sample Node,28.6,77.2,2026-04-15T08:00:00Z,90,HIGH,Sample,Test Summary,sample,test";
  
  const jsonSample = [
    {
      id: "SML-002",
      type: "HUMINT",
      label: "Sample JSON Node",
      lat: 19.07,
      lng: 72.87,
      confidence: 85,
      priority: "MEDIUM",
      source: "Manual",
      summary: "Sample intelligence summary text."
    }
  ];

  res.json({ csvSample, jsonSample });
});

module.exports = router;


