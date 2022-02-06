const ErrorResponse = require('../utils/error');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err.message);

  // Validation error
  let splittedString = err.message.split(":")
  if (splittedString[0] === 'ValidationError') {
    error = new ErrorResponse(splittedString, 422);
  }


  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;