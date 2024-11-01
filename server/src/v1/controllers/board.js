const Board = require('../models/board');
const Section = require('../models/section');
const Task = require('../models/task');

/**
 * Controller for managing board operations.
 */
exports.create = async (req, res) => {
  try {
    // Count total boards to set the initial position for a new board
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

/**
 * Updates the position of multiple boards.
 */
exports.updatePosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const [index, board] of boards.reverse().entries()) {
      await Board.findByIdAndUpdate(board.id, { position: index });
    }
    res.status(200).json({ message: 'Positions updated successfully' });
  } catch (err) {
    console.error('Error updating board positions:', err);
    res.status(500).json({ error: 'Failed to update board positions' });
  }
};

/**
 * Retrieves a single board with its sections and tasks.
 */
exports.getOne = async (req, res) => {
  const { boardId } = req.params;
  try {
    const board = await Board.findOne({ user: req.user._id, _id: boardId });
    if (!board) return res.status(404).json({ error: 'Board not found' });

    const sections = await Section.find({ board: boardId });
    for (const section of sections) {
      const tasks = await Task.find({ section: section._id }).sort('-position');
      section._doc.tasks = tasks;
    }
    board._doc.sections = sections;
    res.status(200).json(board);
  } catch (err) {
    console.error('Error fetching board:', err);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
};

/**
 * Updates a board's details, including title, description, and favourite status.
 */
exports.update = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, favourite } = req.body;

  try {
    if (title === '') req.body.title = 'Untitled';
    if (description === '') req.body.description = 'Add description here';

    const currentBoard = await Board.findById(boardId);
    if (!currentBoard) return res.status(404).json({ error: 'Board not found' });

    // Update favourite positioning if favourite status has changed
    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId },
      }).sort('favouritePosition');

      if (favourite) {
        req.body.favouritePosition = favourites.length;
      } else {
        for (const [index, favBoard] of favourites.entries()) {
          await Board.findByIdAndUpdate(favBoard._id, { favouritePosition: index });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(boardId, { $set: req.body }, { new: true });
    res.status(200).json(board);
  } catch (err) {
    console.error('Error updating board:', err);
    res.status(500).json({ error: 'Failed to update board' });
  }
};

/**
 * Retrieves all favourite boards associated with the authenticated user, sorted by favourite position.
 */
exports.getFavourites = async (req, res) => {
  try {
    const favourites = await Board.find({
      user: req.user._id,
      favourite: true
    }).sort('-favouritePosition')
    res.status(200).json(favourites)
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * Updates the favourite positions of multiple boards. The boards should be passed as an object with the key as the position and the value as the board ID.
 */
exports.updateFavouritePosition = async (req, res) => {
  const { boards } = req.body
  try {
    for (const key in boards.reverse()) {
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { favouritePosition: key } }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * Deletes a board and its associated sections and tasks.
 * If the board is marked as favourite, updates the favourite positions of remaining boards.
 * Then, updates the positions of all remaining boards.
 * 
 * @param {Object} req - The request object, containing parameters and user information.
 * @param {Object} res - The response object, used to send back the appropriate HTTP response.
 */
exports.delete = async (req, res) => {
  const { boardId } = req.params;
  try {
    // Find and delete tasks within each section of the board
    const sections = await Section.find({ board: boardId });
    for (const section of sections) {
      await Task.deleteMany({ section: section.id });
    }
    // Delete all sections of the board
    await Section.deleteMany({ board: boardId });

    // Check if the board is marked as favourite
    const currentBoard = await Board.findById(boardId);
    if (currentBoard.favourite) {
      // Find and update the favourite positions of remaining favourite boards
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        _id: { $ne: boardId }
      }).sort('favouritePosition');

      for (const key in favourites) {
        const element = favourites[key];
        await Board.findByIdAndUpdate(
          element.id,
          { $set: { favouritePosition: key } }
        );
      }
    }

    // Delete the board
    await Board.deleteOne({ _id: boardId });

    // Update positions of all remaining boards
    const boards = await Board.find().sort('position');
    for (const key in boards) {
      const board = boards[key];
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      );
    }

    res.status(200).json('deleted');
  } catch (err) {
    console.error('Error deleting board:', err);
    res.status(500).json(err);
  }
};
