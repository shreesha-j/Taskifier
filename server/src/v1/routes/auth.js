const router = require('express').Router()
const userController = require('../controllers/user')
const { body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const User = require('../models/user')

/**
 * User registration route.
 * Validates username, password, and confirmPassword with express-validator.
 * Checks if the username is unique before proceeding.
 */
router.post(
  '/signup',
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('confirmPassword')
    .isLength({ min: 8 })
    .withMessage('Confirm password must be at least 8 characters'),
  body('username').custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      return Promise.reject('Username already in use');
    }
  }),
  validation.validate,
  userController.register
);

/**
 * User login route.
 * Validates username and password.
 */
router.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username must be at least 8 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  validation.validate,
  userController.login
);

/**
 * Token verification route.
 * Validates the JWT token and returns the user data if valid.
 */
router.post('/verify-token', tokenHandler.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
