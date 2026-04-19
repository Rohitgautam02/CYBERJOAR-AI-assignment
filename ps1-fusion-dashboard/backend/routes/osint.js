const express = require('express');
const router = express.Router();
const mockOsint = require('../data/mockOsint');

/**
 * GET /api/osint
 * Retrieves all Open Source Intelligence nodes.
 */
router.get('/', (req, res) => {
  try {
    // In a real app, this would query a database
    res.json(mockOsint);
  } catch (error) {
    console.error('Error fetching OSINT data:', error);
    res.status(500).json({ error: 'Internal server error fetching intelligence' });
  }
});

/**
 * GET /api/osint/:id
 * Retrieves a single OSINT node by ID.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const node = mockOsint.find(n => n.id === id);
  
  if (!node) {
    return res.status(404).json({ error: `OSINT node ${id} not found` });
  }
  
  res.json(node);
});

module.exports = router;


