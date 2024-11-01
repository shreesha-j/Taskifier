const router = require('express').Router();
const boardController = require('../controllers/board');
const tokenHandler = require('../handlers/tokenHandler');

/**
 * Route to create a new board.
 * Protected by token authentication.
 */
router.post('/', tokenHandler.verifyToken, boardController.create);

/**
 * Route to get all boards for the authenticated user.
 * Protected by token authentication.
 */
router.get('/', tokenHandler.verifyToken, boardController.getAll);

module.exports = router;
