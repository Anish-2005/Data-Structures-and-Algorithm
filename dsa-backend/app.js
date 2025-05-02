const express = require('express');
const configureMiddleware = require('./config/middleware');
const connectDB = require('./config/database');
const router = require('./routes');
const { API_BASE_PATH } = require('./config/constants');
const { error } = require('./services/responseHandler');

const app = express();

// Configure middleware
configureMiddleware(app);

// Connect to database
connectDB();

// API routes
app.use(API_BASE_PATH, router);

// 404 Handler
app.use((req, res) => {
  error(res, 'Endpoint not found', 404);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  error(res, 'Internal server error', 500, err);
});

module.exports = app;