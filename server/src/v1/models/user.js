// Import necessary modules
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

/**
 * User schema definition.
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Enforces unique usernames in the database
    },
    password: {
      type: String,
      required: true,
      select: false, // Excludes password from query results by default
    },
  },
  schemaOptions // Apply schema options for virtuals and timestamps
);

// Export the User model
module.exports = mongoose.model('User', userSchema);
