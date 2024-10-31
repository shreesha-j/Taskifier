const router = require('express').Router();

// Route for authentication-related endpoints
router.use('/auth', require('./auth'));

module.exports = router;
