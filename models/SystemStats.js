const mongoose = require('mongoose');

const systemStatsSchema = new mongoose.Schema({
  activeUsers: { type: Number, default: 0 },
  weeklySubmissions: { type: Number, default: 0 },
  pendingGrievances: { type: Number, default: 0 },
  avgResponseTime: { type: String, default: 'N/A' }
});

module.exports = mongoose.model('SystemStats', systemStatsSchema);
