// Import necessary modules
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * Middleware to validate request data based on express-validator rules.
 * Sends a 400 response with errors if validation fails.
 * @param {Object} req - Express request object, containing validation results.
 * @param {Object} res - Express response object, used to send validation errors.
 * @param {Function} next - Express next middleware function.
 */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Utility function to check if a given value is a valid MongoDB ObjectId.
 * @param {string} value - The value to check.
 * @returns {boolean} - True if the value is a valid ObjectId, false otherwise.
 */
exports.isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
