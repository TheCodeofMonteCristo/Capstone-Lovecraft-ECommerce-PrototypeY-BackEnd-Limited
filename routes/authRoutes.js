// authRoutes.js
// This file contains routes for user authentication: signup, login, etc.

const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// POST /auth/signup - Route for registering a new user
router.post('/signup', signup);

// POST /auth/login - Route for logging in an existing user
router.post('/login', login);

module.exports = router;
