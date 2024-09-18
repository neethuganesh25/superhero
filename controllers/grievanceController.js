const Grievance = require('../models/Grievance');

// Create grievance
exports.createGrievance = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newGrievance = new Grievance({
      title,
      description,
      user: req.user.id, // Assuming user ID is attached to request
    });
    await newGrievance.save();
    res.status(201).json({ message: 'Grievance submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
