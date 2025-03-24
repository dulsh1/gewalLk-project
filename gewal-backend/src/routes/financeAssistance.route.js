const express = require('express');
const router = express.Router();
const {
  createFinance,
  getAllFinance,
  getFinanceById,
  updateFinance,
  deleteFinance
} = require('../controllers/financeAssistance.controller');

// @route   POST /api/finance
// @desc    Create a new finance application
// @access  Public
router.post('/', createFinance);

// @route   GET /api/finance
// @desc    Get all finance applications
// @access  Public
router.get('/', getAllFinance);

// @route   GET /api/finance/:id
// @desc    Get a single finance application by ID
// @access  Public
router.get('/:id', getFinanceById);

// @route   PUT /api/finance/:id
// @desc    Update a finance application
// @access  Public
router.put('/:id', updateFinance);

// @route   DELETE /api/finance/:id
// @desc    Delete a finance application
// @access  Public
router.delete('/:id', deleteFinance);

module.exports = router;