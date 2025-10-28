/**
 * Standard success response format
 * @param {String} message - Success message
 * @param {Object} data - Response data
 * @returns {Object} Formatted success response
 */
const successResponse = (message, data = null) => {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
  }

  return response;
};

/**
 * Standard error response format
 * @param {String} message - Error message
 * @param {Array} errors - Array of error objects
 * @returns {Object} Formatted error response
 */
const errorResponse = (message, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors && errors.length > 0) {
    response.errors = errors;
  }

  return response;
};

module.exports = {
  successResponse,
  errorResponse,
};
