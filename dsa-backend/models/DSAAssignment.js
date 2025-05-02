const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define constants for validation
const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];
const MAX_TAGS = 5;
const MAX_PROBLEMS = 20;
const MAX_HINTS = 3;
const TIME_LIMIT_MIN = 100; // ms
const TIME_LIMIT_MAX = 10000; // ms

const testCaseSchema = new mongoose.Schema({
  _id: false,
  input: {
    type: String,
    required: [true, 'Test case input is required'],
    trim: true
  },
  output: {
    type: String,
    required: [true, 'Test case output is required'],
    trim: true
  },
  isHidden: {
    type: Boolean,
    default: true
  },
  explanation: {
    type: String,
    trim: true,
    maxlength: [200, 'Explanation cannot exceed 200 characters']
  }
}, { timestamps: true });

const problemSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters'],
    maxlength: [1000, 'Question cannot exceed 1000 characters']
  },
  code: {
    type: String,
    required: [true, 'Code template is required'],
    validate: {
      validator: function(v) {
        return v.trim().length >= 10; // Minimum code length
      },
      message: 'Code must be at least 10 characters'
    }
  },
  output: {
    type: String,
    required: [true, 'Expected output is required'],
    trim: true
  },
  difficulty: {
    type: String,
    enum: {
      values: DIFFICULTY_LEVELS,
      message: `Difficulty must be one of: ${DIFFICULTY_LEVELS.join(', ')}`
    },
    default: 'medium',
    index: true
  },
  tags: {
    type: [{
      type: String,
      trim: true,
      lowercase: true,
      minlength: [2, 'Tag must be at least 2 characters'],
      maxlength: [20, 'Tag cannot exceed 20 characters']
    }],
    validate: {
      validator: function(tags) {
        // Ensure unique tags
        const uniqueTags = new Set(tags.map(t => t.toLowerCase()));
        return tags.length === uniqueTags.size && tags.length <= MAX_TAGS;
      },
      message: `Cannot have more than ${MAX_TAGS} tags or duplicate tags`
    },
    default: []
  },
  hints: {
    type: [{
      type: String,
      trim: true,
      maxlength: [200, 'Hint cannot exceed 200 characters']
    }],
    validate: {
      validator: function(hints) {
        return hints.length <= MAX_HINTS;
      },
      message: `Cannot have more than ${MAX_HINTS} hints`
    },
    default: []
  },
  explanation: {
    type: String,
    trim: true,
    maxlength: [1000, 'Explanation cannot exceed 1000 characters']
  },
  testCases: {
    type: [testCaseSchema],
    validate: {
      validator: function(cases) {
        return cases.length > 0; // At least one test case
      },
      message: 'At least one test case is required'
    },
    default: []
  },
  timeLimit: {
    type: Number,
    default: 2000,
    min: [TIME_LIMIT_MIN, `Time limit must be at least ${TIME_LIMIT_MIN}ms`],
    max: [TIME_LIMIT_MAX, `Time limit cannot exceed ${TIME_LIMIT_MAX}ms`]
  },
  isExample: {
    type: Boolean,
    default: false
  }
}, { 
  _id: false,
  timestamps: true 
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    index: 'text'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  icon: {
    type: String,
    default: 'FaCode',
    validate: {
      validator: function(v) {
        // Match common icon identifier patterns (FaIcon, MdIcon, etc.)
        return /^[A-Z][a-zA-Z0-9]+$/.test(v);
      },
      message: 'Icon must be a valid icon identifier (e.g., FaCode, MdAssignment)'
    },
    index: true
  },
  problems: {
    type: [problemSchema],
    required: [true, 'At least one problem is required'],
    validate: {
      validator: function(problems) {
        return problems.length > 0 && problems.length <= MAX_PROBLEMS;
      },
      message: `Must have between 1 and ${MAX_PROBLEMS} problems`
    }
  },
  isPublished: {
    type: Boolean,
    default: false,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  version: {
    type: Number,
    default: 1,
    min: [1, 'Version must be at least 1']
  },
  prerequisites: {
    type: [String],
    default: []
  },
  estimatedDuration: {
    type: Number, // in minutes
    min: [5, 'Duration must be at least 5 minutes'],
    max: [300, 'Duration cannot exceed 300 minutes']
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Compound indexes for better query performance
assignmentSchema.index({
  title: 'text',
  description: 'text',
  'problems.question': 'text',
  'problems.tags': 'text'
});

assignmentSchema.index({ 
  'problems.difficulty': 1,
  isPublished: 1 
});

// Virtuals
assignmentSchema.virtual('problemCount').get(function() {
  return this.problems.length;
});

assignmentSchema.virtual('averageDifficulty').get(function() {
  if (!this.problems.length) return null;
  
  const difficultyValues = {
    easy: 1,
    medium: 2,
    hard: 3
  };
  
  const avg = this.problems.reduce((sum, problem) => {
    return sum + difficultyValues[problem.difficulty];
  }, 0) / this.problems.length;
  
  const roundedAvg = Math.round(avg);
  return Object.keys(difficultyValues).find(
    key => difficultyValues[key] === roundedAvg
  ) || 'medium';
});

// Middleware
assignmentSchema.pre('save', function(next) {
  // Ensure at least one test case per problem
  this.problems.forEach(problem => {
    if (problem.testCases.length === 0) {
      problem.testCases.push({
        input: '',
        output: problem.output,
        isHidden: false
      });
    }
  });
  
  // Increment version on updates
  if (this.isModified() && !this.isNew) {
    this.version += 1;
  }
  
  next();
});

// Query Helpers
assignmentSchema.query.published = function() {
  return this.where({ isPublished: true });
};

assignmentSchema.query.byDifficulty = function(difficulty) {
  return this.where({ 'problems.difficulty': difficulty });
};

// Static Methods
assignmentSchema.statics.findByTag = function(tag) {
  return this.find({ 'problems.tags': tag.toLowerCase() });
};

assignmentSchema.statics.findByCreator = function(userId) {
  return this.find({ createdBy: userId });
};

// Instance Methods
assignmentSchema.methods.addProblem = function(problem) {
  if (this.problems.length >= MAX_PROBLEMS) {
    throw new Error(`Cannot exceed maximum of ${MAX_PROBLEMS} problems`);
  }
  
  // Set default test case if none provided
  if (!problem.testCases || problem.testCases.length === 0) {
    problem.testCases = [{
      input: '',
      output: problem.output,
      isHidden: false
    }];
  }
  
  this.problems.push(problem);
  return this.save();
};

assignmentSchema.methods.publish = function() {
  this.isPublished = true;
  return this.save();
};

const DSAAssignment = mongoose.model('DSAAssignment', assignmentSchema);

module.exports = DSAAssignment;