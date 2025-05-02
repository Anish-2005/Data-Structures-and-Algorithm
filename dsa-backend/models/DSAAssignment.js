const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const problemSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters long']
  },
  code: {
    type: String,
    required: [true, 'Code template is required'],
    validate: {
      validator: function(v) {
        return v.trim().length > 0;
      },
      message: 'Code cannot be empty'
    }
  },
  output: {
    type: String,
    required: [true, 'Expected output is required']
  },
  difficulty: {
    type: String,
    enum: {
      values: ['easy', 'medium', 'hard'],
      message: 'Difficulty must be easy, medium, or hard'
    },
    default: 'medium'
  },
  tags: {
    type: [String],
    validate: {
      validator: function(tags) {
        return tags.length <= 5;
      },
      message: 'Cannot have more than 5 tags'
    },
    default: []
  },
  hints: {
    type: [String],
    default: []
  },
  explanation: {
    type: String,
    default: ''
  },
  testCases: {
    type: [{
      input: String,
      output: String,
      isHidden: Boolean
    }],
    default: []
  },
  timeLimit: {
    type: Number, // in milliseconds
    default: 2000,
    min: [100, 'Time limit must be at least 100ms']
  }
}, { _id: false });

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    default: '',
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    default: 'FaCode',
    validate: {
      validator: function(v) {
        return /^[A-Za-z][A-Za-z0-9]*$/.test(v);
      },
      message: 'Icon must be a valid icon identifier'
    }
  },
  problems: {
    type: [problemSchema],
    required: [true, 'At least one problem is required'],
    validate: {
      validator: function(problems) {
        return problems.length > 0 && problems.length <= 20;
      },
      message: 'Must have between 1 and 20 problems'
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    virtuals: true
  }
});

// Indexes for better query performance
assignmentSchema.index({ title: 'text', description: 'text' });
assignmentSchema.index({ 'problems.tags': 1 });
assignmentSchema.index({ 'problems.difficulty': 1 });
assignmentSchema.index({ createdAt: -1 });

// Virtual for problem count
assignmentSchema.virtual('problemCount').get(function() {
  return this.problems.length;
});

// Middleware to update updatedAt
assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method for finding by difficulty
assignmentSchema.statics.findByDifficulty = function(difficulty) {
  return this.find({ 'problems.difficulty': difficulty });
};

// Instance method to add problem
assignmentSchema.methods.addProblem = function(problem) {
  this.problems.push(problem);
  return this.save();
};

const DSAAssignment = mongoose.model('DSAAssignment', assignmentSchema);

module.exports = DSAAssignment;