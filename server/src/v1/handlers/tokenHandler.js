// Import necessary modules
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Decodes and verifies the JSON Web Token from the request headers.
 * @param {Object} req - Express request object, containing headers.
 * @returns {Object|boolean} - Decoded token object if valid, otherwise false.
 */
const tokenDecode = (req) => {
  const bearerHeader = req.headers['authorization'];
  
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];
    try {
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (err) {
      console.error('Token verification failed:', err);
      return false;
    }
  }
  return false;
};

/**
 * Middleware to verify the user's JWT and attach the user to the request object.
 * @param {Object} req - Express request object, containing headers and user data.
 * @param {Object} res - Express response object, used to send a JSON response.
 * @param {Function} next - Express next middleware function.
 */
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  
  if (!tokenDecoded) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
