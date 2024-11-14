// server.js
// The main entry point for the Express application. Initializes the app, connects to the database, and starts the server.

require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const cors = require('cors'); // CORS middleware to allow cross-origin requests
const morgan = require('morgan'); // HTTP request logger middleware for logging requests
const prisma = require('./prisma/client'); // Prisma client instance for database interaction
const { isAuthenticated, isAdmin } = require('./utils/authMiddleware'); // Import authentication middleware
const errorHandler = require('./utils/errorHandler'); // Import custom error handling middleware
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const cityRoutes = require('./routes/cityRoutes'); // Import city routes
const reviewRoutes = require('./routes/reviewRoutes'); // Import review routes
const orderRoutes = require('./routes/orderRoutes'); // Import order routes
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes

const app = express(); // Initialize the Express app

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan('dev')); // Log HTTP requests with 'dev' format
app.use(express.json()); // Parse incoming JSON requests

// API Routes setup
app.use('/api/auth', authRoutes); // Authentication routes (signup, login)
app.use('/api/cities', cityRoutes); // Routes for city operations
app.use('/api/reviews', reviewRoutes); // Routes for review operations
app.use('/api/orders', orderRoutes); // Routes for order management
app.use('/api/admin', isAuthenticated, isAdmin, adminRoutes); // Admin routes (with authentication & admin check)

// Root route to confirm the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Lovecraftian eCommerce API!');
});

// Global error handler
app.use(errorHandler); // Handles errors that occur in the app

// Connect to the database using Prisma
async function startServer() {
  try {
    // Prisma connection
    await prisma.$connect(); // Connect to the database using Prisma

    console.log('Database connected successfully.');

    // Start the server
    const port = process.env.PORT || 5000; // Use port from .env or default to 5000
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error); // Log database connection error
    process.exit(1); // Exit the process if the database connection fails
  }
}

// Call the function to start the server
startServer();
