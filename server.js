const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const grievanceRoutes = require('./routes/grievances');
const userRoutes = require('./routes/users');
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/users', userRoutes);

// Route to handle grievance submission
app.post('/api/grievances', async (req, res) => {
  const { name, email, title, description, date } = req.body;

  if (!name || !email || !title || !description || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const grievance = {
    name,
    email,
    title,
    description,
    date,
  };

  res.status(200).json({ message: 'Grievance submitted successfully' });
});

// Route to handle chatbot messages
const responses = {
  "hii": "Hi there! How can I assist you?",
  "hello": "Hi there! How can I assist you?",
  "hey": "Hi there! How can I assist you?",
  "how are you": "I'm doing great! How about you?",
  "fine": "ohh that's good",
  "what is your name": "I'm a superhero chatbot.",
  "bye": "Goodbye! Have a great day!",
  "ok": "ok",
  "how to submit grievance": "Once you are logged in, you can submit your details in the form provided, and after that, our superhero will take action.",
  "how to login to this system": "If you have already created an account, log in using your ID and password, or if you are a new user, register."
};

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  const botResponse = responses[userMessage] || "Sorry, I don't understand that.";
  res.json({ response: botResponse });
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
