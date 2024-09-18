const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Grievance', grievanceSchema);
