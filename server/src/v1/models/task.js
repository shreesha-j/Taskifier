const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const { Schema } = mongoose;

/**
 * Schema for a task within a section, containing details of individual tasks.
 * @name taskSchema
 */
const taskSchema = new Schema(
  {
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);

module.exports = mongoose.model('Task', taskSchema);
