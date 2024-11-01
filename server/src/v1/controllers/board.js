const Board = require('../models/board');
const Section = require('../models/section');
const Task = require('../models/task');

/**
 * Controller for managing board operations.
 */
exports.create = async (req, res) => {
  try {
    // Count the total boards to set the initial position for a new board
    const boardsCount = await Board.find().count();
    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    });
    res.status(201).json(board);
  } catch (err) {
    console.error('Error creating board:', err);
    res.status(500).json({ error: 'Failed to create board' });
  }
};

/**
 * Fetches all boards associated with the authenticated user, sorted by position.
 */
exports.getAll = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).sort('-position');
    res.status(200).json(boards);
  } catch (err) {
    console.error('Error fetching boards:', err);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};
