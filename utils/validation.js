// validation.js
// This file contains input validation functions for API routes.

const { body, validationResult } = require('express-validator');

// Validation for user registration input
const validateSignup = [
  body('email').isEmail().withMessage('Please enter a valid email address'), // Check if email is valid
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'), // Check if password length is valid
  body('name').not().isEmpty().withMessage('Name is required'), // Check if name is provided
];

// Validation for user login input
const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email address'), // Validate email format
  body('password').not().isEmpty().withMessage('Password is required'), // Ensure password is not empty
];

// Validation for city creation input
const validateCity = [
  body('name').not().isEmpty().withMessage('City name is required'), // Ensure city name is not empty
  body('price').isNumeric().withMessage('Price must be a number'), // Ensure price is a number
  body('description').not().isEmpty().withMessage('City description is required'), // Ensure description is not empty
];

// Function to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req); // Get any validation errors from the request
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
  }
  next(); // Proceed to the next middleware or route handler if validation passes
};

module.exports = { validateSignup, validateLogin, validateCity, validate };
