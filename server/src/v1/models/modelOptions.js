/**
 * Schema options for MongoDB models, enabling virtual properties
 * to appear in JSON and object outputs and setting up timestamps.
 */
exports.schemaOptions = {
    toJSON: {
      virtuals: true, // Include virtuals when converting to JSON
    },
    toObject: {
      virtuals: true, // Include virtuals when converting to objects
    },
    timestamps: true, // Automatically add createdAt and updatedAt fields
  };
  