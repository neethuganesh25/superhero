const express = require('express');
const router = express.Router();
const SystemStats = require('../models/SystemStats');

// Get system stats
router.get('/stats', async (req, res) => {
  try {
    // For simplicity, assuming there's only one document
    const stats = await SystemStats.findOne();
    res.json(stats || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
