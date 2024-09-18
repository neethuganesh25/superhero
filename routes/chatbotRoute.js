const express = require('express');
const router = express.Router();
const { generateBotResponse } = require('../services/openaiService'); // Adjust path as necessary

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const botResponse = await generateBotResponse(userMessage);
    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error generating bot response:', error);
    res.status(500).json({ error: 'Failed to get response from the chatbot' });
  }
});

module.exports = router;
