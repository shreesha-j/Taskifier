const router = require('express').Router();
const auth = require('../middlewares/auth');
const board = require('../middlewares/board');
// Route for authentication-related endpoints
router.use('/auth', auth);
router.use('/boards', board)

module.exports = router;
