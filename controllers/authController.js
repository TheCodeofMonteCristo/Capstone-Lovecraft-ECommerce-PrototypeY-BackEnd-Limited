// authController.js
// This file handles user authentication, including login and registration logic.

const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const { prisma } = require('../config/db'); // Prisma Client to interact with the database
const { jwtSecret } = require('../config/env'); // JWT secret for signing tokens

// Register a new user
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Respond with success
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during registration' });
  }
}

// Login an existing user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the password with the stored hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

    // Respond with the token
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error during login' });
  }
}

module.exports = { register, login };
