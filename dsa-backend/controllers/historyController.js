const History = require('../models/History');
const { success, error } = require('../services/responseHandler');

/**
 * @desc    Save code execution history
 * @route   POST /api/history
 * @access  Private
 */
const saveHistory = async (req, res) => {
  try {
    const { code, output, errors, language } = req.body;
    
    if (!code || !language) {
      return error(res, 'Code and language are required', 400);
    }

    const newHistory = new History({
      user: req.user.id, // Assuming you have user authentication
      code: code.trim(),
      output: (output || '').trim(),
      errors: (errors || '').trim(),
      language: language.trim()
    });

    const savedHistory = await newHistory.save();
    success(res, savedHistory, 201);
  } catch (err) {
    error(res, 'Failed to save history', 500, err);
  }
};

/**
 * @desc    Get user's code execution history
 * @route   GET /api/history
 * @access  Private
 */
const getHistory = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const history = await History.find({ user: req.user.id })
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();

    success(res, history);
  } catch (err) {
    error(res, 'Failed to fetch history', 500, err);
  }
};

module.exports = {
  saveHistory,
  getHistory
};