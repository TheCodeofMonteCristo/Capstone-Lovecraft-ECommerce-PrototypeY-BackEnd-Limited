// cityRoutes.js
// This file contains routes for creating, reading, updating, and deleting cities.

const express = require('express');
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
} = require('../controllers/cityController');
const router = express.Router();

// POST /cities - Route for creating a new city
router.post('/', createCity);

// GET /cities - Route for fetching all cities
router.get('/', getAllCities);

// GET /cities/:id - Route for fetching a specific city by ID
router.get('/:id', getCityById);

// PUT /cities/:id - Route for updating a city by ID
router.put('/:id', updateCity);

// DELETE /cities/:id - Route for deleting a city by ID
router.delete('/:id', deleteCity);

module.exports = router;
