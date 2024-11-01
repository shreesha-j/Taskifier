// Load environment variables
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// Import routes
const indexRouter = require('./src/v1/routes');

// Initialize Express app
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Set up view engine configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Use middleware for logging, parsing, and serving static files
app.use(logger('dev')); // Logs requests to the console
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(cookieParser()); // Parses cookies from HTTP requests
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// Define API routes
app.use('/api/v1', indexRouter);

module.exports = app;
