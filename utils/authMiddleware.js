// authMiddleware.js
// This file contains middleware to handle authentication and authorization checks.

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model for checking user roles

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' }); // Unauthorized if no token is provided
  }

  try {
    // Verify token and decode the user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' }); // Invalid token error
  }
};

// Middleware to check if the user has admin rights
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' }); // Forbidden if user is not an admin
  }
  next(); // Proceed if user is an admin
};

module.exports = { isAuthenticated, isAdmin };
