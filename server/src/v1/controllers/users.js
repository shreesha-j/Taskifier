// Import necessary modules
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jsonwebtoken = require('jsonwebtoken');

/**
 * Registers a new user by encrypting their password and generating a JWT.
 * @param {Object} req - Express request object, containing user data in req.body.
 * @param {Object} res - Express response object, used to send JSON response.
 */
exports.register = async (req, res) => {
  const { password } = req.body;
  try {
    // Encrypt the user's password
    req.body.password = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    ).toString();

    // Create the user in the database
    const user = await User.create(req.body);

    // Generate a JWT for authentication
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

/**
 * Logs in a user by validating their credentials and generating a JWT.
 * @param {Object} req - Express request object, containing username and password in req.body.
 * @param {Object} res - Express response object, used to send JSON response.
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Retrieve the user with their password
    const user = await User.findOne({ username }).select('password username');
    if (!user) {
      return res.status(401).json({
        errors: [{ param: 'username', msg: 'Invalid username or password' }],
      });
    }

    // Decrypt the stored password for comparison
    const decryptedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    // Validate the provided password
    if (decryptedPass !== password) {
      return res.status(401).json({
        errors: [{ param: 'username', msg: 'Invalid username or password' }],
      });
    }

    // Remove password from the response
    user.password = undefined;

    // Generate a JWT for authentication
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
};
