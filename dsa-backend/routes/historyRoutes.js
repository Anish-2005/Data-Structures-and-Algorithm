const express = require('express');
const router = express.Router();
const {
  saveHistory,
  getHistory
} = require('../controllers/historyController');

/**
 * @desc    Save code execution history
 * @route   POST /api/history
 * @access  Private
 */
router.post('/', saveHistory);

/**
 * @desc    Get code execution history
 * @route   GET /api/history
 * @access  Private
 */
router.get('/', getHistory);

module.exports = router;