// adminRoutes.js
// This file contains routes for admin actions: user management, city management, etc.

const express = require('express');
const {
  getUsers,
  getUserById,
  deleteUser,
  getAllCities,
  createCity,
  deleteCity
} = require('../controllers/adminController');
const router = express.Router();

// GET /admin/users - Route for fetching all users
router.get('/users', getUsers);

// GET /admin/users/:id - Route for fetching a specific user by ID
router.get('/users/:id', getUserById);

// DELETE /admin/users/:id - Route for deleting a user by ID
router.delete('/users/:id', deleteUser);

// GET /admin/cities - Route for fetching all cities
router.get('/cities', getAllCities);

// POST /admin/cities - Route for creating a new city (admin only)
router.post('/cities', createCity);

// DELETE /admin/cities/:id - Route for deleting a city by ID (admin only)
router.delete('/cities/:id', deleteCity);

module.exports = router;
