// env.js
// This file ensures that environment variables are loaded from a .env file into process.env.

require('dotenv').config();  // Import dotenv package to load environment variables

// Check if essential environment variables are present. If not, throw an error.
if (!process.env.DB_URL) {
  throw new Error('Missing DB_URL in environment variables');
}

// Export the environment variables for use in other parts of the application
module.exports = {
  dbUrl: process.env.DB_URL,  // The database URL, typically for connecting to the database
  jwtSecret: process.env.JWT_SECRET,  // The secret key for JWT authentication
  port: process.env.PORT || 5000,  // Server port, defaulting to 5000 if not specified
};
