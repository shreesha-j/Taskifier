const router = require('express').Router();
const auth = require('./auth');
const board = require('./board');
const section = require('./section');
// Route for authentication-related endpoints
router.use('/auth', auth);
router.use('/boards', board);
router.use('/boards/:boardId/sections', section)

module.exports = router;
