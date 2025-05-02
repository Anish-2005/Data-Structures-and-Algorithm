const DSAAssignment = require('../models/DSAAssignment');
const { success, error } = require('../services/responseHandler');

/**
 * @desc    Get all DSA assignments
 * @route   GET /api/dsa-assignments
 * @access  Public
 */
const getAssignments = async (req, res) => {
  try {
    const docs = await DSAAssignment.find().sort({ createdAt: -1 }).lean();
    success(res, docs);
  } catch (err) {
    error(res, 'Failed to fetch assignments', 500, err);
  }
};

/**
 * @desc    Create a new DSA assignment
 * @route   POST /api/dsa-assignments
 * @access  Private/Admin
 */
const createAssignment = async (req, res) => {
  try {
    const { title, problems = [], icon } = req.body;
    
    if (!title || !problems.length) {
      return error(res, 'Title and at least one problem are required', 400);
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
    success(res, saved, 201);
  } catch (err) {
    error(res, 'Failed to create assignment', 500, err);
  }
};

/**
 * @desc    Get single DSA assignment by ID
 * @route   GET /api/dsa-assignments/:id
 * @access  Public
 */
const getAssignmentById = async (req, res) => {
  try {
    const doc = await DSAAssignment.findById(req.params.id).lean();
    
    if (!doc) {
      return error(res, 'Assignment not found', 404);
    }
    
    success(res, doc);
  } catch (err) {
    error(res, 'Failed to fetch assignment', 500, err);
  }
};

/**
 * @desc    Update a DSA assignment
 * @route   PUT /api/dsa-assignments/:id
 * @access  Private/Admin
 */
const updateAssignment = async (req, res) => {
  try {
    const { title, problems, icon } = req.body;
    const updateData = {};

    if (title) updateData.title = title.trim();
    if (icon) updateData.icon = icon;
    if (problems) {
      updateData.problems = problems.map((p, index) => {
        if (!p.question || !p.code || !p.output) {
          throw new Error(`Problem ${index + 1} is missing required fields`);
        }
        return {
          question: p.question.trim(),
          code: p.code.trim(),
          output: p.output.trim()
        };
      });
    }

    const updated = await DSAAssignment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true,
        runValidators: true 
      }
    ).lean();

    if (!updated) {
      return error(res, 'Assignment not found', 404);
    }

    success(res, updated);
  } catch (err) {
    error(res, 'Failed to update assignment', 500, err);
  }
};

/**
 * @desc    Delete a DSA assignment
 * @route   DELETE /api/dsa-assignments/:id
 * @access  Private/Admin
 */
const deleteAssignment = async (req, res) => {
  try {
    const deleted = await DSAAssignment.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return error(res, 'Assignment not found', 404);
    }

    success(res, { 
      message: 'Assignment deleted successfully',
      deletedId: req.params.id
    });
  } catch (err) {
    error(res, 'Failed to delete assignment', 500, err);
  }
};

/**
 * @desc    Get problems from a specific assignment
 * @route   GET /api/dsa-assignments/:id/problems
 * @access  Public
 */
const getAssignmentProblems = async (req, res) => {
  try {
    const assignment = await DSAAssignment.findById(req.params.id)
      .select('problems title')
      .lean();

    if (!assignment) {
      return error(res, 'Assignment not found', 404);
    }

    success(res, {
      title: assignment.title,
      problems: assignment.problems
    });
  } catch (err) {
    error(res, 'Failed to fetch assignment problems', 500, err);
  }
};

/**
 * @desc    Get a specific problem from an assignment
 * @route   GET /api/dsa-assignments/:id/problems/:problemId
 * @access  Public
 */
const getSingleProblem = async (req, res) => {
  try {
    const assignment = await DSAAssignment.findById(req.params.id).lean();
    
    if (!assignment) {
      return error(res, 'Assignment not found', 404);
    }

    const problem = assignment.problems.find(
      p => p._id.toString() === req.params.problemId
    );

    if (!problem) {
      return error(res, 'Problem not found', 404);
    }

    success(res, {
      assignmentTitle: assignment.title,
      problem
    });
  } catch (err) {
    error(res, 'Failed to fetch problem', 500, err);
  }
};

module.exports = {
  getAssignments,
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentProblems,
  getSingleProblem
};