require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

// Enhanced CORS Configuration
const allowedOrigins = [
  'https://quantum-dsa.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Normalize the origin by removing trailing slash and converting to lowercase
    const normalizedOrigin = origin.endsWith('/') 
      ? origin.slice(0, -1).toLowerCase() 
      : origin.toLowerCase();
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => 
      normalizedOrigin === allowedOrigin.toLowerCase()
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 86400
};

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cpp-labs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
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
        if (!p.question || !p.code || !p.output) {
          throw new Error('Each problem must have question, code, and output');
        }
        return p;
      });

      const newDoc = new DSAAssignment({ 
        title, 
        icon: icon || 'FaCode', 
        problems: validProblems 
      });
      
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
      if (!doc) return respond.error(res, 'Assignment not found', 404);
      respond.success(res, doc);
    } catch (err) {
      respond.error(res, err.message, 500, err);
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
      respond.error(res, err.message, 500, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await DSAAssignment.findByIdAndDelete(req.params.id);
      if (!deleted) return respond.error(res, 'Assignment not found', 404);
      respond.success(res, { message: 'Assignment deleted successfully' });
    } catch (err) {
      respond.error(res, err.message, 500, err);
    }
  });

// History Routes
app.post('/history', async (req, res) => {
  try {
    const { code, output, errors, language } = req.body;
    
    if (!code || !language) {
      return respond.error(res, 'Code and language are required', 400);
    }

    const newHistory = new History({
      code,
      output: output || '',
      errors: errors || '',
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
    const limit = parseInt(req.query.limit) || 10;
    const history = await History.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    respond.success(res, history);
  } catch (error) {
    console.error('Error fetching history:', error);
    respond.error(res, 'Error fetching history', 500, error);
  }
});

// Health Check with MongoDB status
app.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  try {
    // Verify MongoDB connection is actually working
    await mongoose.connection.db.admin().ping();
    
    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date(),
      database: dbStatus,
      memoryUsage: process.memoryUsage()
    });
  } catch (err) {
    res.status(500).json({
      status: 'DB_ERROR',
      uptime: process.uptime(),
      timestamp: new Date(),
      database: dbStatus,
      error: err.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  respond.error(res, 'Internal Server Error', 500, 
    process.env.NODE_ENV === 'development' ? err.stack : null
  );
});

// Start Server
const PORT = process.env.DSA_HISTORY_PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 DSA/History server running on port ${PORT}`);
  console.log('🛡️  CORS enabled for origins:');
  allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
});