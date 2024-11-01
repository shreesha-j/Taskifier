const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const { Schema } = mongoose;

/**
 * Schema for a user's board, containing basic information about each board.
 * @name boardSchema
 */
const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    icon: {
      type: String,
      default: '📃',
    },
    title: {
      type: String,
      default: 'Untitled',
    },
    description: {
      type: String,
      default: `Add description here
    🟢 You can add multiline description
    🟢 Let's start...`,
    },
    position: {
      type: Number,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    favouritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

module.exports = mongoose.model('Board', boardSchema);
