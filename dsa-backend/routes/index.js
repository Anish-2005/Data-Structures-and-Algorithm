const express = require('express');
const router = express.Router();
const dsaAssignmentRoutes = require('./dsaAssignmentRoutes');
const historyRoutes = require('./historyRoutes');
const { API_BASE_PATH } = require('../config/constants');

// Health Check Endpoint
router.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  try {
    await mongoose.connection.db.admin().ping();
    success(res, {
      status: 'OK',
      database: dbStatus,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    });
  } catch (err) {
    error(res, 'Database ping failed', 500, err);
  }
});

router.use('/dsa-assignments', dsaAssignmentRoutes);
router.use('/history', historyRoutes);

module.exports = router;