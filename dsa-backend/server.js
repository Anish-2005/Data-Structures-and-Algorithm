require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Configuration Constants
const CONFIG = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs',
  ALLOWED_ORIGINS: [
    'https://quantum-dsa.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  API_BASE_PATH: '/api'
};

// Enhanced CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server and curl requests
    if (!origin) return callback(null, true);
    
    try {
      const url = new URL(origin);
      const baseOrigin = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`;
      
      const isAllowed = CONFIG.ALLOWED_ORIGINS.some(allowedOrigin => {
        // Compare origins after normalizing (remove trailing slashes, lowercase)
        const normalize = (str) => str.replace(/\/+$/, '').toLowerCase();
        return normalize(baseOrigin) === normalize(allowedOrigin);
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    } catch (err) {
      console.warn(`Invalid origin format: ${origin}`);
      callback(new Error('Invalid origin'));
    }
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200,
  maxAge: 86400
};

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Performance Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS Middleware
app.use(cors(corsOptions));

// Database Connection with Enhanced Settings
mongoose.connect(CONFIG.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});

// Models
const DSAAssignment = require('./models/DSAAssignment');
const History = require('./models/History');

// Enhanced Response Handler
const respond = {
  success: (res, data, status = 200, meta = {}) => {
    const response = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        ...meta
      }
    };
    res.status(status).json(response);
  },
  error: (res, message, status = 400, error = null) => {
    const response = {
      success: false,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        statusCode: status
      }
    };
    
    if (error && process.env.NODE_ENV !== 'production') {
      response.error = {
        name: error.name,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      };
    }
    
    res.status(status).json(response);
  }
};

// API Router
const router = express.Router();

// DSA Assignments Routes
router.route('/dsa-assignments')
  .get(async (req, res) => {
    try {
      const docs = await DSAAssignment.find().sort({ createdAt: -1 }).lean();
      respond.success(res, docs);
    } catch (err) {
      respond.error(res, 'Failed to fetch assignments', 500, err);
    }
  })
  .post(async (req, res) => {
    try {
      const { title, problems = [], icon } = req.body;
      
      if (!title || !problems.length) {
        return respond.error(res, 'Title and at least one problem are required', 400);
      }

      const validProblems = problems.map((p, index) => {
        if (!p.question || !p.code || !p.output) {
          throw new Error(`Problem ${index + 1} is missing required fields`);
        }
        return {
          question: p.question.trim(),
          code: p.code.trim(),
          output: p.output.trim()
        };
      });

      const newDoc = new DSAAssignment({ 
        title: title.trim(),
        icon: icon || 'FaCode',
        problems: validProblems
      });
      
      const saved = await newDoc.save();
      respond.success(res, saved, 201);
    } catch (err) {
      respond.error(res, 'Failed to create assignment', 500, err);
    }
  });

router.route('/dsa-assignments/:id')
  .get(async (req, res) => {
    try {
      const doc = await DSAAssignment.findById(req.params.id).lean();
      if (!doc) return respond.error(res, 'Assignment not found', 404);
      respond.success(res, doc);
    } catch (err) {
      respond.error(res, 'Failed to fetch assignment', 500, err);
    }
  })
  .put(async (req, res) => {
    try {
      const updated = await DSAAssignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).lean();
      
      if (!updated) return respond.error(res, 'Assignment not found', 404);
      respond.success(res, updated);
    } catch (err) {
      respond.error(res, 'Failed to update assignment', 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await DSAAssignment.findByIdAndDelete(req.params.id);
      if (!deleted) return respond.error(res, 'Assignment not found', 404);
      respond.success(res, { message: 'Assignment deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete assignment', 500, err);
    }
  });
//Edit Routes
router.route('/dsa-assignments/:assignmentId/problems')
  .post(async (req, res) => {
    try {
      const { question, code, output } = req.body;
      
      if (!question || !code || !output) {
        return respond.error(res, 'Question, code, and output are required', 400);
      }

      const assignment = await DSAAssignment.findById(req.params.assignmentId);
      if (!assignment) {
        return respond.error(res, 'Assignment not found', 404);
      }

      const newProblem = {
        question: question.trim(),
        code: code.trim(),
        output: output.trim()
      };

      assignment.problems.push(newProblem);
      const saved = await assignment.save();
      
      respond.success(res, saved.problems[saved.problems.length - 1], 201);
    } catch (err) {
      respond.error(res, 'Failed to add problem', 500, err);
    }
  });

router.route('/dsa-assignments/:assignmentId/problems/:problemId')
  .put(async (req, res) => {
    try {
      const { question, code, output } = req.body;
      const assignment = await DSAAssignment.findById(req.params.assignmentId);
      
      if (!assignment) {
        return respond.error(res, 'Assignment not found', 404);
      }

      const problemIndex = assignment.problems.findIndex(
        p => p._id.toString() === req.params.problemId
      );

      if (problemIndex === -1) {
        return respond.error(res, 'Problem not found', 404);
      }

      // Update only provided fields
      if (question) assignment.problems[problemIndex].question = question.trim();
      if (code) assignment.problems[problemIndex].code = code.trim();
      if (output) assignment.problems[problemIndex].output = output.trim();

      const saved = await assignment.save();
      respond.success(res, saved.problems[problemIndex]);
    } catch (err) {
      respond.error(res, 'Failed to update problem', 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const assignment = await DSAAssignment.findById(req.params.assignmentId);
      
      if (!assignment) {
        return respond.error(res, 'Assignment not found', 404);
      }

      const initialLength = assignment.problems.length;
      assignment.problems = assignment.problems.filter(
        p => p._id.toString() !== req.params.problemId
      );

      if (assignment.problems.length === initialLength) {
        return respond.error(res, 'Problem not found', 404);
      }

      await assignment.save();
      respond.success(res, { message: 'Problem deleted successfully' });
    } catch (err) {
      respond.error(res, 'Failed to delete problem', 500, err);
    }
  });

// Bulk update endpoint for entire assignment
router.put('/dsa-assignments/:id/full', async (req, res) => {
  try {
    const { title, icon, problems } = req.body;
    
    if (!title || !problems || !Array.isArray(problems)) {
      return respond.error(res, 'Title and problems array are required', 400);
    }

    const assignment = await DSAAssignment.findById(req.params.id);
    if (!assignment) {
      return respond.error(res, 'Assignment not found', 404);
    }

    // Validate all problems
    const validatedProblems = problems.map((p, index) => {
      if (!p.question || !p.code || !p.output) {
        throw new Error(`Problem ${index + 1} is missing required fields`);
      }
      return {
        question: p.question.trim(),
        code: p.code.trim(),
        output: p.output.trim(),
        // Preserve existing ID if this is an update
        _id: p._id || new mongoose.Types.ObjectId()
      };
    });

    // Update assignment
    assignment.title = title.trim();
    assignment.icon = icon || 'FaCode';
    assignment.problems = validatedProblems;

    const saved = await assignment.save();
    respond.success(res, saved);
  } catch (err) {
    respond.error(res, 'Failed to update assignment', 500, err);
  }
});
// History Routes
router.route('/history')
  .post(async (req, res) => {
    try {
      const { code, output, errors, language } = req.body;
      
      if (!code || !language) {
        return respond.error(res, 'Code and language are required', 400);
      }

      const newHistory = new History({
        code: code.trim(),
        output: (output || '').trim(),
        errors: (errors || '').trim(),
        language: language.trim()
      });

      const savedHistory = await newHistory.save();
      respond.success(res, savedHistory, 201);
    } catch (error) {
      respond.error(res, 'Failed to save history', 500, error);
    }
  })
  .get(async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const history = await History.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .lean();
      respond.success(res, history);
    } catch (error) {
      respond.error(res, 'Failed to fetch history', 500, error);
    }
  });

// Health Check Endpoint
router.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  try {
    await mongoose.connection.db.admin().ping();
    respond.success(res, {
      status: 'OK',
      database: dbStatus,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    });
  } catch (err) {
    respond.error(res, 'Database ping failed', 500, err);
  }
});

// Mount API router
app.use(CONFIG.API_BASE_PATH, router);

// 404 Handler
app.use((req, res) => {
  respond.error(res, 'Endpoint not found', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  respond.error(res, 'Internal server error', 500, err);
});

// Server Startup
app.listen(CONFIG.PORT, () => {
  console.log(`🚀 Server running on port ${CONFIG.PORT}`);
  console.log('🛡️  CORS enabled for origins:');
  CONFIG.ALLOWED_ORIGINS.forEach(origin => console.log(`   - ${origin}`));
  console.log(`📂 API base path: ${CONFIG.API_BASE_PATH}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});