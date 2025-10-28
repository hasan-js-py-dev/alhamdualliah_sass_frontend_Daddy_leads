const { errorResponse } = require('../utils/responseUtils');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json(errorResponse('Validation failed', errors));
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json(errorResponse(`${field} already exists`));
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(errorResponse('Invalid token'));
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(errorResponse('Token expired'));
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json(errorResponse('Invalid ID format'));
  }

  // CORS error
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json(errorResponse('CORS policy: Origin not allowed'));
  }

  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message || 'Internal server error';

  res.status(statusCode).json(errorResponse(message));
};

module.exports = { errorHandler };
