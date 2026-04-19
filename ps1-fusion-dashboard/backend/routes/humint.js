const express = require('express');
const router = express.Router();
const mockHumint = require('../data/mockHumint');

/**
 * GET /api/humint
 * Retrieves all Human Intelligence nodes.
 */
router.get('/', (req, res) => {
  try {
    // In a real app, this would query a database
    res.json(mockHumint);
  } catch (error) {
    console.error('Error fetching HUMINT data:', error);
    res.status(500).json({ error: 'Internal server error fetching intelligence' });
  }
});

/**
 * GET /api/humint/:id
 * Retrieves a single HUMINT node by ID.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const node = mockHumint.find(n => n.id === id);
  
  if (!node) {
    return res.status(404).json({ error: `HUMINT node ${id} not found` });
  }
  
  res.json(node);
});

module.exports = router;


