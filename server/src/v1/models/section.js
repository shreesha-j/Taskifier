const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const { Schema } = mongoose;

/**
 * Schema for a board's section, representing groupings within a board.
 * @name sectionSchema
 */
const sectionSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  schemaOptions
);

module.exports = mongoose.model('Section', sectionSchema);
