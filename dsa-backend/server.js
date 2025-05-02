// dsa-history-server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: true,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 86400
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (same database)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ DSA/History server connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Schema Definitions
const problemSchema = new mongoose.Schema({
  question: String,
  code: String,
  output: String
}, { _id: false });



// Models
const DSAAssignment = require('./models/DSAAssignment');
const History = require('./models/History');

// Response Helpers
const respond = {
  success: (res, data, status = 200) => res.status(status).json({ success: true, data }),
  error: (res, message, status = 400, details = null) => {
    const response = { success: false, message };
    if (details && process.env.NODE_ENV !== 'production') response.details = details;
    res.status(status).json(response);
  }
};

// DSA Routes
app.route('/dsa-assignments')
  .get(async (req, res) => {
    try {
      const docs = await DSAAssignment.find().sort({ createdAt: -1 }).lean();
      respond.success(res, docs);
    } catch (err) {
      respond.error(res, err.message, 500, err);
    }
  })
  .post(async (req, res) => {
    try {
      const { title, problems = [], icon } = req.body;
      if (!title || !problems.length) return respond.error(res, 'Title and problems required');
      const validProblems = problems.map(p => {
        if (!p.question || !p.code || !p.output) throw new Error('Invalid problem');
        return p;
      });
      const newDoc = new DSAAssignment({ title, icon: icon || 'FaCode', problems: validProblems });
      const saved = await newDoc.save();
      respond.success(res, saved, 201);
    } catch (err) {
      respond.error(res, err.message, 500, err);
    }
  });

app.route('/dsa-assignments/:id')
  .get(async (req, res) => {
    try {
      const doc = await DSAAssignment.findById(req.params.id).lean();
      if (!doc) return respond.error(res, 'Not found', 404);
      respond.success(res, doc);
    } catch (err) {
      respond.error(res, err.message, 500, err);
    }
  })
  .put(async (req, res) => {
    try {
      const updated = await DSAAssignment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).lean();
      if (!updated) return respond.error(res, 'Not found', 404);
      respond.success(res, updated);
    } catch (err) {
      respond.error(res, err.message, 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await DSAAssignment.findByIdAndDelete(req.params.id);
      if (!deleted) return respond.error(res, 'Not found', 404);
      respond.success(res, { message: 'Deleted successfully' });
    } catch (err) {
      respond.error(res, err.message, 500, err);
    }
  });

// History Routes
app.post('/history', async (req, res) => {
  try {
    const { code, output, errors, language } = req.body;
    
    const newHistory = new History({
      code,
      output,
      errors,
      language
    });

    const savedHistory = await newHistory.save();
    respond.success(res, savedHistory, 201);
  } catch (error) {
    console.error('Error saving history:', error);
    respond.error(res, 'Error saving history', 500, error);
  }
});

app.get('/history', async (req, res) => {
  try {
    const history = await History.find()
      .sort({ timestamp: -1 })
      .limit(10);
    respond.success(res, history);
  } catch (error) {
    console.error('Error fetching history:', error);
    respond.error(res, 'Error fetching history', 500, error);
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start Server
const PORT = process.env.DSA_HISTORY_PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 DSA/History server running on port ${PORT}`);
});