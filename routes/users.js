// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

module.exports = router;
