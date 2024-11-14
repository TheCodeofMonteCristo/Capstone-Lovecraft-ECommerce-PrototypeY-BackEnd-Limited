// errorHandler.js
// This file contains custom error handling middleware.

const errorHandler = (err, req, res, next) => {
    // Log the error (could be expanded to use a logging library)
    console.error(err);
  
    // Default error response
    const statusCode = err.statusCode || 500; // Default to 500 (Internal Server Error) if no status code is provided
    const message = err.message || 'Something went wrong'; // Default error message if no message is provided
  
    res.status(statusCode).json({ error: message }); // Send error response
  };
  
  module.exports = errorHandler;
  