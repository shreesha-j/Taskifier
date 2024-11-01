/**
 * Controller for managing section operations.
 */
const Section = require('../models/section')
const Task = require('../models/task')

/**
 * Creates a new section for the specified board.
 * @param {Object} req - The request object, containing parameters and user information.
 * @param {Object} res - The response object, used to send back the appropriate HTTP response.
 */
exports.create = async (req, res) => {
  const { boardId } = req.params
  try {
    // Create a new section and associate it with the specified board
    const section = await Section.create({ board: boardId })
    // Initialize the tasks array to an empty array
    section._doc.tasks = []
    // Return the newly created section
    res.status(201).json(section)
  } catch (err) {
    // Handle any errors that occur
    res.status(500).json(err)
  }
}

/**
 * Updates an existing section with the provided parameters.
 * @param {Object} req - The request object, containing parameters and user information.
 * @param {Object} res - The response object, used to send back the appropriate HTTP response.
 */
exports.update = async (req, res) => {
  const { sectionId } = req.params
  try {
    // Find and update the section with the provided parameters
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { $set: req.body }
    )
    // Initialize the tasks array to an empty array
    section._doc.tasks = []
    // Return the updated section
    res.status(200).json(section)
  } catch (err) {
    // Handle any errors that occur
    res.status(500).json(err)
  }
}

/**
 * Deletes a section and all associated tasks.
 * @param {Object} req - The request object, containing parameters and user information.
 * @param {Object} res - The response object, used to send back the appropriate HTTP response.
 */
exports.delete = async (req, res) => {
  const { sectionId } = req.params
  try {
    // Delete all tasks associated with the section
    await Task.deleteMany({ section: sectionId })
    // Delete the section itself
    await Section.deleteOne({ _id: sectionId })
    // Return a success message
    res.status(200).json('deleted')
  } catch (err) {
    // Handle any errors that occur
    res.status(500).json(err)
  }
}
