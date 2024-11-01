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

/**
 * Update the position of boards.
 * Protected by token authentication.
 */
router.put(
  '/',
  tokenHandler.verifyToken,
  boardController.updatePosition
);

/**
 * Get all favourite boards for the authenticated user.
 * Protected by token authentication.
 */
router.get(
  '/favourites',
  tokenHandler.verifyToken,
  boardController.getFavourites
);

/**
 * Update the position of favourite boards.
 * Protected by token authentication.
 */
router.put(
  '/favourites',
  tokenHandler.verifyToken,
  boardController.updateFavouritePosition
);

/**
 * Get a specific board by ID for the authenticated user.
 * Validates the board ID format and protected by token authentication.
 */
router.get(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.getOne
);

/**
 * Update a specific board by ID.
 * Validates the board ID format and protected by token authentication.
 */
router.put(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id');
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.update
);

module.exports = router;
