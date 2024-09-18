const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const sendEmail = require('../services/emailService');
 
router.post('/submit', async (req, res) => {
  const { name, email, date, title, description } = req.body;

  try {
    // Save the grievance to the database
    const newGrievance = new Grievance({ name, email, date, title, description });
    await newGrievance.save();

    // Create grievance details for the email
    const grievanceDetails = { name, email, date, title, description };

    try {
      // Send email to superhero after grievance submission
      const superheroEmail = 'superhero@example.com'; // Replace with actual superhero email
      await sendEmail(superheroEmail, grievanceDetails);
      
      // Respond with success
      res.status(200).send({ message: 'Grievance submitted successfully and email sent!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Grievance submitted' });
    }
  } catch (error) {
    console.error('Error submitting grievance:', error);
    res.status(500).json({ error: 'Failed to submit grievance' });
  }
});

// Route to fetch all grievances
router.get('/', async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.status(200).json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch grievances', error });
  }
});

// Route to approve a grievance
router.put('/:id/approve', async (req, res) => {
  try {
    const grievance = await Grievance.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Error approving grievance', error });
  }
});

// Route to reject a grievance
router.put('/:id/reject', async (req, res) => {
  try {
    const grievance = await Grievance.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.json(grievance);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting grievance', error });
  }
});

router.get('/overview', async (req, res) => {
  try {
    const total = await Grievance.countDocuments();
    const approved = await Grievance.countDocuments({ status: 'Approved' });
    const pending = await Grievance.countDocuments({ status: 'Pending' });
    const rejected = await Grievance.countDocuments({ status: 'Rejected' });

    res.json({ total, approved, pending, rejected });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overview data', error });
  }
});

// Get recent grievances
router.get('/recent', async (req, res) => {
  try {
    const recentGrievances = await Grievance.find().sort({ createdAt: -1 }).limit(5);
    res.json(recentGrievances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent grievances', error });
  }
});




module.exports = router;
