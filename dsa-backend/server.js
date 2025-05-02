require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const History = require('./models/History'); // History model import

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: '*',  // Allow all origins (this is for testing, ideally restrict it to your frontend's origin)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// DSA Assignment Schema
const problemSchema = new mongoose.Schema({
  question: String,
  code: String,
  output: String
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  title: String,
  icon: String,
  problems: [problemSchema],
  createdAt: { type: Date, default: Date.now }
});

const DSAAssignment = mongoose.model('DSAAssignment', assignmentSchema);

// Response Helpers
const respond = {
  success: (res, data, status = 200) => res.status(status).json({ success: true, data }),
  error: (res, message, status = 400, details = null) => {
    const response = { success: false, message };
    if (details && process.env.NODE_ENV !== 'production') response.details = details;
    res.status(status).json(response);
  }
};

// DSA Assignment Routes
const router = express.Router();

function asyncHandler(fn) {
  return (req, res) => fn(req, res).catch(err => respond.error(res, err.message, 500, err));
}

// DSA Assignment Routes
router.route('/dsa-assignments')
  .get(asyncHandler(async (req, res) => {
    const assignments = await DSAAssignment.find().sort({ createdAt: -1 }).lean();
    respond.success(res, assignments);
  }))
  .post(asyncHandler(async (req, res) => {
    const { title, problems = [], icon = 'FaDatabase' } = req.body;
    if (!title || !problems.length) {
      return respond.error(res, 'Title and at least one problem are required');
    }

    const validProblems = problems.map(({ question, code, output }) => {
      if (!question || !code || !output) {
        throw new Error('Each problem must have question, code, and output');
      }
      return { question, code, output };
    });

    const newAssignment = new DSAAssignment({ title, icon, problems: validProblems });
    const saved = await newAssignment.save();
    respond.success(res, saved, 201);
  }));

router.route('/dsa-assignments/:id')
  .get(asyncHandler(async (req, res) => {
    const doc = await DSAAssignment.findById(req.params.id).lean();
    if (!doc) return respond.error(res, 'Not found', 404);
    respond.success(res, doc);
  }))
  .put(asyncHandler(async (req, res) => {
    const updated = await DSAAssignment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).lean();
    if (!updated) return respond.error(res, 'Not found', 404);
    respond.success(res, updated);
  }))
  .delete(asyncHandler(async (req, res) => {
    const deleted = await DSAAssignment.findByIdAndDelete(req.params.id);
    if (!deleted) return respond.error(res, 'Not found', 404);
    respond.success(res, { message: 'Deleted successfully' });
  }));

// History Routes
app.post('/api/history', async (req, res) => {
  try {
    const { code, output, errors, language } = req.body;

    const newHistory = new History({
      code,
      output,
      errors,
      language
    });

    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ message: 'Error saving history' });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    const history = await History.find()
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Error fetching history' });
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

// 404 handler
app.use((req, res) => {
  respond.error(res, 'Endpoint not found', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  respond.error(res, 'Internal Server Error', 500, err.stack);
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || 'development'}`);
});

