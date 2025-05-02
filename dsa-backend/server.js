require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

// Import models
const DSAAssignment = require('./models/DSAAssignment');
const History = require('./models/History');

const app = express();

// Enhanced Middleware Stack
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://*"]
    }
  }
}));
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database Connection with Retry Logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa-labs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 50,
    socketTimeoutMS: 45000
  })
  .then(() => console.log('✅ MongoDB connection established'))
  .catch(err => {
    console.error('❌ MongoDB connection failed, retrying in 5 seconds...', err);
    setTimeout(connectWithRetry, 5000);
  });
};
connectWithRetry();

// Response Handler Factory
const createResponseHandler = (req, res) => ({
  success: (data, status = 200) => res.status(status).json({ success: true, data }),
  error: (message, status = 400, details = null) => {
    const response = { 
      success: false, 
      message,
      path: req.path,
      timestamp: new Date().toISOString()
    };
    if (details && process.env.NODE_ENV !== 'production') {
      response.details = details;
    }
    return res.status(status).json(response);
  }
});

// Async Controller Wrapper
const asyncController = (controller) => async (req, res, next) => {
  try {
    const response = createResponseHandler(req, res);
    await controller(req, res, response);
  } catch (err) {
    next(err);
  }
};

// API Routes
const router = express.Router();

// DSA Assignments Endpoints
router.route('/dsa-assignments')
  .get(asyncController(async (req, res, { success, error }) => {
    const { difficulty, tags, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (difficulty) filter['problems.difficulty'] = difficulty;
    if (tags) filter['problems.tags'] = { $in: tags.split(',') };

    const assignments = await DSAAssignment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const count = await DSAAssignment.countDocuments(filter);
    
    success({
      assignments,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  }))
  .post(asyncController(async (req, res, { success, error }) => {
    const { title, problems, icon = 'FaCode' } = req.body;

    if (!title || !problems?.length) {
      return error('Title and at least one problem are required');
    }

    const newAssignment = new DSAAssignment({
      title,
      icon,
      problems: problems.map(prob => ({
        question: prob.question,
        code: prob.code,
        output: prob.output,
        difficulty: prob.difficulty || 'medium',
        tags: prob.tags || []
      }))
    });

    const savedAssignment = await newAssignment.save();
    success(savedAssignment, 201);
  }));

router.route('/dsa-assignments/:id')
  .get(asyncController(async (req, res, { success, error }) => {
    const assignment = await DSAAssignment.findById(req.params.id).lean();
    if (!assignment) return error('Assignment not found', 404);
    success(assignment);
  }))
  .put(asyncController(async (req, res, { success, error }) => {
    const updated = await DSAAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return error('Assignment not found', 404);
    success(updated);
  }))
  .delete(asyncController(async (req, res, { success, error }) => {
    const deleted = await DSAAssignment.findByIdAndDelete(req.params.id);
    if (!deleted) return error('Assignment not found', 404);
    success({ id: deleted._id, deleted: true });
  }));

// History Endpoints
router.route('/history')
  .get(asyncController(async (req, res, { success, error }) => {
    const { userId, assignmentId, limit = 20, language } = req.query;
    const filter = {};
    
    if (userId) filter.userId = userId;
    if (assignmentId) filter.assignmentId = assignmentId;
    if (language) filter.language = language;

    const history = await History.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .lean();

    success(history);
  }))
  .post(asyncController(async (req, res, { success, error }) => {
    const { code, output, errors, language, userId, assignmentId } = req.body;

    if (!code || !language) {
      return error('Code and language are required');
    }

    const newHistory = new History({
      code,
      output: output || '',
      errors: errors || '',
      language,
      userId,
      assignmentId
    });

    const savedHistory = await newHistory.save();
    success(savedHistory, 201);
  }));

router.route('/history/:id')
  .get(asyncController(async (req, res, { success, error }) => {
    const entry = await History.findById(req.params.id).lean();
    if (!entry) return error('History entry not found', 404);
    success(entry);
  }))
  .delete(asyncController(async (req, res, { success, error }) => {
    const deleted = await History.findByIdAndDelete(req.params.id);
    if (!deleted) return error('History entry not found', 404);
    success({ id: deleted._id, deleted: true });
  }));

// Mount API router
app.use('/api', router);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    memoryUsage: process.memoryUsage()
  });
});

// Static Files (if needed for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl,
    method: req.method
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);

  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred'
    : err.message;

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
      details: err
    })
  });
});

// Server Configuration
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${PORT}
  🌱 Environment: ${process.env.NODE_ENV || 'development'}
  📅 ${new Date().toLocaleString()}
  `);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('🔌 MongoDB connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      process.exit(0);
    });
  });
});